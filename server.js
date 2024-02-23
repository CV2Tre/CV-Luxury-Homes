const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const agentController = require('./controllers/agentController');
const homeController = require('./controllers/homeController');
const customerController = require('./controllers/customerController');
const appointmentController = require('./controllers/appointmentController');
const Home = require('./models/homes');

const PORT = process.env.PORT || 3001;
const app = express();


// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the directory where the view files are located
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    try {
        const homes = [];
        Home.find({})
            .then(homes => {
                // Process found homes
                // Storing the result in a variable named constHomes
                console.log('Found homes:', homes);
                res.render('index', { title: 'CV Luxury Homes', homes: homes });

            })
            .catch(err => {
                console.error('Error finding homes:', err);
                // Handle error
            });
    } catch (error) {

        console.error(error)
        res.status(500).json({ message: "Server Error!" })
    }
});

app.get('/:id', async (req, res) => {
    try {
        const home = await Home.findById(req.params.id).exec();
        if (!home) {
            return res.status(404).send('Home not found');
        }
        res.render('property-single', { title: 'Single Property', home: home });
    } catch (err) {
        console.error('Error finding home:', err);
        res.status(500).send('Server Error');
    }
});
// Agents
app.get('/agents', agentController.getAllAgents);
app.get('/agents/:id', agentController.getAgentById);
app.post('/agents', agentController.createAgent);
app.put('/agents/:id', agentController.updateAgentById);
app.delete('/agents/:id', agentController.deleteAgentById);

// Homes
app.get('/homes', homeController.getAllHomes);
app.get('/homes/:id', homeController.getHomeById);
app.post('/homes', homeController.createHome);
app.put('/homes/:id', homeController.updateHomeById);
app.delete('/homes/:id', homeController.deleteHomeById);

// Customers
app.get('/customers', customerController.getAllCustomers);
app.get('/customers/:id', customerController.getCustomerById);
app.post('/customers', customerController.createCustomer);
app.put('/customers/:id', customerController.updateCustomerById);
app.delete('/customers/:id', customerController.deleteCustomerById);

// Appointments
app.get('/appointments', appointmentController.getAllAppointments);
app.get('/appointments/:id', appointmentController.getAppointmentById);
app.post('/appointments', appointmentController.createAppointment);
app.put('/appointments/:id', appointmentController.updateAppointmentById);
app.delete('/appointments/:id', appointmentController.deleteAppointmentById);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cv-luxury-homes-db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log('Server running!'));
    })
    .catch(err => console.error('MongoDB connection error:', err));
