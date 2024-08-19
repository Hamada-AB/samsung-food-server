import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUserDb = async (email, password) => {
  return await prisma.user.create({
    data: { email, password },
  });
};

export const findUserDb = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const updateUserDb = async (id, token) => {
  await prisma.user.update({
    where: { id },
    data: { token },
  });
};

export const getUsersDb = async () => {
  return await prisma.user.findMany();
};
