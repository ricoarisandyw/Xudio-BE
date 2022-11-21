import { Column, Entity } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

@Entity({ name: "teacher_in_room" })
export default class ITeacherInRoom extends AppBaseEntity{
    @Column({ type: "int" })
    idRoom!: number
    @Column({ type: "int" })
    idTeacher!: number
}