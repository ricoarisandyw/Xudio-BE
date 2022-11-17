import { Column, Entity } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

@Entity({ name: "user_in_room" })
export class IUserInRoom extends AppBaseEntity {
    @Column({ type: "int" })
    idUser!: number
    @Column({ type: "int" })
    idRoom!: number
}