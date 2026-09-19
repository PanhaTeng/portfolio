package com.portfolio.contact.controller;

import com.portfolio.common.dto.ApiResponse;
import com.portfolio.contact.dto.ContactResponseDto;
import com.portfolio.contact.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/contact")
public class AdminContactController {

    private final ContactService contactService;

    public AdminContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ContactResponseDto>>> getAllMessages() {
        List<ContactResponseDto> messages = contactService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.success(messages, "Messages retrieved successfully"));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<ApiResponse<ContactResponseDto>> markAsRead(@PathVariable Long id) {
        ContactResponseDto updated = contactService.markAsRead(id);
        return ResponseEntity.ok(ApiResponse.success(updated, "Message marked as read"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMessage(@PathVariable Long id) {
        contactService.deleteMessage(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Message deleted successfully"));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getUnreadCount() {
        long count = contactService.getUnreadCount();
        return ResponseEntity.ok(ApiResponse.success(Map.of("unreadCount", count), "Unread count retrieved"));
    }
}
