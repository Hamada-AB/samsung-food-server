import {
  createSavedRecipeDb,
  getSavedRecipesDb,
  deleteSavedRecipeDb,
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
  const { userId } = req.params;
  try {
    const savedRecipes = await getSavedRecipesDb(userId);
    res.status(200).json({ savedRecipes });
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

    if (deletedSavedRecipe.count > 0) {
      res.status(200).json({ message: "Recipe unsaved successfully." });
    } else {
      res.status(404).json({ error: "Saved recipe not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to unsave recipe" });
  }
};
