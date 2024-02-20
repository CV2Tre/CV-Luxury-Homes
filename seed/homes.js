const Home = require('../models/homes');
const mongoose = require('mongoose');

const main = async () => {
    try {
        const homes = [
            {
                houseInformation: 'Beautiful 3-bedroom house with a spacious backyard',
                houseAddress: { street: '123 Main St', city: 'Cityville', state: 'Stateville', zip: '12345' },
                aboutTheHome: 'This home features a modern kitchen, hardwood floors, and a large living room.'
            },
            {
                houseInformation: 'Luxurious 5-bedroom mansion with a pool',
                houseAddress: { street: '456 Elm St', city: 'Townsville', state: 'Stateland', zip: '54321' },
                aboutTheHome: 'This stunning mansion boasts high ceilings, marble floors, and a landscaped garden.'
            },
            {
                houseInformation: 'Cozy 2-bedroom cottage with scenic views',
                houseAddress: { street: '789 Oak St', city: 'Villagetown', state: 'Countryland', zip: '67890' },
                aboutTheHome: 'Enjoy peace and tranquility in this charming cottage surrounded by nature.'
            }
        ];

        const createdHomes = await Home.insertMany(homes);
        console.log('Created homes:', createdHomes);
    } catch (error) {
        console.error('Error creating homes:', error);
    } finally {
        mongoose.connection.close();
    }
};

const run = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cv-luxury-homes-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to MongoDB');
        await main();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

run();
