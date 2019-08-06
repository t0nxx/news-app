import { Source } from './source.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { SourceDto } from './source.dto';
export declare class SourceService {
    private readonly SourceRepository;
    constructor(SourceRepository: Repository<Source>);
    getAllSources(paginate: PaginationDto): Promise<any>;
    getOneSource(id: number): Promise<{
        data: Source;
    }>;
    createNewSource(sourceDto: SourceDto): Promise<{
        data: Source;
    }>;
    updateSource(id: number, updateSource: SourceDto): Promise<any>;
    deletSource(id: number): Promise<any>;
}
