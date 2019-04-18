// import { UserResponse } from '../services/user/user.service';

export class Trip {
    public startDate: Date;
    public finishDate: Date;
    public id: string;
    public departure: string;
    public arrival: string;
    public tripMembers: TripMember[];
    public organizer_email: string;
    public status: Status[];
}

export class TripMember {
    public email: string;
    public isFlightTickedNeeded: boolean;
    public isAccommodationNeeded: boolean;
    public isCarNeeded: boolean;
    public flightTicketDTO: FlightTicket;
    public carTicketDTO: CarTicket;
    public accommodationDTO: Accommodation;
}

export class FlightTicket {
    public fileID: number[];
}

export class CarTicket {
    public carRentStart: Date;
    public carRentFinish: Date;
}

export class Accommodation {
    public accommodationStart: Date;
    public accommodationFinish: Date;
    public fileID: number[];
}

export enum Status {
    'In planning process',
    'Planned',
    'Happend'
}



