import { UploadPaths } from 'controllers/upload/enums';
import UploadService from 'controllers/upload/service';
import { Request } from 'express';
import { CuisinesModel } from 'models/cuisine/model';
import { DiningImagesModel } from 'models/Dining/DiningRestaurants/Image/model';
import { DiningRestaurantModel } from 'models/Dining/DiningRestaurants/model';
import { Multer } from 'multer';
import { DiningRestaurantCreateProps, PopularDishesData } from './interface';

class DiningRestaurantService {
    public async create(data: DiningRestaurantCreateProps, req: Request) {
        const response = await DiningRestaurantModel.findAll({
            where: { restaurantName: data.restaurantName },
        });

        if (response.length > 0) {
            return {
                status: false,
                message: 'Restaurant Already exists',
                response,
            };
        } else {
            const uploadService = new UploadService();
            req.files?.length;
            var files: any = req.files;
            const uploadFilePromises = files.map((fileData: any) =>
                uploadService.uploadImage(
                    fileData?.path,
                    UploadPaths.DINING_RESTAURANT
                )
            );
            const uploadResponse = await Promise.all(uploadFilePromises).then(
                async (values) => ({ status: true, values, reason: null }),
                (reason) => ({ status: false, reason: reason, values: [] })
            );
            if (uploadResponse.status) {
                try {
                    const diningImages = uploadResponse.values.map((item) => ({
                        photo: item,
                    }));
                    const response = await DiningRestaurantModel.create(
                        { ...data, diningImages },
                        { include: [DiningImagesModel] }
                    );

                    return {
                        status: true,
                        message: 'Restaurant Created',
                        response,
                    };
                } catch (error) {
                    throw new Error('❌ Unable to create 🖊️ Dining Restaurant');
                }
            } else {
                throw new Error(
                    `❌ Problem while Uploading Image Dining Restaurant ${uploadResponse.reason}`
                );
            }
        }
    }

    public findAll() {
        try {
            const nodes = DiningRestaurantModel.findAll({
                include: DiningImagesModel,
            });
            return nodes;
        } catch (error) {
            throw new Error(
                '❌ Some error occurred while retrieving Dining Restaurant'
            );
        }
    }

    public async updateDishes(data: PopularDishesData) {
        try {
            const popularDishesString = data.popularDishes.toString();
            const response = await DiningRestaurantModel.update(
                { popularDishes: popularDishesString },
                {
                    where: {
                        id: data.id,
                    },
                }
            );
        } catch (error) {}
    }
}

export default DiningRestaurantService;
