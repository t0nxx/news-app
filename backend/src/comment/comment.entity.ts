import { Entity, Tree, PrimaryGeneratedColumn, Column, TreeChildren, TreeParent, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
@Tree('closure-table')
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;
    /* multi level Children */
    @TreeChildren()
    children: Comment[];

    @TreeParent()
    parent: Comment;

    /* start relations */
    @ManyToOne(type => User, user => user.comments)
    user: User;

    @ManyToOne(type => Post, post => post.comments)
    post: Post;
}
