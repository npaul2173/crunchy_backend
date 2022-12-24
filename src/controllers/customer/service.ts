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
            throw new Error(
                '❌ Some error occurred while retrieving 🖊️ customers '
            );
        }
    }
}

export default CustomerService;
