import { Request, Response } from "express";
import UserService from "../services/UserService";
import { createJWT } from "../utils/auth";
import handleRequestError from "../utils/error";
const bcrypt = require("bcrypt");

export const login = async (req: Request, res: Response) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let userFounded = await UserService.findUserByEmail(email);
    if (userFounded == null) {
      res.status(404).send({ auth: false });
      return;
    }
    if (await bcrypt.compare(password, userFounded?.password)) {
      res.status(200).send({ auth: true, email: email, token: createJWT(email) });
      return;
    }
    res.status(404).send({ auth: false });
  } catch (error) {
    handleRequestError(error, res, "sign up", "user");
  }
};

export const getUserData = async (req: Request, res: Response) => {
  try {
    let email = req.body.email;
    let token = req.headers.authorization;

    let handledToken = handleToken(token);

    let userFounded = await UserService.findUserByEmail(email);
    if (userFounded == null) {
      res.status(404).send({ auth: false });
      return;
    }
    userFounded.token = handledToken;
    res.status(200).send(userFounded);
  } catch (error) {
    handleRequestError(error, res, "find", "user");
  }
};

const handleToken = (bearerToken: String | undefined) => {
  if (bearerToken != undefined) {
    let tokenArray = bearerToken.split(" ");
    return tokenArray[1];
  }
};
