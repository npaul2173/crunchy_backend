import { CategoryModel } from 'models/category/model';
import { CategoryCreateProps } from './interface';

class CategoryService {
    public async create(data: CategoryCreateProps) {
        try {
            const categoryResponse = CategoryModel.create(data);
            return categoryResponse;
        } catch (err) {
            throw new Error('❌ Unable to create 🖊️ category');
        }
    }
    public findAll() {
        try {
            const nodes = CategoryModel.findAll();
            return nodes;
        } catch (error) {
            throw new Error(
                '❌ Some error occurred while retrieving 🖊️ categories'
            );
        }
    }
}

export default CategoryService;
