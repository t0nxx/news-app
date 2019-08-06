import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { PostReactions } from '../relationsEntities/postReactions.entity';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';
import { Source } from '../source/source.entity';
export declare class PostService {
    private readonly PostRepository;
    private readonly tagRepository;
    private readonly categoryRepository;
    private readonly userRepository;
    private readonly sourceRepository;
    private readonly postReationsRepository;
    constructor(PostRepository: Repository<Post>, tagRepository: Repository<HashTag>, categoryRepository: Repository<Category>, userRepository: Repository<User>, sourceRepository: Repository<Source>, postReationsRepository: Repository<PostReactions>);
    getAllPosts(paginate: any): Promise<any>;
    getPostsOfMySubscription(userId: number, paginate: any): Promise<any>;
    getOnePost(postId: number): Promise<{
        data: Post;
    }>;
    getOnePostDashBoard(postId: number): Promise<{
        data: {
            id: number;
            title: string;
            body: string;
            backgroundImage: string;
            comments: import("../comment/comment.entity").Comment[];
            reactionsCount: number;
            source: Source;
            createdAt: Date;
            updatedAt: Date;
            categories: number[];
            tags: number[];
        };
    }>;
    reactToPost(postId: number, userId: any, reaction: any): Promise<PostReactions | {
        data: string;
    }>;
    createNewPost(userId: any, PostDto: PostDto): Promise<{
        data: Post;
    }>;
    updatePost(id: number, updatePost: any): Promise<any>;
    deletPost(id: number): Promise<any>;
}
