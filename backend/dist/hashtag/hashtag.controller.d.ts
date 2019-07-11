import { HashtagService } from './hashtag.service';
import { PaginationDto } from '../shared/pagination.filter';
import { HashTagDto } from './hashtag.dto';
import { HashTagUpdateDto } from './hashtag.update.dto';
export declare class HashtagController {
    private hashTagService;
    constructor(hashTagService: HashtagService);
    getAllHashTags(paginate: PaginationDto): Promise<any>;
    getOnehashTag(id: any): Promise<{
        data: import("./hashtage.entity").HashTag;
    }>;
    createNewUser(cate: HashTagDto): Promise<{
        data: import("./hashtage.entity").HashTag;
    }>;
    updatehashTag(id: any, cate: HashTagUpdateDto): Promise<any>;
    deletehashTag(id: any): Promise<any>;
}
