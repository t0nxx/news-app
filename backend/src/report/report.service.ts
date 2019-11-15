import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { ReportDto } from './report.dto';
import { ReportUpdateDto } from './report.update.dto';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private readonly ReportsRepository: Repository<Report>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    /* get all Reports */
    async getAllReports(paginate: PaginationDto): Promise<any> {
        const q = this.ReportsRepository
            .createQueryBuilder('report')
            .innerJoin('report.comment', 'comment')
            .innerJoin('report.user', 'user')
            .addSelect(['comment.id', 'user.id']);
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['body'], 'report');
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }

    /* get one Reports */
    async getOneReports(id: number) {
        const findOne = await this.ReportsRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return { data: findOne };

    }

    /* add new Reports */
    async createNewReports(userId, reportsDto: ReportDto) {

        const comment = await this.commentRepository.findOne({ id: reportsDto.commentId });
        if (!comment) { throw new NotFoundException('no comment with given id'); }
        const user = await this.userRepository.findOne({ id: userId });
        if (!user) { throw new NotFoundException('invalid user id'); }

        const newReport = new Report();
        newReport.body = reportsDto.body;
        newReport.comment = comment;
        newReport.user = user;

        const saveReport = await this.ReportsRepository.save(newReport);
        return { data: 'Done , Report has been sent' };

    }

    /* update Reports */
    // async updateReports(id: number, updateReports: ReportsUpdateDto): Promise<any> {
    //     const findOne = await this.ReportsRepository.findOne(id);
    //     if (!findOne) {
    //         throw new NotFoundException('invalid id');
    //     }
    //     if (Object.keys(updateReports).length <= 0) {
    //         throw new BadRequestException('no data provided');
    //     }
    //     await this.ReportsRepository.update({ id: findOne.id }, updateReports);
    //     const updated = await this.ReportsRepository.findOne(id);
    //     return { data: updated };
    // }

    /* delete one Reports */
    async deletReports(id: number): Promise<any> {
        const findOne = await this.ReportsRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.ReportsRepository.delete(id);
        return { data: findOne };
    }
}
