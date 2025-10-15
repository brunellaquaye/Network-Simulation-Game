import { hashSync } from "bcrypt";
import { signup } from "../../controllers/auth.controller";

jest.mock("../../config/db", () => ({
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  hashSync: jest.fn(),
}));

import prisma from "../../config/db";

const mockedHashSync = hashSync as jest.MockedFunction<typeof hashSync>;

describe("Auth Controller for Signup", () => {
  let req: any, res: any;

  beforeEach(() => {
    req = {
      body: {
        username: "usertert",
        email: "tetnn@gmail.com",
        password: "hhhhhh",
        role: "player",
      },
    };

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    jest.clearAllMocks();
  });

  
  it("should send status code 201 when user is created", async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValueOnce(null); // No existing user
    (prisma.user.create as jest.Mock).mockResolvedValueOnce({
      id: 1,
      username: "usertert",
      email: "tetnn@gmail.com",
      password: "hashedPassword",
      role: "player",
    });
    mockedHashSync.mockReturnValue("hashedPassword");

    await signup(req, res);

    // Assertions
    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { email: "tetnn@gmail.com" },
    });
    expect(mockedHashSync).toHaveBeenCalledWith("hhhhhh", 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        username: "usertert",
        email: "tetnn@gmail.com",
        password: "hashedPassword",
        role: "player",
      },
    });
    expect(res.status).not.toHaveBeenCalledWith(400); // Not a bad request
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      username: "usertert",
      email: "tetnn@gmail.com",
      role: "player",
    });
  });

  it("should return 400 if user already exists", async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValueOnce({
      id: 1,
      email: "tetnn@gmail.com",
    });

    await signup(req, res);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { email: "tetnn@gmail.com" },
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "User already exist with this email",
    });
  });



 });
