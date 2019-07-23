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

    @ManyToOne(type => User, user => user.id, { onDelete: 'CASCADE' })
    user: number;

    @ManyToOne(type => Post, post => post.id, { onDelete: 'CASCADE' })
    post: number;
    /*reactions count */
    @Column({ type: 'enum', enum: reactionEnum })
    reaction: number;
}   
