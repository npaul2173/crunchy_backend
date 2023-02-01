import { CategoryModel } from 'models/mart/category/model';
import { DerivedProductModel, ProductModel } from 'models/mart/product/model';
import { CategoryCreateProps } from './interface';

class CategoryService {
    public async create(data: CategoryCreateProps) {
        try {
            const [categoryResponse, created] =
                await CategoryModel.findOrCreate({
                    where: {
                        categoryName: data.categoryName,
                    },
                    defaults: {
                        ...data,
                    },
                });
            return { categoryResponse, created };
        } catch (err) {
            throw new Error('❌ Unable to create 🖊️ category');
        }
    }
    public findAll() {
        try {
            const nodes = CategoryModel.findAll({
                include: [
                    { model: ProductModel, include: [DerivedProductModel] },
                ],
            });
            return nodes;
        } catch (error) {
            throw new Error(
                '❌ Some error occurred while retrieving 🖊️ categories'
            );
        }
    }
    public async createMultiple(data: CategoryCreateProps[]) {
        try {
            const categoryResponse = CategoryModel.bulkCreate(data);
            return categoryResponse;
        } catch (error) {
            throw new Error('❌ Unable to create 🖊️ category');
        }
    }
}

export default CategoryService;
