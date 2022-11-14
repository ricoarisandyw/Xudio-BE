import { Column, Entity } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

@Entity({ name: "user" })
export default class IUser extends AppBaseEntity {
    @Column({ type: "text" })
    username!: string
    @Column({ type: "text" })
    password!: string
}