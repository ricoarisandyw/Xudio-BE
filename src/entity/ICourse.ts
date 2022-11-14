import { Column, Entity } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

@Entity({ name: "course" })
export class ICourse extends AppBaseEntity {
    @Column({ type: "text" })
    name!: string
    @Column({ type: "text" })
    description!: string
    @Column({ type: "text" })
    beginDate!: string
    @Column({ type: "text" })
    dueDate!: string
    @Column({ type: "int" })
    companyId!: number
}