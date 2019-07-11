import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
import { PaginationDto } from '../shared/pagination.filter';
import { CategoryUpdateDto } from './category.update.dto';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getAllOrders(paginate: PaginationDto): Promise<any>;
    getOneCategory(id: any): Promise<{
        data: import("./category.entity").Category;
    }>;
    createNewUser(cate: CategoryDto): Promise<{
        data: import("./category.entity").Category;
    }>;
    updateCategory(id: any, cate: CategoryUpdateDto): Promise<any>;
    deleteCategory(id: any): Promise<any>;
}
