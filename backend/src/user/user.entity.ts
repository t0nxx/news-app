import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, } from 'typeorm';
import { Category } from '../category/category.entity';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Report } from '../report/report.entity';

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

    @Column({ default: 'no number' })
    number: string;

    @Column({ default: true })
    receiveNotification: boolean;

    @Column({ /* select: false */ })
    password: string;

    @Column({ default: Math.floor(100000 + Math.random() * 900000) })
    changePassCode: number;

    @Column({ type: 'simple-array', default: null })
    fcmTokens: string[];

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column({ default: 'https://news-app-uploads.s3.eu-central-1.amazonaws.com/1567899027453%20-%20download.png' })
    profileImage: string;

    /* start relations */
    @ManyToMany(type => Category)
    @JoinTable()
    subscribed: Category[];

    @ManyToMany(type => Post)
    @JoinTable()
    bookmarks: Post[];

    @OneToMany(type => Post, post => post.user)
    posts: Post[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(type => Comment, comment => comment.user)
    reports: Report[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
