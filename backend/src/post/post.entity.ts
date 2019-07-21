import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';

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

    /* start relations */

    @ManyToOne(type => User, user => user.posts)
    @JoinTable()
    user: User;

    @ManyToMany(type => Category, { eager: true })
    @JoinTable()
    categories: Category[];

    @ManyToMany(type => HashTag, { eager: true })
    @JoinTable()
    tags: HashTag[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
