import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./entity/Category"
import { Product } from "./entity/Product"
import { Profile } from "./entity/Profile"

import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ip",
    synchronize: true,
    logging: false,
    entities: [User,Product,Category,Profile],
    migrations: [],
    subscribers: [],
})
