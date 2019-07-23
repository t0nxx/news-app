import { Comment } from './comment.entity';
import { TreeRepository, Repository } from 'typeorm';
import { CommentDto } from './comment.dto';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
export declare class CommentService {
    private readonly commentRepository;
    private readonly userRepository;
    private readonly postRepository;
    constructor(commentRepository: TreeRepository<Comment>, userRepository: Repository<User>, postRepository: Repository<Post>);
    getAllComments(paginate: any): Promise<any>;
    getRepliesOfComments(id: number, paginate: any): Promise<any>;
    getOneComment(id: number): Promise<any>;
    CreateNewComment(userId: number, commentDto: CommentDto): Promise<any>;
}
