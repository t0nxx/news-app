export declare class UserUpdateDto {
    fullName: string;
    email: string;
    number: string;
    password: string;
    profileImage: string;
    img: string;
    receiveNotification: boolean;
}
export declare function hashUpdatePass(pass: any): Promise<string>;
