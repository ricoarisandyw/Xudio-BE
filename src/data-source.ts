import "reflect-metadata"
import { DataSource } from "typeorm"
import { ICourse } from "./entity/ICourse"
import IRoom from "./entity/IRoom"
import IUser from "./entity/IUser"
import IUserDetail from "./entity/IUserDetail"
import IUserInCourse from "./entity/IUserInCourse"
import IVideo from "./entity/IVideo"

export const AppDataSource = new DataSource({
    type: "cockroachdb",
    url: "postgresql://xudio_official:ApJ54_pwiOzPN-OK_wJLOw@free-tier8.aws-ap-southeast-1.cockroachlabs.cloud:26257/xudio2",
    entities: [ICourse, IUser, IVideo, IUserInCourse, IUserDetail, IRoom],
    migrations: ["src/migrations/*"],
    ssl: true,
    extra: {
        options: "--cluster=pocket-boxer-2250",
        application_name: "docs_simplecrud_typeorm"
    },
})
 