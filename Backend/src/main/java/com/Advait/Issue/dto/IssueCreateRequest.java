package com.Advait.Issue.dto;

import lombok.Data;

@Data
public class IssueCreateRequest {
    private String title;
    private String description;
    private Long createdById;
    private Long assignedToId;
}