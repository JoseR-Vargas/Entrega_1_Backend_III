import MockingService from "../services/mocking.js"; 


const getMockingPets = async (req, res) => {
    const mascotas = await MockingService.generateMockingPets(100);
    res.send({status: "success", payload: mascotas});
}

const getMockingUsers = async (req, res) => {
    const usuarios = await MockingService.generateMockingUsers(100); 
    res.send({status:"success", payload: usuarios}); 
}

export default {
    getMockingPets,
    getMockingUsers
}