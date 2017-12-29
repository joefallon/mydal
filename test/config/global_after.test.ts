import { DatabaseUtilities } from "./DatabaseUtilities";

after((done) => {
    DatabaseUtilities.shutdownPool();
    done();
});