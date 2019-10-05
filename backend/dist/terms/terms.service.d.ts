import { Terms } from './terms.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { TermsDto } from './terms.dto';
import { TermsUpdateDto } from './terms.update.dto';
export declare class TermsService {
    private readonly termsRepository;
    constructor(termsRepository: Repository<Terms>);
    getAlltermss(paginate: PaginationDto): Promise<any>;
    getAlltermsDashboard(paginate: PaginationDto): Promise<any>;
    getOneterms(id: number): Promise<{
        data: Terms;
    }>;
    createNewterms(termsDto: TermsDto): Promise<{
        data: Terms;
    }>;
    updateterms(id: number, updateterms: TermsUpdateDto): Promise<any>;
    deletterms(id: number): Promise<any>;
}
