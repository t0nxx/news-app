import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

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

    // @OneToMany(type => Order, order => order.user)
    // orders: Order[];

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
