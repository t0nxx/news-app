import { SourceService } from './source.service';
import { SourceDto } from './source.dto';
import { PaginationDto } from '../shared/pagination.filter';
export declare class SourceController {
    private sourceService;
    constructor(sourceService: SourceService);
    getAllSources(paginate: PaginationDto): Promise<any>;
    getOneSource(id: any): Promise<{
        data: import("./source.entity").Source;
    }>;
    createNewSource(cate: SourceDto, files: any[]): Promise<{
        data: import("./source.entity").Source;
    }>;
    updateSource(id: any, cate: SourceDto, files: any[]): Promise<any>;
    deleteSource(id: any): Promise<any>;
}
