import {
  createRecipeDb,
  getRecipesDb,
  deleteRecipeDb,
  updateRecipeDb,
} from "../queries/recipe.js";
import path from "path";

export const createRecipe = async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    image = req.file ? req.file.path : "",
    category,
    prepTime,
    cookTime,
  } = req.body;

  // const image = req.file; //

  if (!title || !description || !ingredients || !instructions) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // const newRecipe = {
  //   title,
  //   description,
  //   ingredients,
  //   instructions,
  //   category,
  //   prepTime: parseInt(prepTime),
  //   cookTime: parseInt(cookTime),
  //   image: image ? `/uploads/${image.filename}` : null,
  // };

  try {
    const recipe = await createRecipeDb(
      title,
      description,
      ingredients,
      instructions,
      image,
      category,
      parseInt(prepTime),
      parseInt(cookTime),
      req.user.userId
    );
    res.status(201).json({ recipe });
  } catch (error) {
    // console.error("Error creating recipe:", error);
    // res.status(409).json({ error: "Conflict: " + error.message });
    res.status(404).json({ error: "Error creating recipe" });
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    ingredients,
    instructions,

    image = "",
    category = "",
    prepTime = "",
    cookTime = "",
  } = req.body;

  if (!title || !description || !ingredients || !instructions) {
    return res.status(400).json({ error: "Missing fields." });
  }

  try {
    const recipe = await updateRecipeDb(
      Number.parseInt(id, 10),
      title,
      description,
      ingredients,
      instructions,
      image,
      category,
      prepTime,
      cookTime
    );
    res.status(201).json({ recipe });
  } catch (error) {
    res.status(409).json(error);
  }
};

export const getRecipes = async (req, res) => {
  try {
    const recipes = await getRecipesDb();
    res.status(200).json({ recipes });
  } catch (error) {
    res.status(404).json({ error: "Failed to load recipes" });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRecipeDb(Number.parseInt(id, 10));
    res.status(200).json({ message: "Recipe has been deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "Recipe is not found" });
  }
};
