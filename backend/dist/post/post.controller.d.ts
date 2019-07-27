import { PostService } from './post.service';
import { PaginationDto } from '../shared/pagination.filter';
import { PostDto } from './post.dto';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getAllPosts(paginate: PaginationDto): Promise<any>;
    getOnepost(id: any): Promise<{
        data: {
            id: number;
            title: string;
            body: string;
            backgroundImage: string;
            categories: import("../category/category.entity").Category[];
            tags: import("../hashtag/hashtage.entity").HashTag[];
            reactionsCount: number;
            createdAt: Date;
            updatedAt: Date;
        };
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
