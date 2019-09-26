import { HelpMeService } from './helpMe.service';
import { PaginationDto } from '../shared/pagination.filter';
import { HelpMeDto } from './helpMe.dto';
import { HelpMeUpdateDto } from './helpMe.update.dto';
export declare class HelpMeController {
    private helpMeervice;
    constructor(helpMeervice: HelpMeService);
    getAllhelpMe(paginate: PaginationDto): Promise<any>;
    getOnehelpMe(id: any): Promise<{
        data: import("./helpMe.entity").HelpMe;
    }>;
    createNewUser(cate: HelpMeDto): Promise<{
        data: import("./helpMe.entity").HelpMe;
    }>;
    updatehelpMe(id: any, cate: HelpMeUpdateDto): Promise<any>;
    deletehelpMe(id: any): Promise<any>;
}
