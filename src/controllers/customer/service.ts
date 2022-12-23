import { CustomerModel } from 'models/customer/model';
import { CustomerCreateProps } from './interface';

class CustomerService {
    public async create(data: CustomerCreateProps) {
        try {
            const customerResponse = CustomerModel.create(data);
            return customerResponse;
        } catch (error) {
            throw new Error('❌ Unable to create 🖊️ user ');
        }
    }

    public findAll() {
        try {
            const nodes = CustomerModel.findAll();
            return nodes;
        } catch (error) {
            throw new Error('❌ Some error occurred while retrieving 🖊️ post ');
        }
        // Foods.findAll({ where })
        // .then((data) => {
        //     res.send(data);
        // })
        // .catch((err) => {
        //     res.status(500).send({
        //         message:
        //             err.message ||
        //             'Some error occurred while retrieving tutorials.',
        //     });
        // });
    }
}

export default CustomerService;
