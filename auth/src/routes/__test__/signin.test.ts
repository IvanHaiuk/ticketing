import request from "supertest";
import { app } from "../../app";

it("fails with email that doesnt exist", async () => {
    return request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(400);
});

it("fails with incorrect password", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);

    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "1111"
        })
        .expect(400);
});

it("works with valid credentials", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);

    const responce = await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200);

    expect(responce.get("Set-Cookie")).toBeDefined();
});