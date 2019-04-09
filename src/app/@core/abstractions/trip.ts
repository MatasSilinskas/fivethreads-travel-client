// import { UserResponse } from '../services/user/user.service';

export class Trip {
    public id: string;
    public from: string;
    public to: string;
    public accommodation: string;
    public persons: number;
    public organizer: string;
    public status: Status[];

    constructor();
    constructor(id?: string, from?: string, to?: string, accommodation?: string, persons?: number, organizer?: string, status?: Status[]) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.accommodation = accommodation;
        this.persons = persons;
        this.organizer = organizer;
        this.status = status;
    }
}
export enum Status {
    'In planning process',
    'Planned',
    'Happend'
}



