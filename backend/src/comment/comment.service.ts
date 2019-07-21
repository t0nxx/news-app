import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: TreeRepository<Comment>,
    ) { }

    async getAllComments(paginate: any): Promise<any> {
        const q = this.commentRepository
            .createQueryBuilder('comment')
            .where(`comment.post = ${paginate.postId} and comment.parent IS NULL`)
            .innerJoin('comment.post', 'post')
            .innerJoin('comment.user', 'user')
            .addSelect(['post.id', 'user.id', 'user.fullName']);

        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['body']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }
    async getRepliesOfComments(paginate: any): Promise<any> {
        const q = this.commentRepository
            .createQueryBuilder('comment')
            .where(`comment.parent = ${paginate.parentId}`)
            .innerJoin('comment.post', 'post')
            .innerJoin('comment.user', 'user')
            .addSelect(['post.id', 'user.id', 'user.fullName']);

        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['body']);
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
}
