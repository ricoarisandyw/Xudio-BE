import { Column, Entity } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

@Entity({ name: "user_detail" })
export default class IUserDetail extends AppBaseEntity {
    @Column({ type: "int" })
    idUser!: number
    @Column({ type: "text" })
    email!: string
    @Column({ type: "text" })
    image!: string
    @Column({ type: "text" })
    name!: string
    @Column({ type: "text" })
    nip!: string
    @Column({ type: "text" })
    role!: string
}