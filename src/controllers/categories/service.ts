import { CategoryModel } from 'models/category/model';
import { DerivedProductModel, ProductModel } from 'models/product/model';
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
            if (created) {
                return categoryResponse;
            } else {
                return false;
            }
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
}

export default CategoryService;
