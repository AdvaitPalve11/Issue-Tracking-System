package com.Advait.Issue.dto;

import com.Advait.Issue.model.IssueStatus;
import lombok.Data;

@Data
public class IssueUpdateRequest {
    private String title;
    private String description;
    private Long assignedToId;
    private IssueStatus status;
}