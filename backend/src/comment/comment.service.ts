import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './comment.entity';
import { TreeRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';
import { CommentDto } from './comment.dto';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { CommentUpdateDto } from './comment.update.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) { }

    async getAllComments(paginate: any): Promise<any> {
        const q = this.commentRepository
            .createQueryBuilder('comment')
            .innerJoin('comment.post', 'post')
            .innerJoin('comment.user', 'user')
            .addSelect(['post.id', 'user.id', 'user.fullName', 'user.profileImage'])
            .orderBy('comment.id', 'DESC');

        if (paginate.postId) {
            q.where(`comment.parentId IS NULL`) /* null mean not has parent id */
            q.andWhere(`comment.post = ${paginate.postId}`);
        }
        if (paginate.parentId) {
            q.where(`comment.parentId = ${paginate.parentId}`);
        }
        /* hint am leaving it withput exception bcz all comments in admin panel*/
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['comment.body'], 'comment');
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }

    async getMyComments(id: number, paginate: any) {
        const q = this.commentRepository
            .createQueryBuilder('comment')
            .innerJoin('comment.post', 'post')
            .innerJoin('comment.user', 'user')
            .where(`user.id = ${id}`)
            .addSelect(['post.id', 'user.id', 'user.fullName', 'user.profileImage']);

        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['comment.body'], 'comment');
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };

    }

    async getRepliesOfComments(id: number, paginate: any): Promise<any> {
        const q = this.commentRepository
            .createQueryBuilder('comment')
            .where(`comment.parentId = ${id}`)
            .innerJoin('comment.post', 'post')
            .innerJoin('comment.user', 'user')
            .addSelect(['post.id', 'user.id', 'user.fullName', 'user.profileImage']);

        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['comment.body']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }
    async getOneComment(id: number, paginate: any): Promise<any> {
        const q = await this.commentRepository
            .createQueryBuilder('comment')
            .where(`comment.id = ${id}`)
            .innerJoin('comment.post', 'post')
            .innerJoin('comment.user', 'user')
            .addSelect(['post.id', 'user.id', 'user.fullName', 'user.profileImage'])
            .getOne();
        const replies = this.commentRepository
            .createQueryBuilder('comment')
            .where(`comment.parentId = ${id}`)
            .innerJoin('comment.post', 'post')
            .innerJoin('comment.user', 'user')
            .addSelect(['post.id', 'user.id', 'user.fullName', 'user.profileImage']);
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, replies, ['comment.body']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data: { comment: q, replies: { data, count } } };
    }

    async CreateNewComment(userId: number, commentDto: CommentDto): Promise<any> {
        const post = await this.postRepository.findOne({ id: commentDto.postId });
        if (!post) {
            throw new NotFoundException('invalid post id');
        }
        const user = await this.userRepository.findOne({ id: userId });
        if (!user) {
            throw new NotFoundException('invalid user id');
        }

        const comment = new Comment();
        comment.post = post;
        comment.user = user;
        comment.body = commentDto.body;
        if (commentDto.parentId) {
            const parent = await this.commentRepository.findOne({ id: commentDto.parentId })
            comment.parentId = parent.id;
            parent.reply_count = parent.reply_count + 1;
            await this.commentRepository.save(parent);
        }
        post.commentsCount = post.commentsCount + 1;
        await this.postRepository.save(post);
        const save = await this.commentRepository.save(comment);
        const { id, body, createdAt, updatedAt, reports } = save;
        return { data: { id, body, reports, createdAt, updatedAt } };
    }

    async updateComment(userId, id: number, comm: CommentUpdateDto) {
        const findOne = await this.commentRepository
            .createQueryBuilder('comment')
            .where(`comment.id = ${id}`)
            .innerJoin('comment.user', 'user')
            .addSelect(['user.id', 'user.fullName', 'user.profileImage'])
            .getOne();
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const user = await this.userRepository.findOne({ id: userId });

        if (findOne.user.id == user.id) {
            findOne.body = comm.body;
            await this.commentRepository.save(findOne);
            return { data: findOne };
        } else {
            return { data: 'not allowed' }
        }

    }

    async deletComment(userId, id: number): Promise<any> {
        const findOne = await this.commentRepository
            .createQueryBuilder('comment')
            .where(`comment.id = ${id}`)
            .innerJoin('comment.user', 'user')
            .addSelect(['user.id', 'user.fullName', 'user.profileImage'])
            .getOne();
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const user = await this.userRepository.findOne({ id: userId });

        if (findOne.user.id == user.id || user.role == 'admin' || user.role == 'maintainer') {
            await this.commentRepository.delete(id);
            return { data: findOne };
        } else {
            return { data: 'not allowed' }
        }

    }

    async ReportComment(id: number): Promise<any> {
        const findOne = await this.commentRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.commentRepository.increment({ id }, 'reports', 1);
        return { data: findOne };
    }
}
