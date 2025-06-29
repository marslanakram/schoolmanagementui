export interface AttendanceDto {
  id: number;
  studentId: number;
  classId: number;
  date: string;       
  isPresent: boolean;
  notes: string;
}
