package com.Advait.Issue.dto;

import com.Advait.Issue.model.IssueStatus;
import lombok.Data;

@Data
public class IssueStatusRequest {
    private IssueStatus status;
}