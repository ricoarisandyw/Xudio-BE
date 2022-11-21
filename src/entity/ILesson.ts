import { Column, Entity } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

@Entity({ name: "lesson" })
export class ILesson extends AppBaseEntity {
    @Column({ type: "int" })
    idCourse!: number
    @Column({ type: "string" })
    image!: string
    @Column({ type: "string" })
    title!: string
    @Column({ type: "string" })
    description?: string
}