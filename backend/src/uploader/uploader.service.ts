import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Uploader } from './uploader.entity';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';

@Injectable()
export class UploaderService {
    constructor(
        @InjectRepository(Uploader)
        private readonly uploaderRepository: Repository<Uploader>,
    ) { }
    async getAllUploads(paginate: any): Promise<any> {
        const q = this.uploaderRepository.createQueryBuilder('uploader');
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['url']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };

    }

    async getOneUpload(id: number) {
        const findOne = await this.uploaderRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return { data: findOne };

    }

    async createNewUpload(upload) {
        const save = await this.uploaderRepository.save(upload);
        return { data: save }
    }

    async deletUpload(id: number): Promise<any> {
        const findOne = await this.uploaderRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.uploaderRepository.delete(id);
        return { data: findOne };
    }
}
