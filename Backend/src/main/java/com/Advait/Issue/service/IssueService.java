package com.Advait.Issue.service;

import com.Advait.Issue.dto.*;

import java.util.List;

public interface IssueService {
    IssueResponse createIssue(IssueCreateRequest request);

    List<IssueResponse> getAllIssues();

    IssueResponse getIssueById(Long issueId);

    IssueResponse updateIssue(Long issueId, IssueUpdateRequest request);

    IssueResponse assignIssue(Long issueId, IssueAssignRequest request);

    IssueResponse updateStatus(Long issueId, IssueStatusRequest request);

    IssueResponse addComment(Long issueId, IssueCommentRequest request);

    IssueResponse closeIssue(Long issueId);

    void deleteIssue(Long issueId);
}