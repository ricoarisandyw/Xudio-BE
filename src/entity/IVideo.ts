import { Column, Entity } from "typeorm";
import AppBaseEntity from "./AppBaseEntity";

@Entity({ name: "video" })
export default class IVideo extends AppBaseEntity {
    @Column({ type: "text" })
    title!: string
    @Column({ type: "text" })
    description!: string
    @Column({ type: "text" })
    link!: string
}