import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashTag } from './hashtage.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { HashTagDto } from './hashtag.dto';
import { HashTagUpdateDto } from './hashtag.update.dto';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';

@Injectable()
export class HashtagService {
    constructor(
        @InjectRepository(HashTag)
        private readonly hashTagRepository: Repository<HashTag>,
    ) { }

    /* get all Hashtags */
    async getAllHashtags(paginate: PaginationDto): Promise<any> {
        const q = this.hashTagRepository.createQueryBuilder();
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['name']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }

    /* get one hashTag */
    async getOnehashTag(id: number) {
        const findOne = await this.hashTagRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return { data: findOne };

    }

    /* add new hashTag */
    async createNewhashTag(hashTagDto: HashTagDto) {

        const newhashTag = new HashTag();
        Object.assign(newhashTag, hashTagDto);
        const savehashTag = await this.hashTagRepository.save(newhashTag);
        return { data: savehashTag };

    }

    /* update hashTag */
    async updatehashTag(id: number, updatehashTag: HashTagUpdateDto): Promise<any> {
        const findOne = await this.hashTagRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        if (Object.keys(updatehashTag).length <= 0) {
            throw new BadRequestException('no data provided');
        }
        await this.hashTagRepository.update({ id: findOne.id }, updatehashTag);
        const updated = await this.hashTagRepository.findOne(id);
        return { data: updated };
    }

    /* delete one hashTag */
    async delethashTag(id: number): Promise<any> {
        const findOne = await this.hashTagRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.hashTagRepository.delete(id);
        return { data: findOne };
    }
}
