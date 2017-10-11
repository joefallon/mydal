export class Product {
    private _id: number;
    private _name: string;
    private _description: string|null;
    private _price: number;
    private _created: string;
    private _updated: string;

    public constructor() {
        this._id          = 0;
        this._name        = '';
        this._description = null;
        this._price       = 0;
        this._created     = '';
        this._updated     = '';
    }

    public getId(): number {
        return this._id;
    }

    public setId(value: number) {
        this._id = value;
    }

    public getName(): string {
        return this._name;
    }

    public setName(value: string) {
        this._name = value;
    }

    public getDescription(): string|null {
        return this._description;
    }

    public setDescription(value: string) {
        this._description = value;
    }

    public getPrice(): number {
        return this._price;
    }

    public setPrice(value: number) {
        this._price = value;
    }

    public getCreated(): string {
        return this._created;
    }

    public setCreated(value: string) {
        this._created = value;
    }

    public getUpdated(): string {
        return this._updated;
    }

    public setUpdated(value: string) {
        this._updated = value;
    }
}
