
class Product {
    private id:number          = 0;
    private name:string        = '';
    private description:string = null;
    private price:number       = 0;
    private created:string     = '';
    private updated:string     = '';

    public getId():number {
        return this.id;
    }

    public setId(value:number) {
        this.id = value;
    }

    public getName():string {
        return this.name;
    }

    public setName(value:string) {
        this.name = value;
    }

    public getDescription():string {
        return this.description;
    }

    public setDescription(value:string) {
        this.description = value;
    }

    public getPrice():number {
        return this.price;
    }

    public setPrice(value:number) {
        this.price = value;
    }

    public getCreated():string {
        return this.created;
    }

    public setCreated(value:string) {
        this.created = value;
    }

    public getUpdated():string {
        return this.updated;
    }

    public setUpdated(value:string) {
        this.updated = value;
    }
}

export = Product;
