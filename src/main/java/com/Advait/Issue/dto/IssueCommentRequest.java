package com.Advait.Issue.dto;

import lombok.Data;

@Data
public class IssueCommentRequest {
    private Long authorId;
    private String content;
}