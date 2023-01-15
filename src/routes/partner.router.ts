import { PartnerController } from 'controllers/partner';
import { createPartnerValidation } from 'controllers/partner/validation';
import { Router } from 'express';
import { validate } from 'utils/library/validate';

const getRoute = (uri?: string) => `/partners${uri}`;
const router = Router();
const partnerController = new PartnerController();

router.get(getRoute('/'), partnerController.getAllPartners);
router.post(
    getRoute('/create'),
    createPartnerValidation,
    validate,
    partnerController.createPartner
);

export { router as PartnerRoutes };
