import { ReportsService } from './report.service';
import { PaginationDto } from '../shared/pagination.filter';
import { ReportDto } from './report.dto';
export declare class ReportsController {
    private reportservice;
    constructor(reportservice: ReportsService);
    getAllreports(paginate: PaginationDto): Promise<any>;
    getOnereports(id: any): Promise<{
        data: import("./report.entity").Report;
    }>;
    createNewUser(report: ReportDto, id: any): Promise<{
        data: string;
    }>;
    deletereports(id: any): Promise<any>;
}
