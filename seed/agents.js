const Agent = require('../models/agents');
const mongoose = require('mongoose');
//const db = require('../db');

//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    try {
        const agents = [
            {
                name: 'Agent 1',
                address: 'Address 1',
                email: 'agent1@example.com',
                phone: '1234567890'
            },
            {
                name: 'Agent 2',
                address: 'Address 2',
                email: 'agent2@example.com',
                phone: '9876543210'
            },
            {
                name: 'Agent 3',
                address: 'Address 3',
                email: 'agent3@example.com',
                phone: '5551234567'
            }
        ];

        const createdAgents = await Agent.insertMany(agents);
        console.log('Created agents:', createdAgents);
    } catch (error) {
        console.error('Error creating agents:', error);
    } finally {
        // db.close();
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
