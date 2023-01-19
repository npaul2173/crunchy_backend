import { UploadPaths } from 'controllers/upload/enums';
import UploadService from 'controllers/upload/service';
import { Request } from 'express';
import { CuisinesModel } from 'models/cuisine/model';
import { DiningImagesModel } from 'models/Dining/DiningRestaurants/Image/model';
import { DiningRestaurantModel } from 'models/Dining/DiningRestaurants/model';
import { Multer } from 'multer';
import { DiningRestaurantCreateProps } from './interface';

class DiningRestaurantService {
    public async create(data: DiningRestaurantCreateProps, req: Request) {
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
                const [response, created] =
                    await DiningRestaurantModel.findOrCreate({
                        where: { restaurantName: data.restaurantName },
                        defaults: { ...data, diningImages },
                        include: [DiningImagesModel, CuisinesModel],
                    });
                return { created: created, response };
            } catch (error) {
                throw new Error('❌ Unable to create 🖊️ Dining Restaurant');
            }
        } else
            throw new Error(
                `❌ Problem while Uploading Image Dining Restaurant ${uploadResponse.reason}`
            );
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
}

export default DiningRestaurantService;
