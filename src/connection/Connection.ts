import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import Track from "../entity/Track";

export class ConnectORM {

    private static connection: Connection;

    public static createConnection = async () : Promise<Connection> => {
        if(!ConnectORM.connection) {
            if(ConnectORM.connection) {
                return ConnectORM.connection;
            } else {
                let options:any = {
                    type: 'postgres',
                    host: 'ec2-18-210-51-239.compute-1.amazonaws.com',
                    port: 5432,
                    username: 'odlsdhpexnjqmk',
                    password: 'c0bd72261858f0b88a54ad6a206300ea79fa5eab1df44ffde77c5ae69d93400d',
                    database: 'd7gh049stjn0bu',
                    schema: 'public',
                    entities : [
                        Track
                    ],
                    extra: {
                      ssl: true
                    },
                    synchronize : false,
                    logging : true,
                    options: {
                        enableArithAbort: true,
                        encrypt:false,
                    }
                }
                const myConnection = await createConnection(options);
                ConnectORM.connection = myConnection;
            }
        }
        return ConnectORM.connection;
    }

    public static getConnection = async () => {
        const connection = await ConnectORM.createConnection();
        return connection;

    }

    public static getRepository = async (entity:any) => {
        const repository = await ConnectORM.getRepository(entity);
        return repository;
    }
}

