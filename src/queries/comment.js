import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCommentDb = async (content) => {
  return await prisma.comment.create({
    data: {
      content,
      userId,
    },
  });
};

export const getCommentsDb = async () => {
  return await prisma.comment.findMany();
};

export const deleteCommentDb = async (id) => {
  return await prisma.comment.delete({
    where: { id },
  });
};

export const updateCommentDb = async (id, content) => {
  return await prisma.content.update({
    where: { id },
    data: {
      content,
    },
  });
};
