import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'longtext' })
    body: string;

    @Column({ default: 'hhh' })
    backgroundImage: string;

    @Column({ type: 'simple-array' })
    photos: string[];

    @Column({ default: 0 })
    reactionsCount: number;

    /* start relations */

    @ManyToOne(type => User, user => user.posts)
    @JoinTable()
    user: User;

    @ManyToMany(type => Category, { eager: true, onDelete: 'CASCADE' })
    @JoinTable()
    categories: Category[];

    @ManyToMany(type => HashTag, { eager: true, onDelete: 'CASCADE' })
    @JoinTable()
    tags: HashTag[];

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
