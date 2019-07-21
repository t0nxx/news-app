import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, } from 'typeorm';
import { Category } from '../category/category.entity';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';

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
    fullName: string;

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

    @OneToMany(type => Post, post => post.user)
    posts: Post[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
