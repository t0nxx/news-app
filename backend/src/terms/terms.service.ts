import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Terms } from './terms.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { TermsDto } from './terms.dto';
import { TermsUpdateDto } from './terms.update.dto';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';

@Injectable()
export class TermsService {
    constructor(
        @InjectRepository(Terms)
        private readonly termsRepository: Repository<Terms>,
    ) { }

    /* get all termss */
    async getAlltermss(paginate: PaginationDto): Promise<any> {
        const q = this.termsRepository.createQueryBuilder();
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['body']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data: data[0] };
    }

    /* get all termss dashboard */
    async getAlltermsDashboard(paginate: PaginationDto): Promise<any> {
        const q = this.termsRepository.createQueryBuilder();
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['body']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }

    /* get one terms */
    async getOneterms(id: number) {
        const findOne = await this.termsRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return { data: findOne };

    }

    /* add new terms */
    async createNewterms(termsDto: TermsDto) {

        const newterms = new Terms();
        Object.assign(newterms, termsDto);
        const saveterms = await this.termsRepository.save(newterms);
        return { data: saveterms };

    }

    /* update terms */
    async updateterms(id: number, updateterms: TermsUpdateDto): Promise<any> {
        const findOne = await this.termsRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        if (Object.keys(updateterms).length <= 0) {
            throw new BadRequestException('no data provided');
        }
        await this.termsRepository.update({ id: findOne.id }, updateterms);
        const updated = await this.termsRepository.findOne(id);
        return { data: updated };
    }

    /* delete one terms */
    async deletterms(id: number): Promise<any> {
        const findOne = await this.termsRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.termsRepository.delete(id);
        return { data: findOne };
    }
}
