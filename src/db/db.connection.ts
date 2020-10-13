import { Connection, createConnection } from 'mongoose';

export class DatabaseConnection extends Connection {
    public static createConnection(): DatabaseConnection {
        return createConnection(
            process.env.MONGO_URL!,
            {
                dbName: 'car-shop',
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false
            }
        );
    }
}