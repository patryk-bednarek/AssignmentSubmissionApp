package com.coderscampus.AssignmentSubmissionApp.dto;

import com.coderscampus.AssignmentSubmissionApp.domain.Assignment;
import com.coderscampus.AssignmentSubmissionApp.enums.AssignmentEnum;
import com.coderscampus.AssignmentSubmissionApp.enums.AssignmentStatusEnum;


public class AssignmentResponseDTO {
    private Assignment assignment;
    private AssignmentEnum[] assignmentEnums =  AssignmentEnum.values();
    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();

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

    public AssignmentStatusEnum[] getStatusEnums() {
        return statusEnums;
    }
}
