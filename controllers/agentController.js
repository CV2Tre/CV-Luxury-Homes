const Agent = require('../models/agents');

const getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.json(agents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const getAgentById = async (req, res) => {
    try {
        const { id } = req.params;
        const agent = await Agent.findById(id);
        if (!agent) {
            return res.status(404).json({ error: 'Agent not found' });
        }
        res.json(agent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAgent = async (req, res) => {
    try {
        const agent = await Agent.create(req.body);
        res.status(201).json(agent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAgentById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAgent = await Agent.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAgent) {
            return res.status(404).json({ error: 'Agent not found' });
        }
        res.json(updatedAgent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAgentById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAgent = await Agent.findByIdAndDelete(id);
        if (!deletedAgent) {
            return res.status(404).json({ error: 'Agent not found' });
        }
        res.json(deletedAgent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllAgents,
    getAgentById,
    createAgent,
    updateAgentById,
    deleteAgentById
};
