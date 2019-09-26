import { TermsService } from './terms.service';
import { PaginationDto } from '../shared/pagination.filter';
import { TermsDto } from './terms.dto';
import { TermsUpdateDto } from './terms.update.dto';
export declare class TermsController {
    private termservice;
    constructor(termservice: TermsService);
    getAllterms(paginate: PaginationDto): Promise<any>;
    getOneterms(id: any): Promise<{
        data: import("./terms.entity").Terms;
    }>;
    createNewUser(cate: TermsDto): Promise<{
        data: import("./terms.entity").Terms;
    }>;
    updateterms(id: any, cate: TermsUpdateDto): Promise<any>;
    deleteterms(id: any): Promise<any>;
}
