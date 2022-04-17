import {DataSource} from 'typeorm'
import { Bill } from '../entity/bill';

export const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || '127.0.0.1',
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'pg-bill',
    entities: [Bill],
    synchronize: true,
    logging: true,
  });


export const getDataSource = ():DataSource=>{

    return dataSource
}