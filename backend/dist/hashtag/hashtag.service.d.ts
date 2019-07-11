import { HashTag } from './hashtage.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { HashTagDto } from './hashtag.dto';
import { HashTagUpdateDto } from './hashtag.update.dto';
export declare class HashtagService {
    private readonly hashTagRepository;
    constructor(hashTagRepository: Repository<HashTag>);
    getAllHashtags(paginate: PaginationDto): Promise<any>;
    getOnehashTag(id: number): Promise<{
        data: HashTag;
    }>;
    createNewhashTag(hashTagDto: HashTagDto): Promise<{
        data: HashTag;
    }>;
    updatehashTag(id: number, updatehashTag: HashTagUpdateDto): Promise<any>;
    delethashTag(id: number): Promise<any>;
}
