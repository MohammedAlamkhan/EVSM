import { Role } from "app/auth/models";
import {Pagination} from '../Models/Pagination';

export class UserDetails {

    userId: number;
    roles: Role;
    fullName: string;
    emailId: string;
    mobileNo: string;
    userType: string;
    designation: string;
    username: string;
    password: string
    accessToken: string
    refreshToken: string
    expireDateTime: Date;
    enabled: boolean;
    status: boolean;
    authorities: any;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean
    }
    export class Response {
        responseCode : string;
        message: string;
        httpStatusCode : any;
    }
    
    // export class UserResponse extends Response {
    // credentials : UserDetails;
    // } 
    export class UserResponse {
    credentials : UserDetails;
    } 
    
    export class TokenDetails  {
        token : string;
        } 

        export class roles{
            roleId: number;
            roleName: string;
            description: string;
            status: boolean
        }

        export class AllUsers extends Pagination{
            users : UserDetails[];
        }

       
    
    
       
    
        
    
    
    
    
    
    
    
    