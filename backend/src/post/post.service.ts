import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PaginationDto } from '../shared/pagination.filter';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { PostUpdateDto } from './post.update.dto';
import { PostReactions, reactionEnum } from '../relationsEntities/postReactions.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly PostRepository: Repository<Post>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(PostReactions)
        private readonly postReationsRepository: Repository<PostReactions>,
    ) { }

    /* get all Posts */
    async getAllPosts(paginate: any): Promise<any> {
        const q = this.PostRepository.createQueryBuilder('post');
        q.leftJoinAndSelect('post.categories', 'categories');
        q.leftJoinAndSelect('post.tags', 'tags');
        q.innerJoin('post.user', 'user');
        q.addSelect(['user.id', 'user.firstName', 'user.lastName']);
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['content']);

        /* http ****** ?tag= */
        if (paginate.tag) {
            q.where(`tags.name like '%${paginate.tag}%'`);
        }
        /* http ****** ?category= */
        if (paginate.category) {
            q.where(`categories.name like '%${paginate.category}%'`);
        }
        /* http ****** ?userID= */
        if (paginate.userID) {
            q.where(`user.id  = ${paginate.userID}`);
        }

        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }


    /* get my Subscription */
    async getPostsOfMySubscription(userId: number, paginate: any): Promise<any> {
        const findOne = await this.userRepository.findOne({ id: userId }, { relations: ['subscribed'] });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        // destruct categories id in one array
        const ids = findOne.subscribed.map(cate => cate.id);

        const q = this.PostRepository.createQueryBuilder('post');
        q.leftJoinAndSelect('post.categories', 'categories', `categories.id IN (${ids})`)
            .orderBy('post_id', 'DESC');

        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['content']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }


    /* get one Post */
    async getOnePost(id: number) {
        const findOne = await this.PostRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return { data: findOne };

    }

    /* react to post */
    async reactToPost(postId: number, userId, reaction) {
        const findOne = await this.PostRepository.findOne({ id: postId });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const newReaction = new PostReactions();
        const isReacted = await this.postReationsRepository.findOne({ user: userId, post: postId });

        if (isReacted) {
            if (isReacted.reaction === reaction) {
                return await this.postReationsRepository.remove(isReacted);
            } else {
                newReaction.id = isReacted.id;
            }

        }
        let rct;
        switch (reaction) {
            case 'like':
                rct = reactionEnum.like;
                break;
            case 'love':
                rct = reactionEnum.love;
                break;
            case 'haha':
                rct = reactionEnum.haha;
                break;
            case 'wow':
                rct = reactionEnum.wow;
                break;
            case 'sad':
                rct = reactionEnum.sad;
                break;
            case 'angry':
                rct = reactionEnum.angry;
                break;
            default:
                rct = reactionEnum.like;
        }
        newReaction.reaction = rct;
        newReaction.user = userId;
        newReaction.post = postId;

        const save = await this.postReationsRepository.save(newReaction);
        return { data: 'done . reacted to post' };

    }

    /* add new Post */
    async createNewPost(userId, PostDto: PostDto) {
        const user = await this.userRepository.findOne({ id: userId });
        if (!user) {
            throw new NotFoundException('invalid id');
        }
        const newPost = new Post();
        Object.assign(newPost, PostDto);
        newPost.user = user;
        const create = await this.PostRepository.save(newPost);
        const savePost = await this.PostRepository.findOne({ id: create.id });
        return { data: savePost };

        // const findOne = await this.userRepository.findOne(id, { relations: ['subscribed'] });
        // if (!findOne) {
        //     throw new NotFoundException('invalid id');
        // }
        // const result = await this.categoryRepository.findByIds(categories);
        // findOne.subscribed.push(...result);
        // const subDone = await this.userRepository.save(findOne);
        // return { data: 'subscribe Done' };

    }

    /* update Post */
    // async updatePost(id: number, updatePost): Promise<any> {
    //     const findOne = await this.PostRepository.findOne(id);
    //     if (!findOne) {
    //         throw new NotFoundException('invalid id');
    //     }
    //     if (Object.keys(updatePost).length <= 0) {
    //         throw new BadRequestException('no data provided');
    //     }
    //     await this.PostRepository.update({ id: findOne.id }, updatePost);
    //     const updated = await this.PostRepository.findOne(id);
    //     return { data: updated };
    // }

    /* delete one Post */
    async deletPost(id: number): Promise<any> {
        const findOne = await this.PostRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.PostRepository.delete(id);
        return { data: 'done . Post deleted' };
    }
}

