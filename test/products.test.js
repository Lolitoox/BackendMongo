import { expect } from "chai";
import supertest, { agent } from "supertest";
import envConfig from "../src/config/env.config.js";

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Test products", () => {
    let cookie;
    before(async () => {
        const loginUser = {
            email: "useradmin@test.com",
            password: "12345",
        };

        const { headers } = await requester.post("/api/session/login").send(loginUser);

        const cookieResult = headers["set-cookie"][0];

        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1],
        };
    });

    let productId;

    it("[POST] /api/products este endpoint debe crear el nuevo producto", async () => {
        const newProduct = {
            title: "Producto Test",
            description: "Este es un producto para realizar un Test",
            price: 400,
            thumbnail: ["http://www.google.com/img"],
            code: "ABC123",
            stock: 25,
            category: "otros",
        };

        const { status, _body, ok } = await requester
            .post("/api/products")
            .send(newProduct)
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);
        productId = _body.payload._id;

        expect(status).to.be.equal(201);
        expect(ok).to.be.equal(true);
        expect(_body.payload.title).to.be.equal("Producto Test");
    });

    it("[GET] /api/products/:pid endpoint para devolver solo un producto", async () => {
        const { status, _body, ok } = await requester.get(`/api/products/${productId}`);

        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.payload.title).to.be.equal("Producto Test");
    });

    it("[GET] /api/products/ endpoint para devolver todos los productos", async () => {
        const { status, _body, ok } = await requester.get(`/api/products`);
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.products.docs).to.be.an("array");
    });

    it("[PUT] /api/products/:pid endpoint para actualizar un producto", async () => {
        const updateData = {
            title: "test update",
            description: "product test update",
        };

        const { status, _body, ok } = await requester
            .put(`/api/products/${productId}`)
            .send(updateData)
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);

        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.payload.title).to.be.equal("test update");
        expect(_body.payload.description).to.be.equal("product test update");
    });

    it("[DELETE] /api/products/:pid este endpoint debe eliminar un producto", async () => {
        const { status, _body, ok } = await requester
            .delete(`/api/products/${productId}`)
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
    });
});