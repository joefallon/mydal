export class Product {
    public id:          number;
    public name:        string;
    public description: string;
    public price:       number;
    public created:     string;
    public updated:     string;

    public constructor() {
        this.created     = '';
        this.description = null;
        this.id          = 0;
        this.name        = '';
        this.price       = 0;
        this.updated     = '';
    }
}