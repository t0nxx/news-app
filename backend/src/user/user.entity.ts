import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, } from 'typeorm';
import { Category } from 'src/category/category.entity';

export enum UserRole {
    ADMIN = 'admin',
    MAINTAINER = 'maintainer',
    USER = 'user',
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    number: string;

    @Column({ /* select: false */ })
    password: string;

    @Column({ default: Math.floor(100000 + Math.random() * 900000) })
    changePassCode: number;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    /* start relations */
    @ManyToMany(type => Category)
    @JoinTable()
    subscribed: Category[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
