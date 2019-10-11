import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { ReportDto } from './report.dto';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';
export declare class ReportsService {
    private readonly ReportsRepository;
    private readonly commentRepository;
    private readonly userRepository;
    constructor(ReportsRepository: Repository<Report>, commentRepository: Repository<Comment>, userRepository: Repository<User>);
    getAllReports(paginate: PaginationDto): Promise<any>;
    getOneReports(id: number): Promise<{
        data: Report;
    }>;
    createNewReports(userId: any, reportsDto: ReportDto): Promise<{
        data: string;
    }>;
    deletReports(id: number): Promise<any>;
}
