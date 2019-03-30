// import { UserResponse } from '../services/user/user.service';

export class User {
    public id: string;
    public email: string;
    public phone: string;
    public firstname: string;
    public lastname: string;
    public role: Role[];

    constructor();
    constructor(id?: string, email?: string, phone?: string, firstname?: string, lastname?: string, role?: Role[]) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
    }
}

export enum Role {
    'ROLE_USER',
    'ROLE_ADMIN',
    'ROLE_ORGANIZER'
}
