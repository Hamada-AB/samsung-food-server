import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createSavedRecipeDb = async (userId, recipeId) => {
  return await prisma.savedRecipe.create({
    data: {
      userId,
      recipeId,
    },
  });
};

export const getSavedRecipesDb = async (userId) => {
  return await prisma.savedRecipe.findMany({
    where: { userId },
    include: { recipe: true }, // Include full recipe details
  });
};

export const deleteSavedRecipeDb = async (userId, recipeId) => {
  return await prisma.savedRecipe.deleteMany({
    where: {
      userId,
      recipeId,
    },
  });
};
