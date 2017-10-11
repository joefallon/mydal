export declare class Product {
    private _id;
    private _name;
    private _description;
    private _price;
    private _created;
    private _updated;
    constructor();
    getId(): number;
    setId(value: number): void;
    getName(): string;
    setName(value: string): void;
    getDescription(): string | null;
    setDescription(value: string): void;
    getPrice(): number;
    setPrice(value: number): void;
    getCreated(): string;
    setCreated(value: string): void;
    getUpdated(): string;
    setUpdated(value: string): void;
}
