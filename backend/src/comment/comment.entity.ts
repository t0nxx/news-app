import { Entity, Tree, PrimaryGeneratedColumn, Column, TreeChildren, TreeParent, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
@Tree('closure-table')
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @Column({ default: 0 })
    reports: number;
    /* multi level Children */
    @TreeChildren()
    children: Comment[];

    @TreeParent()
    parent: Comment;

    /* start relations */
    @ManyToOne(type => User, user => user.comments, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(type => Post, post => post.comments, { onDelete: 'CASCADE' })
    post: Post;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
