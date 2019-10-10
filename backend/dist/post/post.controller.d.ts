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
            like: string;
            love: string;
            haha: string;
            wow: string;
            sad: string;
            angry: string;
        };
    }>;
    getOnepost(id: any, paginate: any): Promise<{
        data: {
            reactions: any[];
            comments: import("../comment/comment.entity").Comment[];
        };
    }>;
    reactToPost(userid: any, postid: any, reaction: any): Promise<{
        data: {
            reactions: any[];
            comments: import("../comment/comment.entity").Comment[];
        };
    }>;
    createNewPost(id: any, post: PostDto, files: any[]): Promise<{
        data: import("./post.entity").Post;
    }>;
    getPostsOfMySubscription(id: any, paginate: PaginationDto): Promise<any>;
    updatepost(id: any, post: any, files: any[]): Promise<any>;
    deletepost(id: any): Promise<any>;
    bookmarkPost(id: any, postId: any): Promise<any>;
    unBookmarkPost(id: any, postId: any): Promise<any>;
    getStatistics(): Promise<{
        commentsCount: number;
        usersCount: number;
        postsCount: number;
        reactionsCount: number;
        tagsCount: number;
        categoriesCount: number;
        mostLiked: any;
        mostLoved: any;
        mostAngry: any;
        mostCommented: any;
    }>;
}
