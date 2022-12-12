import { Column } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

export default class IRole extends AppBaseEntity {
    @Column({ type: "string" })
    name!: string
}