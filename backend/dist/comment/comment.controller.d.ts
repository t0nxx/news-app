import { CommentService } from './comment.service';
import { PaginationDto } from '../shared/pagination.filter';
import { CommentDto } from './comment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    getAllComments(paginate: PaginationDto): Promise<any>;
    getOneComment(id: any): Promise<any>;
    createNewUser(id: any, comment: CommentDto): Promise<any>;
    updateComment(id: any): Promise<void>;
    deleteComment(id: any): Promise<void>;
}
