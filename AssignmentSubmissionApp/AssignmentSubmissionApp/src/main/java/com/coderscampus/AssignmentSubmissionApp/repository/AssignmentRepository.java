package com.coderscampus.AssignmentSubmissionApp.repository;

import com.coderscampus.AssignmentSubmissionApp.domain.Assignment;
import com.coderscampus.AssignmentSubmissionApp.domain.User;
import com.coderscampus.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);
    Optional<Assignment> findById(Long id);

    @Query("SELECT a FROM Assignment a WHERE a.status = 'Submited'")
    Set<Assignment> findByCodeReviewer(User user);
}
