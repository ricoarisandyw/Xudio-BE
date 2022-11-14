import { Column, Entity } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

@Entity({ name: "user_in_course" })
export default class IUserInCourse extends AppBaseEntity {
    @Column({ type: "int" })
    idCourse!: number
    @Column({ type: "int" })
    idUser!: number
    @Column({ type: "int" })
    score!: number
    @Column({ type: "timestamptz" })
    startCourse!: Date
    @Column({ type: "timestamptz" })
    endCourse!: Date
}