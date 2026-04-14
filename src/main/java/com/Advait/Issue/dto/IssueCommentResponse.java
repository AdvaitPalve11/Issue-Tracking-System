package com.Advait.Issue.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IssueCommentResponse {
    private Long id;
    private Long issueId;
    private Long authorId;
    private String authorName;
    private String content;
    private LocalDateTime createdAt;
}