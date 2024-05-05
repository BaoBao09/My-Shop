import { Role } from "./role";
export class User {
    id: string | undefined;
    userName: string | undefined;
    password: string | undefined;
    fullName: string | undefined;
    role: Role | undefined;
    token?: string;
}