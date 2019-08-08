export declare class UserUpdateDto {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    password: string;
    profileImage: string;
}
export declare function hashUpdatePass(pass: any): Promise<string>;
