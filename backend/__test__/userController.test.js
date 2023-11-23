const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const {
  createUser,
  createToken,
  findUser,
  passCheck,
  findUserById
} = require("../dao/userControllerDao");
const {authenticateToken} = require("../auth/auth")
//  const jest = require('@jest/globals')

jest.mock("../dao/userControllerDao");
jest.mock("../auth/auth");

const mockResponse = {
  _id: "64143d1ad4baef303c9cb463",
  firstname: "abdullah",
  lastname: "ahmed",
  email: "abdullah.ahmed1000001+9@gmail.com",
  position: "tester",
  password: "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
};

describe("testing endpoints for user controller", () => {
  describe("testing register endpoint", () => {
    test("should return statuscode for 400, if email is not present ", async () => {
      const response = await request(app).post("/register").send({
        firstname: "abdullah",
        lastname: "ahmed",
        email: "",
        position: "tester",
        password:
          "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
      });
      expect(response.statusCode).toBe(400);
    });

    test("should return statuscode for 400, if password is not not present or not valid ", async () => {
      const response = await request(app).post("/register").send({
        firstname: "abdullah",
        lastname: "ahmed",
        email: "abdullah.ahmed10001@gmail.com",
        position: "tester",
        password: "$2a$10",
      });
      expect(response.statusCode).toBe(400);
    });

    test("if all the data in request is valid then createUser and createToken function should be called once", async () => {
      createUser.mockImplementationOnce(() => {
        return mockResponse;
      });
      createToken.mockImplementationOnce(() => {
        return {
          _id: "6459f5e9ee228fc580ed52f6",
          userId: "6459f5e9ee228fc580ed52f6",
          token:
            "a3c82e096026313773df4bd1f6152d12f83a7610a2d8bd5b53eafcd3ec45e1a9",
        };
      });
      const response = await request(app).post("/register").send({
        firstname: "abdullah",
        lastname: "ahmed",
        email: "abdullah.ahmed10001+7@gmail.com",
        position: "tester",
        password:
          "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
      });
      expect(createUser).toHaveBeenCalledTimes(1);
      expect(createToken).toHaveBeenCalledTimes(1);
    });
  });

  describe("testing for login endpoint", () => {
    test("if email is not found in db it should return status Code of ", async () => {
      findUser.mockImplementationOnce(() => {
        return null;
      });

      passCheck.mockImplementationOnce(() => {
        return true;
      });

      const response = await request(app).post("/login").send({
        email: "abdullah.ahmed10001+7@gmail.com",
        password:
          "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
      });

      expect(response.statusCode).toBe(400);
    });

    test("if email is found in db and also pass is correct, the statusCode should be 200", async () => {
      findUser.mockImplementationOnce(() => {
        return {
          _id: "6459f5e9ee228fc580ed52f6",
          firstname: "abdullah",
          lastname: "ahmed",
          email: "abdullah.ahmed10001+7@gmail.com",
          position: "tester",
          password:
            "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
          verified: true,
        };
      });

      passCheck.mockImplementationOnce(() => {
        return true;
      });

      const response = await request(app).post("/login").send({
        email: "abdullah.ahmed10001+7@gmail.com",
        password:
          "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
      });

      expect(response.statusCode).toBe(200);
    });

    test('if endpoint got the userId it should return the statusCode of 200 ',async()=>{
      authenticateToken.mockImplementationOnce(()=>{
        return 
      })
      const response = await request(app).post("/login").send({
        email: "abdullah.ahmed10001+7@gmail.com",
        password:
          "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
      });
      
    })
  });

  describe("testing the getUserById endpoint",()=>{
    test("if the authentication is ok ,it should return the user with status 200",async()=>{
      authenticateToken.mockImplementationOnce((req,res,next)=>{
        res.locals.decodedId = '6459f5e9ee228fc580ed52f6'
        next()
      })
      findUserById.mockImplementation(()=>{
        return{
          _id: "6459f5e9ee228fc580ed52f6",
          firstname: "abdullah",
          lastname: "ahmed",
          email: "abdullah.ahmed10001+7@gmail.com",
          position: "tester",
          password:
            "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
          verified: true,
        }
      })

      const response = await request(app).get("/show-user")

      expect(findUserById).toHaveBeenCalledTimes(1);


    })
  })
});
