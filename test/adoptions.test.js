import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("testing App Adoptions", () => {
    
    describe("testear el Router Adopciones", () => {
        it("Endpoint GET /api/adoptions debe traer todas las adopciones", async () => {
            const { status, _body } = await requester.get("/api/adoptions");

            expect(status).to.equal(200);
            expect(_body.payload).to.be.an("array");
        });

        describe("Testing de Mascotas", () => {
            it("Endpoint /api/pets debe crear una mascota correctamente", async () => {
                const pichichoMock = {
                    name: "Firulais",
                    specie: "Pichicho",
                    birthDate: "2021-03-10"
                };

                const { statusCode, _body } = await requester.post("/api/pets").send(pichichoMock);

                expect(statusCode).to.equal(200);
                expect(_body.payload).to.have.property("_id");
            });
        });
    });

    it("Al crear una mascota sólo con los datos elementales, debe contar con 'adopted: false'", async () => {
        const nuevaMascota = {
            name: "Rex",
            specie: "Perro Alfa",
            birthDate: "1980-06-01"
        };

        const { statusCode, _body } = await requester.post("/api/pets").send(nuevaMascota);

        expect(statusCode).to.equal(200);
        expect(_body.payload).to.have.property("adopted").that.equals(false);
    });

    describe("Verificación de Usuario por ID", () => {
        it("Debe obtener un usuario existente por su ID", async () => {
            const userId = "679fad11e2533611c6a0fe5b"; 
    
            const { statusCode, _body } = await requester.get(`/api/users/${userId}`);
    
            expect(statusCode).to.equal(200);
            expect(_body.payload).to.have.property("_id").that.equals(userId);
        });
    });
    

    // 🚨 Casos de Error 🚨
    
    it("Si se desea crear una mascota sin el campo 'nombre', el módulo debe responder con un status 400", async () => {
        const mascotaSinNombre = {
            specie: "Gato",
            birthDate: "2020-05-15"
        };

        const { statusCode } = await requester.post("/api/pets").send(mascotaSinNombre);
        expect(statusCode).to.equal(400);
    });

    it("Si se desea crear una mascota sin el campo 'specie', debe responder con un status 400", async () => {
        const mascotaSinEspecie = {
            name: "Milo",
            birthDate: "2019-11-20"
        };

        const { statusCode } = await requester.post("/api/pets").send(mascotaSinEspecie);
        expect(statusCode).to.equal(400);
    });

    it("Si se desea crear una mascota con una fecha de nacimiento inválida, debe responder con un status 400", async () => {
        const mascotaConFechaInvalida = {
            name: "Luna",
            specie: "Gato",
            birthDate: "FechaIncorrecta"
        };

        const { statusCode } = await requester.post("/api/pets").send(mascotaConFechaInvalida);
        expect(statusCode).to.equal(400);
    });

    it("Si se intenta obtener una adopción inexistente, debe responder con un status 404", async () => {
        const { statusCode } = await requester.get("/api/adoptions/999999999999999999999999"); // ID inválido

        expect(statusCode).to.equal(404);
    });

    it("Si se intenta adoptar una mascota ya adoptada, debe responder con un status 400", async () => {
        // Primero creamos una mascota
        const mascota = {
            name: "Bobby",
            specie: "Perro",
            birthDate: "2018-07-15"
        };

        const { _body } = await requester.post("/api/pets").send(mascota);
        const petId = _body.payload._id;

        // Luego la adoptamos
        await requester.put(`/api/pets/${petId}/adopt`).send({ adopted: true });

        // Intentamos adoptarla nuevamente
        const { statusCode } = await requester.put(`/api/pets/${petId}/adopt`).send({ adopted: true });

        expect(statusCode).to.equal(400);
    });

});
