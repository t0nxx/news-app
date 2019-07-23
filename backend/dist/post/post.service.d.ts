import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { PostReactions } from '../relationsEntities/postReactions.entity';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';
export declare class PostService {
    private readonly PostRepository;
    private readonly tagRepository;
    private readonly categoryRepository;
    private readonly userRepository;
    private readonly postReationsRepository;
    constructor(PostRepository: Repository<Post>, tagRepository: Repository<HashTag>, categoryRepository: Repository<Category>, userRepository: Repository<User>, postReationsRepository: Repository<PostReactions>);
    getAllPosts(paginate: any): Promise<any>;
    getPostsOfMySubscription(userId: number, paginate: any): Promise<any>;
    getOnePost(id: number): Promise<{
        data: Post;
        reactionsCount: number;
    }>;
    reactToPost(postId: number, userId: any, reaction: any): Promise<PostReactions | {
        data: string;
    }>;
    createNewPost(userId: any, PostDto: PostDto): Promise<{
        data: Post;
    }>;
    deletPost(id: number): Promise<any>;
}
