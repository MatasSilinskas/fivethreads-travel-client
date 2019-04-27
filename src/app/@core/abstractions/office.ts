export class Office {
    public id: number;
    public name: string;
    public address: string;

    constructor();
    constructor(id?: number, name?: string, address?: string) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}


