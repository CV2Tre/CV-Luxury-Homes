const Agent = require('../models/agents');
const mongoose = require('mongoose');
//const db = require('../db');

//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    try {
        const agents = [
            {
                name: "Emily Johnson",
                address: "123 Main St, Los Angeles, CA",
                email: "emily.johnson@cvluxuryhomes.com",
                phone: "323-555-1234",
                headshotImgPath: "/path/to/emily_johnson.jpg",
                properties: []
            },
            {
                name: "Michael Rodriguez",
                address: "456 Elm St, Brooklyn, NY",
                email: "michael.rodriguez@cvluxuryhomes.com",
                phone: "718-555-5678",
                headshotImgPath: "/path/to/michael_rodriguez.jpg",
                properties: []
            },
            {
                name: "Sophia Martinez",
                address: "789 Oak St, Queens, NY",
                email: "sophia.martinez@cvluxuryhomes.com",
                phone: "718-555-9012",
                headshotImgPath: "/path/to/sophia_martinez.jpg",
                properties: []
            },
            // Add more agents as needed
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
