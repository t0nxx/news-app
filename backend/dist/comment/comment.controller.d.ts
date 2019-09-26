import { CommentService } from './comment.service';
import { PaginationDto } from '../shared/pagination.filter';
import { CommentDto } from './comment.dto';
import { CommentUpdateDto } from './comment.update.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    getAllComments(paginate: PaginationDto): Promise<any>;
    getAllMyComments(paginate: PaginationDto, id: any): Promise<{
        data: any;
        count: any;
    }>;
    getOneComment(id: any): Promise<any>;
    createNewUser(id: any, comment: CommentDto): Promise<any>;
    updateComment(userId: any, id: any, cate: CommentUpdateDto): Promise<{
        data: import("./comment.entity").Comment;
    } | {
        data: string;
    }>;
    deleteComment(userId: any, id: any): Promise<any>;
    reportComment(id: any): Promise<any>;
}
