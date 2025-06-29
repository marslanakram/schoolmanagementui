export interface StudentDto {
  id: number;
  rollNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;  // ISO string format
  gender: string;
  bloodGroup: string;
  guardianName: string;
  guardianContact: string;
  enrollmentDate: string; // ISO string format
  isActive: boolean;
  photoUrl: string;
  currentClassId: number;
}
