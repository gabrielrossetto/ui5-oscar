import {
  Actor,
  Actors,
  Award,
  Awards,
  Categories,
  Film,
  Films,
  Genre,
} from "#cds-models/sap/oscar";
import cds from "@sap/cds";
import { randomUUID } from "crypto";

export const setTorresAsWinner = async (req: cds.Request) => {
  console.log("Setting Fernanda Torres as winner");
  const tx = cds.transaction(req);

  let actress = {
    ID: "ID_ACTOR_FERNANDA_TORRES",
    name: "Fernanda Torres",
    nationality: "Brazilian",
  } as Actor;

  let film = {
    ID: "ID_FILM_AINDA_ESTOU_AQUI",
    title: "Ainda Estou Aqui",
    releaseDate: 2024,
    genre: Genre.Drama,
  } as Film;

  const category = await tx.run(
    SELECT.one.from(Categories).where({ ID: "ID_CATEGORY_BEST_ACTRESS" })
  );

  const award = {
    ID: "ID_AWARD_FERNANDA_TORRES",
    actor_ID: actress.ID,
    film_ID: film.ID,
    category_ID: category.ID,
    year: 2025,
  } as Award;

  // Insert actress and film into the database
  await tx.run(INSERT.into(Actors).entries(actress));
  await tx.run(INSERT.into(Films).entries(film));

  // Create the association between actress and film
  await tx.run(
    INSERT.into(Actors.films).entries({
      up__ID: actress.ID,
      film_ID: film.ID,
    })
  );

  // Insert the award for the actress
  await tx.run(INSERT.into(Awards).entries(award));

  // Commit the transaction
  await tx.commit();
  console.log("Fernanda Torres set as winner");
};
