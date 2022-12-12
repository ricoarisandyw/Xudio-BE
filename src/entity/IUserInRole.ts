import { Column } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

export default class IUserInRole extends AppBaseEntity {
    @Column({ type: "number" })
    idUser!: number
    @Column({ type: "number" })
    idRole!: number
}