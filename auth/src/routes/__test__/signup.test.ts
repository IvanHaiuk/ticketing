import request from "supertest";
import { app } from "../../app";

it("returns 201 on successful signup", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);
});

it("returns 400 with bad email", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "1111",
            password: "password"
        })
        .expect(400);
});

it("returns 400 with bad password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "1"
        })
        .expect(400);
});

it("returns 400 with missing email and password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({})
        .expect(400);
});

it("disallows dublicate emails", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);

    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(400);
});

it("sets a cookie after successful signup", async () => {
    const responce = await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);

    expect(responce.get("Set-Cookie")).toBeDefined();
});