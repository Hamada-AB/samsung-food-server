import {
  createSavedRecipeDb,
  getSavedRecipesDb,
  deleteSavedRecipeDb,
  getAllSavedRecipesDb,
} from "../queries/savedRecipe.js";

export const createSavedRecipe = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    const savedRecipe = await createSavedRecipeDb(userId, recipeId);
    res.status(201).json({ savedRecipe });
  } catch (error) {
    res.status(409).json({ error: "Failed to save recipe." });
  }
};

export const getSavedRecipes = async (req, res) => {
  const { userId } = req.user;

  try {
    const savedRecipes = await getSavedRecipesDb(userId);
    res.status(200).json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ error: "Failed to load saved recipes." });
  }
};

export const getAllSavedRecipes = async (req, res) => {
  try {
    const allSavedRecipes = await getAllSavedRecipesDb();
    res.status(200).json({ allSavedRecipes });
  } catch (error) {
    res.status(500).json({ error: "Failed to load saved recipes." });
  }
};

export const deleteSavedRecipe = async (req, res) => {
  const { userId, recipeId } = req.body;
  try {
    const deletedSavedRecipe = await deleteSavedRecipeDb(
      Number.parseInt(userId, 10),
      Number.parseInt(recipeId, 10)
    );

    res.status(200).json({ deleteSavedRecipe });
  } catch (error) {
    res.status(500).json({ error: "Failed to unsave recipe" });
  }
};
