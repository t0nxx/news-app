import { PostService } from './post.service';
import { PaginationDto } from '../shared/pagination.filter';
import { PostDto } from './post.dto';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getAllPosts(paginate: PaginationDto): Promise<any>;
    getOnepostDashBoard(id: any): Promise<{
        data: {
            id: number;
            title: string;
            body: string;
            backgroundImage: string;
            comments: import("../comment/comment.entity").Comment[];
            reactionsCount: number;
            source: import("../source/source.entity").Source;
            createdAt: Date;
            updatedAt: Date;
            categories: number[];
            tags: number[];
        };
    }>;
    getOnepost(id: any): Promise<{
        data: {
            reactions: any[];
            id: number;
            title: string;
            body: string;
            backgroundImage: string;
            reactionsCount: number;
            user: import("../user/user.entity").User;
            source: import("../source/source.entity").Source;
            categories: import("../category/category.entity").Category[];
            tags: import("../hashtag/hashtage.entity").HashTag[];
            comments: import("../comment/comment.entity").Comment[];
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
    updatepost(id: any, post: PostDto, files: any[]): Promise<any>;
    deletepost(id: any): Promise<any>;
    bookmarkPost(id: any, postId: any): Promise<any>;
    unBookmarkPost(id: any, postId: any): Promise<any>;
}
