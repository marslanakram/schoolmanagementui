export interface TeacherAssignmentDto {
  id: number;
  teacherId: number;
  subjectId: number;
  classId: number;
  assignmentDate: string;  // ISO 8601 date string
  schedule: string;
}
