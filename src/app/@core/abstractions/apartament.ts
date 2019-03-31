// import { UserResponse } from '../services/user/user.service';

export class Apartament {
    public id: string;
    public name: string;
    public office: string;
    public adress: string;
    public places: number;

    constructor();
    constructor(id?: string, name?: string, office?: string, adress?: string, places?: number) {
        this.id = id;
        this.name = name;
        this.office = office;
        this.adress = adress;
        this.places = places;
    }
}


