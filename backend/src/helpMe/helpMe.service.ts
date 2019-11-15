import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelpMe } from './helpMe.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { HelpMeDto } from './helpMe.dto';
import { HelpMeUpdateDto } from './helpMe.update.dto';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';

@Injectable()
export class HelpMeService {
    constructor(
        @InjectRepository(HelpMe)
        private readonly helpMeRepository: Repository<HelpMe>,
    ) { }

    /* get all helpMes */
    async getAllhelpMes(paginate: PaginationDto): Promise<any> {
        const q = this.helpMeRepository.createQueryBuilder();
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['name']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }

    /* get one helpMe */
    async getOnehelpMe(id: number) {
        const findOne = await this.helpMeRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return { data: findOne };

    }

    /* add new helpMe */
    async createNewhelpMe(helpMeDto: HelpMeDto) {

        const newhelpMe = new HelpMe();
        Object.assign(newhelpMe, helpMeDto);
        const savehelpMe = await this.helpMeRepository.save(newhelpMe);
        return { data: savehelpMe };

    }

    /* update helpMe */
    async updatehelpMe(id: number, updatehelpMe: HelpMeUpdateDto): Promise<any> {
        const findOne = await this.helpMeRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        if (Object.keys(updatehelpMe).length <= 0) {
            throw new BadRequestException('no data provided');
        }
        await this.helpMeRepository.update({ id: findOne.id }, updatehelpMe);
        const updated = await this.helpMeRepository.findOne(id);
        return { data: updated };
    }

    /* delete one helpMe */
    async delethelpMe(id: number): Promise<any> {
        const findOne = await this.helpMeRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.helpMeRepository.delete(id);
        return { data: findOne };
    }
}
