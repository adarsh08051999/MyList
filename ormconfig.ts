import * as path from 'path';
import { ConnectionOptions } from 'typeorm';
import Data from './src/models/myListData';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
const entities = [
    Data
];
export = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: process.env.DB_QUERY_LOGGING === 'true',
    schema: "public",
    entityPrefix: "",
    entities,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: [path.join(__dirname, 'migration', '*.*')],
    cli: {
        migrationsDir: 'migration',
    },
    synchronize: false,
} as ConnectionOptions;
