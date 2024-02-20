const Appointment = require('../models/appointments');
const mongoose = require('mongoose');

const main = async () => {
    try {
        const appointments = [
            {
                name: 'John Doe',
                address: '123 Main St',
                email: 'john@example.com',
                phone: '555-123-4567',
                date: Date.now(), // Replace with desired date in milliseconds
                time: 14, // Replace with desired time
                interestedHome: ['Home ID 1', 'Home ID 2'], // Replace with actual home IDs
                notes: 'Interested in spacious homes',
                // agentId: 'Agent ID 1', // Replace with actual agent ID
                // homeId: 'Home ID 1', // Replace with actual home ID
                // customerId: 'Customer ID 1' // Replace with actual customer ID
            },
            {
                name: 'Jane Smith',
                address: '456 Oak St',
                email: 'jane@example.com',
                phone: '555-987-6543',
                date: Date.now(), // Replace with desired date in milliseconds
                time: 10, // Replace with desired time
                interestedHome: ['Home ID 2'], // Replace with actual home ID
                notes: 'Looking for a modern kitchen',
                //agentId: 'Agent ID 2', // Replace with actual agent ID
                //homeId: 'Home ID 2', // Replace with actual home ID
                //customerId: 'Customer ID 2' // Replace with actual customer ID
            },
            // Add more appointment objects as needed
        ];

        const createdAppointments = await Appointment.insertMany(appointments);
        console.log('Created appointments:', createdAppointments);
    } catch (error) {
        console.error('Error creating appointments:', error);
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
