import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../category/category.entity";

@Entity()
export class Notification {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}