import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class Source {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 'https://www.google.com/' })
    link: string;

    @Column({ default: 'no image' })
    backgroundImage: string;


    @OneToMany(type => Post, post => post.source)
    posts: Post[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
