package com.Advait.Issue.service;

import com.Advait.Issue.dto.*;
import com.Advait.Issue.model.Issue;
import com.Advait.Issue.model.IssueComment;
import com.Advait.Issue.model.IssueStatus;
import com.Advait.Issue.model.User;
import com.Advait.Issue.repository.IssueCommentRepository;
import com.Advait.Issue.repository.IssueRepository;
import com.Advait.Issue.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {

    private final IssueRepository issueRepository;
    private final IssueCommentRepository issueCommentRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public IssueResponse createIssue(IssueCreateRequest request) {
        User creator = findUser(request.getCreatedById(), "Creator");
        User assignee = request.getAssignedToId() == null ? null : findUser(request.getAssignedToId(), "Assignee");

        Issue issue = Issue.builder()
                .title(requireText(request.getTitle(), "title"))
                .description(requireText(request.getDescription(), "description"))
                .createdById(creator.getId())
                .assignedToId(assignee == null ? null : assignee.getId())
                .status(IssueStatus.OPEN)
                .build();

        return toResponse(issueRepository.save(issue), false);
    }

    @Override
    @Transactional(readOnly = true)
    public List<IssueResponse> getAllIssues() {
        return issueRepository.findAll().stream()
                .map(issue -> toResponse(issue, false))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public IssueResponse getIssueById(Long issueId) {
        return toResponse(findIssue(issueId), true);
    }

    @Override
    @Transactional
    public IssueResponse updateIssue(Long issueId, IssueUpdateRequest request) {
        Issue issue = findIssue(issueId);

        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            issue.setTitle(request.getTitle().trim());
        }

        if (request.getDescription() != null && !request.getDescription().isBlank()) {
            issue.setDescription(request.getDescription().trim());
        }

        if (request.getAssignedToId() != null) {
            issue.setAssignedToId(findUser(request.getAssignedToId(), "Assignee").getId());
        }

        if (request.getStatus() != null) {
            applyStatus(issue, request.getStatus());
        }

        return toResponse(issueRepository.save(issue), false);
    }

    @Override
    @Transactional
    public IssueResponse assignIssue(Long issueId, IssueAssignRequest request) {
        Issue issue = findIssue(issueId);
        User assignee = findUser(request.getAssigneeId(), "Assignee");
        issue.setAssignedToId(assignee.getId());
        return toResponse(issueRepository.save(issue), false);
    }

    @Override
    @Transactional
    public IssueResponse updateStatus(Long issueId, IssueStatusRequest request) {
        Issue issue = findIssue(issueId);
        applyStatus(issue, request.getStatus());
        return toResponse(issueRepository.save(issue), false);
    }

    @Override
    @Transactional
    public IssueResponse addComment(Long issueId, IssueCommentRequest request) {
        Issue issue = findIssue(issueId);
        User author = findUser(request.getAuthorId(), "Author");

        IssueComment comment = IssueComment.builder()
                .issueId(issue.getId())
                .authorId(author.getId())
                .content(requireText(request.getContent(), "content"))
                .build();

        issueCommentRepository.save(comment);
        return toResponse(issue, true);
    }

    @Override
    @Transactional
    public IssueResponse closeIssue(Long issueId) {
        Issue issue = findIssue(issueId);

        if (issue.getStatus() != IssueStatus.RESOLVED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Issue must be resolved before it can be closed");
        }

        issue.setStatus(IssueStatus.CLOSED);
        issue.setClosedAt(LocalDateTime.now());
        return toResponse(issueRepository.save(issue), false);
    }

    @Override
    @Transactional
    public void deleteIssue(Long issueId) {
        Issue issue = findIssue(issueId);

        if (issue.getStatus() != IssueStatus.RESOLVED && issue.getStatus() != IssueStatus.CLOSED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only resolved or closed issues can be deleted");
        }

        issueCommentRepository.deleteByIssueId(issueId);
        issueRepository.delete(issue);
    }

    private Issue findIssue(Long issueId) {
        return issueRepository.findById(issueId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Issue not found"));
    }

    private User findUser(Long userId, String roleLabel) {
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, roleLabel + " id is required");
        }

        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, roleLabel + " not found"));
    }

    private String requireText(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, fieldName + " is required");
        }

        return value.trim();
    }

    private void applyStatus(Issue issue, IssueStatus newStatus) {
        if (newStatus == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "status is required");
        }

        issue.setStatus(newStatus);

        if (newStatus == IssueStatus.RESOLVED) {
            issue.setResolvedAt(LocalDateTime.now());
            issue.setClosedAt(null);
        } else if (newStatus == IssueStatus.CLOSED) {
            if (issue.getResolvedAt() == null) {
                issue.setResolvedAt(LocalDateTime.now());
            }
            issue.setClosedAt(LocalDateTime.now());
        } else {
            issue.setResolvedAt(null);
            issue.setClosedAt(null);
        }
    }

    private IssueResponse toResponse(Issue issue, boolean includeComments) {
        List<IssueCommentResponse> comments = includeComments
                ? issueCommentRepository.findByIssueIdOrderByCreatedAtAsc(issue.getId()).stream()
                .map(this::toCommentResponse)
                .toList()
                : List.of();

        return IssueResponse.builder()
                .id(issue.getId())
                .title(issue.getTitle())
                .description(issue.getDescription())
                .status(issue.getStatus())
                .createdById(issue.getCreatedById())
                .createdByName(resolveUserName(issue.getCreatedById()))
                .assignedToId(issue.getAssignedToId())
                .assignedToName(resolveUserName(issue.getAssignedToId()))
                .createdAt(issue.getCreatedAt())
                .updatedAt(issue.getUpdatedAt())
                .resolvedAt(issue.getResolvedAt())
                .closedAt(issue.getClosedAt())
                .commentCount(issueCommentRepository.countByIssueId(issue.getId()))
                .comments(comments)
                .build();
    }

    private IssueCommentResponse toCommentResponse(IssueComment comment) {
        return IssueCommentResponse.builder()
                .id(comment.getId())
                .issueId(comment.getIssueId())
                .authorId(comment.getAuthorId())
                .authorName(resolveUserName(comment.getAuthorId()))
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }

    private String resolveUserName(Long userId) {
        if (userId == null) {
            return null;
        }

        return userRepository.findById(userId)
                .map(User::getName)
                .orElse("Unknown user");
    }
}