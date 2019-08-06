import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { CategoryDto } from './category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    getAllCategories(paginate: PaginationDto): Promise<any>;
    getOnecategory(id: number): Promise<{
        data: Category;
    }>;
    createNewcategory(categoryDto: CategoryDto): Promise<{
        data: Category;
    }>;
    updatecategory(id: number, updatecategory: CategoryDto): Promise<any>;
    deletcategory(id: number): Promise<any>;
}
