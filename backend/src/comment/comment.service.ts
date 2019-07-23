import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './comment.entity';
import { TreeRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';
import { CommentDto } from './comment.dto';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: TreeRepository<Comment>,
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
            .addSelect(['post.id', 'user.id', 'user.fullName', 'comment.parentId']);

        if (paginate.postId) {
            q.where(`comment.parent IS NULL`) /* null mean not has parent id */
            q.andWhere(`comment.post = ${paginate.postId}`);
        }
        if (paginate.parentId) {
            q.where(`comment.parent = ${paginate.parentId}`);
        }
        /* hint am leaving it withput exception bcz all comments in admin panel*/
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['comment.body'], 'comment');
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }
    async getRepliesOfComments(id: number, paginate: any): Promise<any> {
        const q = this.commentRepository
            .createQueryBuilder('comment')
            .where(`comment.parent = ${id}`)
            .innerJoin('comment.post', 'post')
            .innerJoin('comment.user', 'user')
            .addSelect(['post.id', 'user.id', 'user.fullName']);

        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['comment.body']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }
    async getOneComment(id: number): Promise<any> {
        const q = await this.commentRepository
            .createQueryBuilder('comment')
            .where(`comment.id = ${id}`)
            .innerJoin('comment.post', 'post')
            .innerJoin('comment.user', 'user')
            .addSelect(['post.id', 'user.id', 'user.fullName'])
            .getOne();
        return { data: q };
    }

    async CreateNewComment(userId: number, commentDto: CommentDto): Promise<any> {
        const post = await this.postRepository.findOne({ id: commentDto.postId });
        console.log(commentDto)
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
            comment.parent = parent;
        }
        const save = await this.commentRepository.save(comment);
        const { id, body, createdAt, updatedAt, reports } = save;
        return { data: { id, body, reports, createdAt, updatedAt } };
    }
}
