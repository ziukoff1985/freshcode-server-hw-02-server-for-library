const db = require('../../db');

class CustomersController {
    async getAllCustomers(req, res) {
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
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = new CustomersController();
