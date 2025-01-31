using {sap.oscar as os} from '../db/schema';

@title: 'Oscar Service'

service OscarService {
    entity Actors     as
        projection on os.Actors {
            *,
            ID,
            awards : redirected to Awards
        };

    entity Films      as projection on os.Films;
    entity Awards     as projection on os.Awards;
    entity Categories as projection on os.Categories;
    action setTorresAsWinner();
}
