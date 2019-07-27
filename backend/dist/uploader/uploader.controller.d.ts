import { UploaderService } from './uploader.service';
import { Uploader } from './uploader.entity';
import { PaginationDto } from '../shared/pagination.filter';
export declare class UploaderController {
    private uploadService;
    constructor(uploadService: UploaderService);
    getAllPosts(paginate: PaginationDto): Promise<any>;
    getOneCategory(id: any): Promise<{
        data: Uploader;
    }>;
    createNewPost(files: any[]): Promise<{
        data: any;
    }>;
    deleteCategory(id: any): Promise<any>;
}
