import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Users
  const users = await Promise.all(
    Array.from({ length: 50 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: faker.internet.password(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          country: faker.location.country(),
          gender: faker.person.sex(),
          token: faker.string.uuid(),
        },
      })
    )
  );

  // Recipes
  const recipes = await Promise.all(
    users.map((user) =>
      prisma.recipe.create({
        data: {
          title: faker.lorem.words(3),
          description: faker.lorem.sentences(2),
          ingredients: faker.lorem.sentences(3),
          image: faker.image.food(),
          instructions: faker.lorem.paragraphs(1),
          category: faker.helpers.arrayElement([
            "Vegetarian",
            "Vegan",
            "Non-Vegetarian",
          ]),
          prepTime: faker.number.int({ min: 10, max: 60 }),
          cookTime: faker.number.int({ min: 10, max: 120 }),
          userId: user.id,
        },
      })
    )
  );

  // Comments
  await Promise.all(
    recipes.map((recipe) =>
      prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          recipeId: recipe.id,
          userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        },
      })
    )
  );

  // SavedRecipes
  await Promise.all(
    users.map((user) =>
      prisma.savedRecipe.create({
        data: {
          userId: user.id,
          recipeId:
            recipes[faker.number.int({ min: 0, max: recipes.length - 1 })].id,
        },
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
