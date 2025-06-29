export interface ClassDto {
  id: number;
  name: string;
  description: string;
  academicYear: number;
  gradeLevel: number;
  section: number;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  homeroomTeacherId: number;
  isActive: boolean;
}
