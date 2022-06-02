import { Role } from "app/auth/models";
import {Pagination} from '../Models/Pagination';

export class UserDetails {
    emailId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    token: string;
    deviceId: string;
    defaultPage: string;
    createdDate: string;
    modifiedDate: string;
    nav: any;
    objectAccess:any;
    roleGroupAndAccount:any;
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

       
    
    
       
    
        
    
    
    
    
    
    
    
    