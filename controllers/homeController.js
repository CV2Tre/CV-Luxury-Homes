const Home = require('../models/Home');

const getAllHomes = async (req, res) => {
    try {
        const homes = await Home.find();
        res.json(homes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHomeById = async (req, res) => {
    try {
        const { id } = req.params;
        const home = await Home.findById(id);
        if (!home) {
            return res.status(404).json({ error: 'Home not found' });
        }
        res.json(home);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createHome = async (req, res) => {
    try {
        const home = await Home.create(req.body);
        res.status(201).json(home);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateHomeById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedHome = await Home.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedHome) {
            return res.status(404).json({ error: 'Home not found' });
        }
        res.json(updatedHome);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteHomeById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHome = await Home.findByIdAndDelete(id);
        if (!deletedHome) {
            return res.status(404).json({ error: 'Home not found' });
        }
        res.json(deletedHome);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllHomes,
    getHomeById,
    createHome,
    updateHomeById,
    deleteHomeById
};
