import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createRecipeDb = async (
  title,
  description,
  ingredients,
  instructions,
  image = "",
  category = "",
  prepTime = 0,
  cookTime = 0,
  userId
) => {
  return await prisma.recipe.create({
    data: {
      title,
      description,
      ingredients,
      instructions,
      image,
      category,
      prepTime,
      cookTime,
      userId,
    },
  });
};

export const getRecipesDb = async () => {
  return await prisma.recipe.findMany();
};

export const deleteRecipeDb = async (id) => {
  return await prisma.recipe.delete({
    where: { id },
  });
};

export const updateRecipeDb = async (
  id,
  title,
  description,
  ingredients,
  instructions,
  category,
  prepTime,
  cookTime
) => {
  return await prisma.recipe.update({
    where: { id },
    data: {
      title,
      description,
      ingredients,
      instructions,
      category,
      prepTime,
      cookTime,
    },
  });
};
