import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
import { PaginationDto } from '../shared/pagination.filter';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getAllOrders(paginate: PaginationDto): Promise<any>;
    getOneCategory(id: any): Promise<{
        data: import("./category.entity").Category;
    }>;
    createNewUser(cate: CategoryDto, files: any[]): Promise<{
        data: import("./category.entity").Category;
    }>;
    updateCategory(id: any, cate: CategoryDto, files: any[]): Promise<any>;
    deleteCategory(id: any): Promise<any>;
}
