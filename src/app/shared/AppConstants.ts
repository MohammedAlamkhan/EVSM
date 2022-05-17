export class AppConstants {
    public static readonly ApiErrorMessage: string = '0001 - API Error occurred. Please contact IT support';
    public static readonly ContactAdminTeamMessage: string = 'Error Occurred. Please contact admin team';
    public static readonly AuthCodeErrorMessage: string = 'AuthCode is not valid';
    public static readonly ActionFailedErrorMessage: string = '0002 - Error occurred. Please contact IT Support';
    public static readonly UnAuthErrorMessage: string = '0003 - Un-authorised error occurred. Please contact IT Support';
    
    public static readonly HTTPSTATUS_BAD_REQUEST: number = 400;
    public static readonly HTTPSTATUS_UNAUTHORISED_REQUEST: number = 401;
    public static readonly HTTPSTATUS_INTERNAL_SERVER_ERROR: number = 500;

    public static readonly ExportAllSuccessful: string = 'You request for this report has been submitted. You\'ll receive an email shortly';
}