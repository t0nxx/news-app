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
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';
import { Source } from '../source/source.entity';
import { Comment } from '../comment/comment.entity';
import { remove, some, chunk, flatten } from 'lodash';
import { sendNotification } from '../notification/fcm';
@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly PostRepository: Repository<Post>,
        @InjectRepository(HashTag)
        private readonly tagRepository: Repository<HashTag>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Source)
        private readonly sourceRepository: Repository<Source>,
        @InjectRepository(PostReactions)
        private readonly postReationsRepository: Repository<PostReactions>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) { }

    /* get all Posts */
    async getAllPosts(paginate: any): Promise<any> {
        const q = this.PostRepository.createQueryBuilder('post');
        q.leftJoinAndSelect('post.categories', 'categories');
        q.leftJoinAndSelect('post.tags', 'tags');
        q.leftJoinAndSelect('post.source', 'source');
        q.innerJoin('post.user', 'user');
        q.addSelect(['user.id', 'user.fullName', 'user.profileImage']);
        q.orderBy('post.id', 'DESC');
        // q.innerJoin('post_reactions', 'react', 'react.post = post.id');
        // q.addSelect(['react.reaction'])
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['title', 'body'], 'post');

        /* http ****** ?tag= */
        if (paginate.tag) {
            q.orWhere(`tags.name like '%${paginate.tag}%'`);
        }
        /* http ****** ?kind= */
        if (paginate.kind) {
            // q.where(`categories.name like '%${paginate.category}%'`);
            if (paginate.kind === 'mostComment') {
                q.orderBy('post.commentsCount', 'DESC');
            }
            if (paginate.kind === 'mostRead') {
                q.orderBy('post.readCount', 'DESC');
            }
        }
        // /* http ****** ?userID= */
        // if (paginate.userID) {
        //     q.where(`user.id  = ${paginate.userID}`);
        //     // q.getRawAndEntities
        // }

        const [data, count] = await qAfterFormat.getManyAndCount();
        // isBookmarked
        if (paginate.userId) {
            // console.log(paginate.userId);
            // let userId = parseInt(paginate.userId);
            const findOne = await this.userRepository.findOne({ id: paginate.userId }, { relations: ['bookmarks'] });
            //console.log(findOne);
            data.forEach(element => {
                let isExist = some(findOne.bookmarks, { id: element.id });
                if (isExist) {
                    element.isBookmarked = true;
                } else {
                    element.isBookmarked = false;
                }
            });
        } else {
            //  console.log('nooooooo');
            data.forEach(element => {
                element.isBookmarked = false;
            });
        }
        return { data, count };
    }

    /* get my Subscription */
    async getPostsOfMySubscription(userId: number, paginate: any): Promise<any> {
        const findOne = await this.userRepository.findOne({ id: userId }, { relations: ['subscribed', 'bookmarks'] });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        // destruct categories id in one array
        const ids = findOne.subscribed.map(cate => cate.id);

        const q = this.PostRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.categories', 'categories')
            .leftJoinAndSelect('post.tags', 'tags')
            .leftJoinAndSelect('post.source', 'source')
            .innerJoin('post.user', 'user')
            .addSelect(['user.id', 'user.fullName', 'user.profileImage'])
            // .where(`categories.id IN (${ids})`)
            .orderBy('post_id', 'DESC');
        // solve 500 internal on app 
        if (ids.length > 0) {
            q.where(`categories.id IN (${ids})`);
        }
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['title', 'body'], 'post');
        const [data, count] = await qAfterFormat.getManyAndCount();
        // retrive is isBookmarked in all posts
        data.forEach(element => {
            let isExist = some(findOne.bookmarks, { id: element.id });
            if (isExist) {
                element.isBookmarked = true;
            } else {
                element.isBookmarked = false;
            }
        });
        return { data, count };
    }

    /* get one Post */
    async getOnePost(postId: number, paginate?) {
        // const findOne = await this.PostRepository.findOne({ id: postId }, { relations: ['source'] });
        const q = this.PostRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.categories', 'categories')
            .leftJoinAndSelect('post.tags', 'tags')
            .leftJoinAndSelect('post.source', 'source')
            .innerJoin('post.user', 'user')
            .addSelect(['user.id', 'user.fullName', 'user.profileImage'])
            .where(`post.id =  (${postId})`);
        const findOne = await q.getOne();
        // Object.assign(data,findOne);
        let data = {};
        Object.assign(data, findOne);

        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        findOne.readCount = findOne.readCount + 1;
        const reactions = await this.postReationsRepository.createQueryBuilder()
            .select('reaction , Count(*) as count')
            .where(`postId = ${postId}`)
            .groupBy('reaction')
            .getRawMany();

        await this.PostRepository.save(findOne);

        if (paginate.userId) {

            const user = await this.userRepository.findOne({ id: paginate.userId }, { relations: ['bookmarks'] });
            const isReacted = await this.postReationsRepository.findOne({ user: paginate.userId, post: postId });
            let isExist = some(user.bookmarks, { id: findOne.id });
            if (isExist) {
                // retrive jis reaction to post
                if (isReacted) {
                    data['userReaction'] = isReacted.reaction;
                } else {
                    data['userReaction'] = 'noReaction';
                }
                ////// end retrive reaction to post
                data['isBookmarked'] = true;
            } else {
                data['isBookmarked'] = false;
                data['userReaction'] = 'noReaction';
            }
        } else {
            //retrive isbookmarked
            data['isBookmarked'] = false;
            data['userReaction'] = 'noReaction';
        }
        // retrive 3 comments with post 
        const comments = await this.commentRepository.find(
            { where: { post: findOne }, order: { id: 'DESC' }, take: 3 });


        return { data: { ...data, reactions, comments } };

    }

    /* get one post for dashboard 
    the main idea is that the dashboard accept array of ids of refrence fields*/
    async getOnePostDashBoard(postId: number) {
        const findOne = await this.PostRepository.findOne({ id: postId }, { relations: ['source'] });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const tagArrayIds = findOne.tags.map(e => e.id);
        const cateArrayIds = findOne.categories.map(e => e.id);

        const { id, title, body, backgroundImage, comments, reactionsCount, source, createdAt, updatedAt } = findOne;

        const reactions = await this.postReationsRepository.createQueryBuilder()
            .select('reaction , Count(*) as count')
            .where(`postId = ${postId}`)
            .groupBy('reaction')
            .getRawMany();
        let like = '0', love = '0', wow = '0', haha = '0', angry = '0', sad = '0';
        reactions.forEach(react => {
            if (react.reaction == 'like') {
                like = react.count;
            } else if (react.reaction == 'love') {
                love = react.count;
            } else if (react.reaction == 'wow') {
                wow = react.count;
            } else if (react.reaction == 'haha') {
                haha = react.count;
            } else if (react.reaction == 'sad') {
                sad = react.count;
            } else if (react.reaction == 'angry') {
                angry = react.count;
            }
        })

        return {
            data: {
                id, title, body, backgroundImage, comments,
                reactionsCount, source, createdAt, updatedAt, categories: cateArrayIds,
                tags: tagArrayIds,
                // each react count 
                like, love, haha, wow, sad, angry,
            },
        };

    }


    /* react to post */
    async reactToPost(postId: number, userId, reaction) {
        const findOne = await this.PostRepository.findOne({ id: postId });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const newReaction = new PostReactions();
        const isReacted = await this.postReationsRepository.findOne({ user: userId, post: postId });
        let paginate = {};
        paginate['userId'] = userId;

        if (isReacted) {
            if (isReacted.reaction === reaction) {
                await this.PostRepository.decrement({ id: postId }, 'reactionsCount', 1);
                await this.postReationsRepository.remove(isReacted);
                return this.getOnePost(postId, paginate);
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
        await this.PostRepository.increment({ id: postId }, 'reactionsCount', 1);


        return this.getOnePost(postId, paginate);

    }

    /* add new Post */
    async createNewPost(userId, PostDto: PostDto) {
        const user = await this.userRepository.findOne({ id: userId });
        if (!user) {
            throw new NotFoundException('invalid id');
        }
        const newPost = new Post();
        Object.assign(newPost, PostDto);

        const [tags, categories, source] = await Promise.all([
            this.tagRepository.findByIds(newPost.tags),
            this.categoryRepository.findByIds(newPost.categories),
            this.sourceRepository.findOne({ id: PostDto.source }),
        ]);
        newPost.user = user;
        newPost.tags = []; newPost.categories = [];

        newPost.tags.push(...tags);
        newPost.categories.push(...categories);
        newPost.source = source;

        const create = await this.PostRepository.save(newPost);
        // notification in post

        const users = await this.userRepository.createQueryBuilder('user')
            .innerJoinAndSelect('user.subscribed', 'categories')
            .where(`categories.id IN (${newPost.categories})`)
            .select(['user.fcmTokens'])
            .where('user.receiveNotification = true')
            .getMany();

        const tokens = users.map(e => e.fcmTokens);
        const flatArr = flatten(tokens);
        // max of fcm tokens is 100 per req
        const splited = chunk(flatArr, 99);

        splited.forEach(arr => {
            // remove empty from the array
            arr = arr.filter(e => e.length)
            const message = {
                notification: {
                    title: 'New Post',
                    body: create.title,
                },
                android: {
                    priority: 'high',
                    notification: {
                        sound: 'default',
                    }
                },
                tokens: arr,
            };
            sendNotification(message);
        });

        const savePost = await this.PostRepository.findOne({ id: create.id });
        return { data: savePost };

    }

    /* update Post */
    async updatePost(id: number, updatePost: any): Promise<any> {
        const findOne = await this.PostRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        if (Object.keys(updatePost).length <= 0) {
            throw new BadRequestException('no data provided');
        }
        const [tags, categories, source] = await Promise.all([
            this.tagRepository.findByIds(updatePost.tags),
            this.categoryRepository.findByIds(updatePost.categories),
            this.sourceRepository.findOne({ id: updatePost.source }),
        ]);

        findOne.title = updatePost.title;
        findOne.body = updatePost.body;
        findOne.backgroundImage = updatePost.backgroundImage;
        findOne.tags = []; findOne.categories = [];
        findOne.tags.push(...tags);
        findOne.categories.push(...categories);
        findOne.source = source;

        await this.PostRepository.save(findOne);
        const updated = await this.PostRepository.findOne(id);
        return { data: updated };
    }

    /* delete one Post */
    async deletPost(id: number): Promise<any> {
        const findOne = await this.PostRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.PostRepository.delete(id);
        return { data: findOne };
    }

    /* bookmark one Post */
    async bookmarkPost(userId, postId): Promise<any> {
        const findPost = await this.PostRepository.findOne({ id: postId });
        if (!findPost) {
            throw new NotFoundException('invalid id');
        }
        const user = await this.userRepository.findOne({ id: userId }, { relations: ['bookmarks'] });
        if (!user) {
            throw new NotFoundException('invalid id');
        }

        user.bookmarks = [...user.bookmarks, findPost];
        await this.userRepository.save(user);

        return { data: 'done . post bookmarked' };
    }

    /* unbookmark one Post */
    async unBookmarkPost(userId, postId): Promise<any> {
        const findPost = await this.PostRepository.findOne({ id: postId });
        if (!findPost) {
            throw new NotFoundException('invalid id');
        }
        const user = await this.userRepository.findOne({ id: userId }, { relations: ['bookmarks'] });
        if (!user) {
            throw new NotFoundException('invalid id');
        }

        user.bookmarks = user.bookmarks.filter((p) => p.id !== postId);
        await this.userRepository.save(user);

        return { data: 'done . post unbookmarked' };
    }

    /* statistics */
    async getStatistics() {
        const [comments, users, posts, reactions, tags, categories, mostLiked, mostLoved, mostAngry, mostCommented] = await Promise.all([
            /* total counts */
            this.commentRepository.count(),
            this.userRepository.count(),
            this.PostRepository.count(),
            this.postReationsRepository.count(),
            this.tagRepository.count(),
            this.categoryRepository.count(),
            /* most loved , liked ... */
            this.postReationsRepository.createQueryBuilder()
                .select('postId , Count(*) as count')
                .where(`reaction like 'like'`)
                .groupBy('postId')
                .orderBy('count', 'DESC')
                .getRawOne(),
            this.postReationsRepository.createQueryBuilder()
                .select('postId , Count(*) as count')
                .where(`reaction like 'love'`)
                .groupBy('postId')
                .orderBy('count', 'DESC')
                .getRawOne(),
            this.postReationsRepository.createQueryBuilder()
                .select('postId , Count(*) as count')
                .where(`reaction like 'angry'`)
                .groupBy('postId')
                .orderBy('count', 'DESC')
                .getRawOne(),
            /* most commented post */
            this.commentRepository.createQueryBuilder()
                .select('postId , Count(*) as count')
                .groupBy('postId')
                .orderBy('count', 'DESC')
                .getRawOne(),
        ]);
        return {
            commentsCount: comments,
            usersCount: users,
            postsCount: posts,
            reactionsCount: reactions,
            tagsCount: tags,
            categoriesCount: categories,
            mostLiked,
            mostLoved,
            mostAngry,
            mostCommented,
        };

    }
}

