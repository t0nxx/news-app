export declare class UserUpdateDto {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    password: string;
    fcmToken: string;
}
export declare function hashUpdatePass(pass: any): Promise<string>;
