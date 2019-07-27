import { Repository } from 'typeorm';
import { Uploader } from './uploader.entity';
export declare class UploaderService {
    private readonly uploaderRepository;
    constructor(uploaderRepository: Repository<Uploader>);
    getAllUploads(paginate: any): Promise<any>;
    getOneUpload(id: number): Promise<{
        data: Uploader;
    }>;
    createNewUpload(upload: any): Promise<{
        data: any;
    }>;
    deletUpload(id: number): Promise<any>;
}
