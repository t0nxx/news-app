import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutUs } from './aboutUs.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { AboutUsDto } from './aboutUs.dto';
import { AboutUsUpdateDto } from './aboutUs.update.dto';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';

@Injectable()
export class AboutUsService {
    constructor(
        @InjectRepository(AboutUs)
        private readonly AboutUsRepository: Repository<AboutUs>,
    ) { }

    /* get all AboutUss */
    async getAllAboutUss(paginate: PaginationDto): Promise<any> {
        const q = this.AboutUsRepository.createQueryBuilder();
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['body']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data: data[0] };
    }

    /* get all AboutUss */
    async getAllAboutUsDashboard(paginate: PaginationDto): Promise<any> {
        const q = this.AboutUsRepository.createQueryBuilder();
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['body']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }

    /* get one AboutUs */
    async getOneAboutUs(id: number) {
        const findOne = await this.AboutUsRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return { data: findOne };

    }

    /* add new AboutUs */
    async createNewAboutUs(AboutUsDto: AboutUsDto) {

        const newAboutUs = new AboutUs();
        Object.assign(newAboutUs, AboutUsDto);
        const saveAboutUs = await this.AboutUsRepository.save(newAboutUs);
        return { data: saveAboutUs };

    }

    /* update AboutUs */
    async updateAboutUs(id: number, updateAboutUs: AboutUsUpdateDto): Promise<any> {
        const findOne = await this.AboutUsRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        if (Object.keys(updateAboutUs).length <= 0) {
            throw new BadRequestException('no data provided');
        }
        await this.AboutUsRepository.update({ id: findOne.id }, updateAboutUs);
        const updated = await this.AboutUsRepository.findOne(id);
        return { data: updated };
    }

    /* delete one AboutUs */
    async deletAboutUs(id: number): Promise<any> {
        const findOne = await this.AboutUsRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.AboutUsRepository.delete(id);
        return { data: findOne };
    }
}
