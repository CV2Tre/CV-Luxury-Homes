const Customer = require('../models/customers');
const mongoose = require('mongoose');

const main = async () => {
    try {
        const customers = [
            {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '555-123-4567'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                phone: '555-987-6543'
            },
            // Add more customer objects as needed
        ];

        const createdCustomers = await Customer.insertMany(customers);
        console.log('Created customers:', createdCustomers);
    } catch (error) {
        console.error('Error creating customers:', error);
    } finally {
        mongoose.disconnect();
    }
};

const run = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cv-luxury-homes-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
        await main();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

run();
