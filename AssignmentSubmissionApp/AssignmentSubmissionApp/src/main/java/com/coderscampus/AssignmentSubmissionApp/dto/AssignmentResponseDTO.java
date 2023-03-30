package com.coderscampus.AssignmentSubmissionApp.dto;

import com.coderscampus.AssignmentSubmissionApp.domain.Assignment;
import com.coderscampus.AssignmentSubmissionApp.enums.AssignmentEnum;


public class AssignmentResponseDTO {
    private Assignment assignment;
    private AssignmentEnum[] assignmentEnums =  AssignmentEnum.values();

    public AssignmentResponseDTO(Assignment assignment) {
        super();
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public AssignmentEnum[] getAssignmentEnums() {
        return assignmentEnums;
    }
}
