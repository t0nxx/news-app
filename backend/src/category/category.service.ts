import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/shared/pagination.filter';
import { CategoryDto } from './category.dto';
import { CategoryUpdateDto } from './category.update.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    /* get all Categories */
    async getAllCategories(paginate: PaginationDto): Promise<any> {
        if (!paginate.page) { paginate.page = 1; }
        if (!paginate.limit) { paginate.limit = 10; }
        const [data, count] = await this.categoryRepository.findAndCount({
            take: paginate.limit,
            skip: paginate.page * (paginate.page - 1),
        });
        return { data, count };
    }

    /* get one category */
    async getOnecategory(id: number) {
        const findOne = await this.categoryRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return { data: findOne };

    }

    /* add new category */
    async createNewcategory(categoryDto: CategoryDto) {

        const newcategory = new Category();
        Object.assign(newcategory, categoryDto);
        const savecategory = await this.categoryRepository.save(newcategory);
        return { data: savecategory };

    }

    /* update category */
    async updatecategory(id: number, updatecategory: CategoryUpdateDto): Promise<any> {
        const findOne = await this.categoryRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        if (Object.keys(updatecategory).length <= 0) {
            throw new BadRequestException('no data provided');
        }
        await this.categoryRepository.update({ id: findOne.id }, updatecategory);
        const updated = await this.categoryRepository.findOne(id);
        return { data: updated };
    }

    /* delete one category */
    async deletcategory(id: number): Promise<any> {
        const findOne = await this.categoryRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.categoryRepository.delete(id);
        return 'done . category deleted';
    }
}


