import { Column, Entity } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

@Entity({ name: "room" })
export default class IRoom extends AppBaseEntity {
    @Column({ type: "string" })
    name!: string
    @Column({ type: "string" })
    status!: string
    @Column({ type: "int" })
    filled!: number
    @Column({ type: "int" })
    capacity!: number
    @Column({ type: "int" })
    adminRoom!: number
    @Column({ type: "string" })
    image!: string


}