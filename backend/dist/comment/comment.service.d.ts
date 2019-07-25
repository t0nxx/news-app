import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './comment.dto';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { CommentUpdateDto } from './comment.update.dto';
export declare class CommentService {
    private readonly commentRepository;
    private readonly userRepository;
    private readonly postRepository;
    constructor(commentRepository: Repository<Comment>, userRepository: Repository<User>, postRepository: Repository<Post>);
    getAllComments(paginate: any): Promise<any>;
    getRepliesOfComments(id: number, paginate: any): Promise<any>;
    getOneComment(id: number): Promise<any>;
    CreateNewComment(userId: number, commentDto: CommentDto): Promise<any>;
    updateComment(userId: any, id: number, comm: CommentUpdateDto): Promise<{
        data: Comment;
    } | {
        data: string;
    }>;
    deletComment(userId: any, id: number): Promise<any>;
    ReportComment(id: number): Promise<any>;
}
