package com.portfolio.contact.controller;

import com.portfolio.common.dto.ApiResponse;
import com.portfolio.contact.dto.ContactRequestDto;
import com.portfolio.contact.dto.ContactResponseDto;
import com.portfolio.contact.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ContactResponseDto>> submitContactForm(
            @Valid @RequestBody ContactRequestDto request,
            HttpServletRequest httpRequest) {

        String clientIp = extractClientIp(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");

        ContactResponseDto result = contactService.submitMessage(request, clientIp, userAgent);

        ApiResponse<ContactResponseDto> response = ApiResponse.success(
                result,
                "Thank you! Your message has been received. I will respond to you shortly."
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
