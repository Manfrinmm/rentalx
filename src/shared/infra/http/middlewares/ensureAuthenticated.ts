import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError("Token is required", 401);
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub: user_id } = verify(token, "SECRET_KEY");

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(String(user_id));
    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: String(user_id),
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
