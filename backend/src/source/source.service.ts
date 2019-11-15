import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Source } from './source.entity';
import { Repository, Like } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { SourceDto } from './source.dto';
import { SourceUpdateDto } from './source.update.dto';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';

@Injectable()
export class SourceService {
    constructor(
        @InjectRepository(Source)
        private readonly SourceRepository: Repository<Source>,
    ) { }

    /* get all Sources */
    async getAllSources(paginate: PaginationDto): Promise<any> {
        const q = this.SourceRepository.createQueryBuilder();
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['name']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }

    /* get one Source */
    async getOneSource(id: number) {
        const findOne = await this.SourceRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return { data: findOne };

    }

    /* add new Source */
    async createNewSource(sourceDto: SourceDto) {

        const newSource = new Source();
        Object.assign(newSource, sourceDto);
        const saveSource = await this.SourceRepository.save(newSource);
        return { data: saveSource };

    }

    /* update Source */
    async updateSource(id: number, updateSource: SourceDto): Promise<any> {
        const findOne = await this.SourceRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        if (Object.keys(updateSource).length <= 0) {
            throw new BadRequestException('no data provided');
        }
        findOne.name = updateSource.name;
        findOne.link = updateSource.link;
        if (updateSource.backgroundImage) {
            findOne.backgroundImage = updateSource.backgroundImage;
        }
        await this.SourceRepository.save(findOne);
        const updated = await this.SourceRepository.findOne(id);
        return { data: updated };
    }

    /* delete one Source */
    async deletSource(id: number): Promise<any> {
        const findOne = await this.SourceRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.SourceRepository.delete(id);
        return { data: findOne };
    }
}


