import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @ManyToOne(type => Comment, comment => comment.reports, { onDelete: 'CASCADE' })
    comment: Comment;

    @ManyToOne(type => User, user => user.reports, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
