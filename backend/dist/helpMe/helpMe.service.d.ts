import { HelpMe } from './helpMe.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { HelpMeDto } from './helpMe.dto';
import { HelpMeUpdateDto } from './helpMe.update.dto';
export declare class HelpMeService {
    private readonly helpMeRepository;
    constructor(helpMeRepository: Repository<HelpMe>);
    getAllhelpMes(paginate: PaginationDto): Promise<any>;
    getOnehelpMe(id: number): Promise<{
        data: HelpMe;
    }>;
    createNewhelpMe(helpMeDto: HelpMeDto): Promise<{
        data: HelpMe;
    }>;
    updatehelpMe(id: number, updatehelpMe: HelpMeUpdateDto): Promise<any>;
    delethelpMe(id: number): Promise<any>;
}
