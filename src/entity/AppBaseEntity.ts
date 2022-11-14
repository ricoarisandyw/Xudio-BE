import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export default class AppBaseEntity extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id!: number
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date
    @Column({ type: "timestamptz",nullable: true })
    updateAt!: Date
}