import MockingService from "../services/mocking.js";

const getMockingPets = async (req, res) => {
    const mascotas = await MockingService.generateMockingPets(50);
    res.send({ status: "success", payload: mascotas });
};

const getMockingUsers = async (req, res) => {
    const usuarios = await MockingService.generateMockingUsers(50);
    res.send({ status: "success", payload: usuarios });
};

const generateMockingData = async (req, res) => {
    const { users, pets } = req.body;
    
    if (!users || !pets) {
        return res.status(400).json({ message: 'Los parámetros "users" y "pets" son requeridos.' });
    }

    const userCount = parseInt(users, 10);
    const petCount = parseInt(pets, 10);

    if (isNaN(userCount) || isNaN(petCount)) {
        return res.status(400).json({ message: "Los parámetros deben ser números válidos." });
    }

    const data = await MockingService.generateMockingData(userCount, petCount);
    res.send({ status: "success", payload: data });
};

export default {
    getMockingPets,
    getMockingUsers,
    generateMockingData
};
