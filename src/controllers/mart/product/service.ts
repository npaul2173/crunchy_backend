import { CategoryModel } from 'models/mart/category/model';
import { GetProductProps } from 'models/mart/product/interface';
import {
    DerivedProductModel,
    ProductImageModel,
    ProductModel,
} from 'models/mart/product/model';
import { Op } from 'sequelize';
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
                    defaults: { ...data, images: undefined },
                });
                Logging.info(product);
                Logging.info(created);

                if (created) {
                    const imageResponse = await ProductImageModel.create({
                        images: data.images,
                        productId: product.dataValues.id,
                    });

                    Logging.info(imageResponse);
                    product;
                    return {
                        ...product.dataValues,
                        images: imageResponse.dataValues.images,
                    };
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
    public findAll(data: GetProductProps) {
        try {
            Logging.info(data);
            const nodes = ProductModel.findAll({
                where: {
                    productName: {
                        [Op.iLike]: `%${data.productName.toLowerCase()}%`,
                    },
                },
                include: [
                    { model: DerivedProductModel },
                    { model: ProductImageModel, attributes: ['images'] },
                ],
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
