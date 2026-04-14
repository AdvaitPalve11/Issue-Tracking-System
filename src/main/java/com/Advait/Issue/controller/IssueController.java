package com.Advait.Issue.controller;

import com.Advait.Issue.dto.*;
import com.Advait.Issue.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping
    public IssueResponse createIssue(@RequestBody IssueCreateRequest request) {
        return issueService.createIssue(request);
    }

    @GetMapping
    public List<IssueResponse> getAllIssues() {
        return issueService.getAllIssues();
    }

    @GetMapping("/{issueId}")
    public IssueResponse getIssueById(@PathVariable Long issueId) {
        return issueService.getIssueById(issueId);
    }

    @PutMapping("/{issueId}")
    public IssueResponse updateIssue(@PathVariable Long issueId, @RequestBody IssueUpdateRequest request) {
        return issueService.updateIssue(issueId, request);
    }

    @PatchMapping("/{issueId}/assign")
    public IssueResponse assignIssue(@PathVariable Long issueId, @RequestBody IssueAssignRequest request) {
        return issueService.assignIssue(issueId, request);
    }

    @PatchMapping("/{issueId}/status")
    public IssueResponse updateStatus(@PathVariable Long issueId, @RequestBody IssueStatusRequest request) {
        return issueService.updateStatus(issueId, request);
    }

    @PostMapping("/{issueId}/comments")
    public IssueResponse addComment(@PathVariable Long issueId, @RequestBody IssueCommentRequest request) {
        return issueService.addComment(issueId, request);
    }

    @PatchMapping("/{issueId}/close")
    public IssueResponse closeIssue(@PathVariable Long issueId) {
        return issueService.closeIssue(issueId);
    }

    @DeleteMapping("/{issueId}")
    public void deleteIssue(@PathVariable Long issueId) {
        issueService.deleteIssue(issueId);
    }
}