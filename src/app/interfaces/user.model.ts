import { AppClaimDto } from './app-claim.model';



export interface UserAuthDto {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bearerToken: string;
  isAuthenticated: boolean;
  profilePhoto: string;
  claims: AppClaimDto[];
 
}

