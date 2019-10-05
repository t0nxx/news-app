import { AboutUsService } from './aboutUs.service';
import { PaginationDto } from '../shared/pagination.filter';
import { AboutUsDto } from './aboutUs.dto';
import { AboutUsUpdateDto } from './aboutUs.update.dto';
export declare class AboutUsController {
    private aboutUservice;
    constructor(aboutUservice: AboutUsService);
    getAllaboutUs(paginate: PaginationDto): Promise<any>;
    getOneAboutUs(id: any): Promise<{
        data: import("./aboutUs.entity").AboutUs;
    }>;
    createNewUser(cate: AboutUsDto): Promise<{
        data: import("./aboutUs.entity").AboutUs;
    }>;
    updateAboutUs(id: any, cate: AboutUsUpdateDto): Promise<any>;
    deleteAboutUs(id: any): Promise<any>;
    getAllaboutUsDash(paginate: PaginationDto): Promise<any>;
    getOneAboutUsDAsh(id: any): Promise<{
        data: import("./aboutUs.entity").AboutUs;
    }>;
    createNewUserDAsh(cate: AboutUsDto): Promise<{
        data: import("./aboutUs.entity").AboutUs;
    }>;
    updateAboutUsDAsh(id: any, cate: AboutUsUpdateDto): Promise<any>;
    deleteAboutUsDash(id: any): Promise<any>;
}
