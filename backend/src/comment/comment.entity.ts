import { Entity, Tree, PrimaryGeneratedColumn, Column, TreeChildren, TreeParent, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('longtext')
    body: string;

    @Column({ default: 0 })
    reports: number;

    @Column({ default: 0 })
    reply_count: number;
    // /* multi level Children */
    // @TreeChildren()
    // children: Comment[];

    // @TreeParent()
    // parent: Comment;
    @Column({ default: null })
    parentId: number;

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
