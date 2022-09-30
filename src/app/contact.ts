export class Contact {
    public id: number;
    public name: string;
    public type: string;
    public number: string;

    constructor(id: number = null, name: string = '', type: string = '', number: string = '') {
        this.id = id;
        this.name = name;
        this.type = type;
        this.number = number
    }
}
