import { IError } from 'mysql';
declare class DatabaseUtilities {
    static clean(callback: (err: IError) => void): void;
}
export = DatabaseUtilities;
