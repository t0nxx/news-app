import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { PostReactions } from '../relationsEntities/postReactions.entity';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';
import { Source } from '../source/source.entity';
import { Comment } from '../comment/comment.entity';
export declare class PostService {
    private readonly PostRepository;
    private readonly tagRepository;
    private readonly categoryRepository;
    private readonly userRepository;
    private readonly sourceRepository;
    private readonly postReationsRepository;
    private readonly commentRepository;
    constructor(PostRepository: Repository<Post>, tagRepository: Repository<HashTag>, categoryRepository: Repository<Category>, userRepository: Repository<User>, sourceRepository: Repository<Source>, postReationsRepository: Repository<PostReactions>, commentRepository: Repository<Comment>);
    getAllPosts(paginate: any): Promise<any>;
    getPostsOfMySubscription(userId: number, paginate: any): Promise<any>;
    getOnePost(postId: number): Promise<{
        data: {
            reactions: any[];
            id: number;
            title: string;
            body: string;
            backgroundImage: string;
            reactionsCount: number;
            readCount: number;
            commentsCount: number;
            user: User;
            source: Source;
            categories: Category[];
            tags: HashTag[];
            comments: Comment[];
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getOnePostDashBoard(postId: number): Promise<{
        data: {
            id: number;
            title: string;
            body: string;
            backgroundImage: string;
            comments: Comment[];
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
    bookmarkPost(userId: any, postId: any): Promise<any>;
    unBookmarkPost(userId: any, postId: any): Promise<any>;
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
