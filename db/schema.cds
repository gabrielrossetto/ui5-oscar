using {
    cuid,
    managed,
} from '@sap/cds/common';

namespace sap.oscar;

entity Actors : cuid, managed {
    name        : String;
    films       : Composition of many {
                      key film : Association to Films;
                  };
    awards      : Association to many Awards
                      on awards.actor = $self;
    nationality : String;
}

entity Films : cuid, managed {
    title       : String(100);
    releaseDate : Int16;
    genre       : Genre;
    actors      : Composition of many Actors.films
                      on actors.film = $self;
}

entity Awards : cuid, managed {
    year     : Int16;
    actor    : Association to Actors;
    film     : Association to Films;
    category : Association to Categories;
}


entity Categories : cuid, managed {
    name : String(100);
}

type Genre : String(20) enum {
    action;
    Adventure;
    Comedy;
    Crime;
    Drama;
    Fantasy;
    Historical;
    Horror;
    Mystery;
    Romance;
    ScienceFiction;
    Thriller;
    Western;
}
