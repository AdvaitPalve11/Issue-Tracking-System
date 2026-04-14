package com.Advait.Issue.repository;

import com.Advait.Issue.model.Issue;
import com.Advait.Issue.model.IssueStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByStatusOrderByUpdatedAtDesc(IssueStatus status);
}