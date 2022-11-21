import { Column, Entity } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

@Entity({ name: "teacher" })
export default class ITeacher extends AppBaseEntity {
    @Column({ type: "string" })
    name!: string
    @Column({ type: "string" })
    nip!: string
}