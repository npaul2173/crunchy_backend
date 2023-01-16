import { CategoryModel } from 'models/category/model';
import { DerivedProductModel, ProductModel } from 'models/product/model';
import Logging from 'utils/library/logging';
import { ProductCreateProps } from './interface';

class ProductService {
    public async create(data: ProductCreateProps) {
        try {
            const category = await CategoryModel.findOne({
                where: { id: data.categoryId },
            });
            if (category) {
                const [product, created] = await ProductModel.findOrCreate({
                    where: {
                        productName: data.productName,
                    },
                    defaults: {
                        ...data,
                    },
                });
                if (created) {
                    return product;
                } else if (
                    product.dataValues.price !== data.price &&
                    product.dataValues.price !== data.quantity
                ) {
                    const [derivedProductResponse, createdDerivedProduct] =
                        await DerivedProductModel.findOrCreate({
                            where: {
                                price: data.price,
                                quantity: data.quantity,
                            },
                            defaults: {
                                ...data,
                                productId: product.dataValues.id,
                            },
                        });
                    if (createdDerivedProduct) {
                        return derivedProductResponse;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return { categoryExist: false };
            }
        } catch (error) {
            throw new Error('❌ Unable to create 🖊️ product');
        }
    }
    public findAll() {
        try {
            const nodes = ProductModel.findAll({
                include: [DerivedProductModel],
            });
            return nodes;
        } catch (error) {
            throw new Error(
                '❌ Some error occurred while retrieving 🖊️ products'
            );
        }
    }
}

export default ProductService;
