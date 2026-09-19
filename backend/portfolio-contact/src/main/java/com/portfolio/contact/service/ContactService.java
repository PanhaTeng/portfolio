package com.portfolio.contact.service;

import com.portfolio.contact.dto.ContactRequestDto;
import com.portfolio.contact.dto.ContactResponseDto;

import java.util.List;

/**
 * Public service contract for the Contact module.
 * External consumers interact solely with this interface.
 */
public interface ContactService {

    ContactResponseDto submitMessage(ContactRequestDto request, String clientIp, String userAgent);

    List<ContactResponseDto> getAllMessages();

    ContactResponseDto markAsRead(Long id);

    void deleteMessage(Long id);

    long getUnreadCount();
}
