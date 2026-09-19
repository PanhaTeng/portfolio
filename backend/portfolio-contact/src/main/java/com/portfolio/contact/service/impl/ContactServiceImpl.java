package com.portfolio.contact.service.impl;

import com.portfolio.common.audit.AuditTrailLogger;
import com.portfolio.common.exception.ResourceNotFoundException;
import com.portfolio.contact.dto.ContactRequestDto;
import com.portfolio.contact.dto.ContactResponseDto;
import com.portfolio.contact.entity.ContactMessage;
import com.portfolio.contact.repository.ContactMessageRepository;
import com.portfolio.contact.service.ContactService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ContactServiceImpl implements ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactServiceImpl.class);

    private final ContactMessageRepository repository;
    private final AuditTrailLogger auditTrailLogger;

    public ContactServiceImpl(ContactMessageRepository repository, AuditTrailLogger auditTrailLogger) {
        this.repository = repository;
        this.auditTrailLogger = auditTrailLogger;
    }

    @Override
    public ContactResponseDto submitMessage(ContactRequestDto request, String clientIp, String userAgent) {
        log.info("Processing inbound contact inquiry from: {} <{}>", request.getName(), request.getEmail());

        ContactMessage entity = new ContactMessage(
                request.getName().trim(),
                request.getEmail().trim().toLowerCase(),
                request.getSubject().trim(),
                request.getMessage().trim(),
                clientIp,
                userAgent
        );

        ContactMessage saved = repository.save(entity);

        auditTrailLogger.logAction(
                request.getEmail(),
                "CONTACT_SUBMITTED",
                "ContactMessage#" + saved.getId(),
                "Subject: " + saved.getSubject() + " | IP: " + clientIp
        );

        return mapToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactResponseDto> getAllMessages() {
        return repository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ContactResponseDto markAsRead(Long id) {
        ContactMessage message = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with ID: " + id));

        message.setRead(true);
        ContactMessage updated = repository.save(message);

        auditTrailLogger.logAction(
                "ADMIN",
                "CONTACT_MARKED_READ",
                "ContactMessage#" + id,
                "Sender: " + message.getSenderEmail()
        );

        return mapToDto(updated);
    }

    @Override
    public void deleteMessage(Long id) {
        ContactMessage message = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with ID: " + id));

        repository.delete(message);

        auditTrailLogger.logAction(
                "ADMIN",
                "CONTACT_DELETED",
                "ContactMessage#" + id,
                "Deleted message from: " + message.getSenderEmail()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public long getUnreadCount() {
        return repository.countByIsReadFalse();
    }

    private ContactResponseDto mapToDto(ContactMessage entity) {
        return new ContactResponseDto(
                entity.getId(),
                entity.getSenderName(),
                entity.getSenderEmail(),
                entity.getSubject(),
                entity.getMessage(),
                entity.getClientIp(),
                entity.isRead(),
                entity.getCreatedAt()
        );
    }
}
