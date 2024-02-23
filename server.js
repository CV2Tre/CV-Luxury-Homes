const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const agentController = require('./controllers/agentController');
const homeController = require('./controllers/homeController');
const customerController = require('./controllers/customerController');
const appointmentController = require('./controllers/appointmentController');
const Home = require('./models/homes');

const Customer = require('./models/customers'); // Import the Customer model
const Appointment = require('./models/appointments'); // Import the Appointment model

const Agent = require('./models/agents');
const PORT = process.env.PORT || 3001;
const app = express();


// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the directory where the view files are located
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());


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
        const agent = await Agent.findById(home.agentId)
        console.log(agent)
        res.render('property-single', { title: home.houseAddress.street, home: home, agent: agent, agentId: agent._id, homeId: home._id });
    } catch (err) {
        console.error('Error finding home:', err);
        res.status(500).send('Server Error');
    }
});
app.post('/appointments/new', async (req, res) => {
    try {
        // Extract form data
        const { name, phone, email, date, notes, agentId, homeId } = req.body;

        // Create a new customer object
        const newCustomer = new Customer({
            name: name,
            email: email,
            phone: phone
        });

        // Save the new customer to the database
        const customer = await newCustomer.save();

        // Create a new appointment object
        const newAppointment = new Appointment({
            name: name,
            email: email,
            phone: phone,
            date: date,
            notes: notes,
            agentId: agentId,
            homeId: homeId,
            customerId: customer._id // Assign the newly created customer's ID to the appointment
        });

        // Save the new appointment to the database
        const appointment = await newAppointment.save();

        // Send a response back to the client
        res.send('Form submitted successfully!');
    } catch (error) {
        console.error('Error:', error);
        // Send an error response back to the client
        res.status(500).send('An error occurred while processing the form data.');
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
