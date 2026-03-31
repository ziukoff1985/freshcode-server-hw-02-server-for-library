const db = require('../../db');

class CustomersController {
    async getAllCustomers(req, res, next) {
        try {
            const customers = await db.query(
                `
                SELECT customers.id, customers.full_name, customers.email, customers.phone
                FROM customers
                ORDER BY customers.id
                `,
            );
            res.status(200).json(customers.rows);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getCustomerById(req, res, next) {
        try {
            const { customerId } = req.params;
            const customer = await db.query(
                `
                SELECT customers.id, customers.full_name, customers.email, customers.phone
                FROM customers
                WHERE customers.id=$1
                `,
                [customerId],
            );
            if (customer.rows.length === 0) {
                return res.status(404).send('Customer not found');
            }
            res.status(200).json(customer.rows[0]);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async createCustomer(req, res, next) {
        try {
            const { full_name, email, phone, password } = req.body;
            const newCustomer = await db.query(
                `
                INSERT INTO customers (full_name, email, phone, password)
                VALUES ($1, $2, $3, $4)
                RETURNING id, full_name, email, phone
                `,
                [full_name, email, phone, password],
            );
            res.status(200).json(newCustomer.rows[0]);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async updateCustomer(req, res, next) {
        try {
            const { id, full_name, email, phone, password } = req.body;
            const updatedCustomer = await db.query(
                `
                UPDATE customers
                SET
                full_name=$2,
                email=$3,
                phone=$4,
                password=$5
                WHERE id=$1
                RETURNING id, full_name, email, phone
                `,
                [id, full_name, email, phone, password],
            );
            if (updatedCustomer.rows.length === 0) {
                return res.status(404).send('Customer not found');
            }
            res.status(200).json(updatedCustomer.rows[0]);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteCustomer(req, res, next) {
        try {
            const { customerId } = req.params;
            const deletedCustomer = await db.query(
                `
                DELETE FROM customers
                WHERE id=$1
                RETURNING full_name, id
                `,
                [customerId],
            );
            if (deletedCustomer.rows.length === 0) {
                return res.status(404).send('Customer not found');
            }
            res.status(200).json(deletedCustomer.rows[0]);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = new CustomersController();
