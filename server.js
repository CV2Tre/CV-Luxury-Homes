const express = require('express');
const mongoose = require('mongoose');
const agentController = require('./controllers/agentController');
const homeController = require('./controllers/homeController');
const customerController = require('./controllers/customerController');
const appointmentController = require('./controllers/appointmentController');

const PORT = process.env.PORT || 3001;
const app = express();



// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Hello World'));

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
