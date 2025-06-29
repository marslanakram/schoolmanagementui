export interface TeacherDto {
  id: number;
  userId: number;
  teacherId: string;
  firstName: string;
  lastName: string;
  hireDate: string; // ISO date string
  specialization: string;
  phoneNumber: string;
  email: string;
  address: string;
  qualifications: string;
  bio: string;
  gender: string;
  photoUrl: string;
  isActive: boolean;
  endDate: string; // ISO date string
}
