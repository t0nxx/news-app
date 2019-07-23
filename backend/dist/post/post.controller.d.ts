import { PostService } from './post.service';
import { PaginationDto } from '../shared/pagination.filter';
import { PostDto } from './post.dto';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getAllPosts(paginate: PaginationDto): Promise<any>;
    getOnepost(id: any): Promise<{
        data: import("./post.entity").Post;
        reactionsCount: number;
    }>;
    reactToPost(userid: any, postid: any, reaction: any): Promise<import("../relationsEntities/postReactions.entity").PostReactions | {
        data: string;
    }>;
    createNewPost(id: any, post: PostDto, files: any[]): Promise<{
        data: import("./post.entity").Post;
    }>;
    getPostsOfMySubscription(id: any, paginate: PaginationDto): Promise<any>;
    deletepost(id: any): Promise<any>;
}
