import { Column, Entity } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

@Entity({ name: "room" })
export default class IRoom extends AppBaseEntity {
    @Column({ type: "string" })
    name!: string
    @Column({ type: "string" })
    status!: string
    @Column({ type: "int", default: "0" })
    filled?: number
    @Column({ type: "int" })
    capacity!: number
    @Column({ type: "int", default: "0" })
    adminRoom?: number
    @Column({ type: "string" })
    image!: string
    @Column({ type: "int", default: "0" })
    idCourse?: number
} 