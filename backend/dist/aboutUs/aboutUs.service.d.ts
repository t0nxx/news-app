import { AboutUs } from './aboutUs.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { AboutUsDto } from './aboutUs.dto';
import { AboutUsUpdateDto } from './aboutUs.update.dto';
export declare class AboutUsService {
    private readonly AboutUsRepository;
    constructor(AboutUsRepository: Repository<AboutUs>);
    getAllAboutUss(paginate: PaginationDto): Promise<any>;
    getOneAboutUs(id: number): Promise<{
        data: AboutUs;
    }>;
    createNewAboutUs(AboutUsDto: AboutUsDto): Promise<{
        data: AboutUs;
    }>;
    updateAboutUs(id: number, updateAboutUs: AboutUsUpdateDto): Promise<any>;
    deletAboutUs(id: number): Promise<any>;
}
