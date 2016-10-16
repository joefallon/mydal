declare class Product {
    private id;
    private name;
    private description;
    private price;
    private created;
    private updated;
    getId(): number;
    setId(value: number): void;
    getName(): string;
    setName(value: string): void;
    getDescription(): string;
    setDescription(value: string): void;
    getPrice(): number;
    setPrice(value: number): void;
    getCreated(): string;
    setCreated(value: string): void;
    getUpdated(): string;
    setUpdated(value: string): void;
}
export = Product;
