export class Apartament {
    public id: string;
    public address: string;
    public officeId: number;

    constructor();
    constructor(id?: string, officeId?: number, address?: string) {
        this.id = id;
        this.officeId = officeId;
        this.address = address;
    }
}


