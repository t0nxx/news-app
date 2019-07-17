import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

export enum reactionEnum {
    like = 'like',
    love = 'love',
    haha = 'haha',
    wow = 'wow',
    sad = 'sad',
    angry = 'angry',
}
@Entity()
export class PostReactions {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id)
    user: number;

    @ManyToOne(type => Post, post => post.id)
    post: number;
    /*reactions count */
    @Column({ type: 'enum', enum: reactionEnum })
    reaction: number;
}   
