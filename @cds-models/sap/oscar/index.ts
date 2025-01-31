// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './../..';
import * as __ from './../../_';

// enum
export const Genre = {
  action: "action",
  Adventure: "Adventure",
  Comedy: "Comedy",
  Crime: "Crime",
  Drama: "Drama",
  Fantasy: "Fantasy",
  Historical: "Historical",
  Horror: "Horror",
  Mystery: "Mystery",
  Romance: "Romance",
  ScienceFiction: "ScienceFiction",
  Thriller: "Thriller",
  Western: "Western",
} as const;
export type Genre = "action" | "Adventure" | "Comedy" | "Crime" | "Drama" | "Fantasy" | "Historical" | "Horror" | "Mystery" | "Romance" | "ScienceFiction" | "Thriller" | "Western"

export function _ActorAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Actor extends _._cuidAspect(_._managedAspect(Base)) {
    declare name?: string | null
    declare films?: __.Composition.of.many<Actors.films>
    declare awards?: __.Association.to.many<Awards>
    declare nationality?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Actor> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Actor>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Actor extends _ActorAspect(__.Entity) {}
Object.defineProperty(Actor, 'name', { value: 'sap.oscar.Actors' })
Object.defineProperty(Actor, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Actors extends Array<Actor> {$count?: number}
Object.defineProperty(Actors, 'name', { value: 'sap.oscar.Actors' })

export function _FilmAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film extends _._cuidAspect(_._managedAspect(Base)) {
    declare title?: string | null
    declare releaseDate?: number | null
    declare genre?: Genre | null
    declare actors?: __.Composition.of.many<Actors.films>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Film>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Film extends _FilmAspect(__.Entity) {}
Object.defineProperty(Film, 'name', { value: 'sap.oscar.Films' })
Object.defineProperty(Film, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Films extends Array<Film> {$count?: number}
Object.defineProperty(Films, 'name', { value: 'sap.oscar.Films' })

export function _AwardAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Award extends _._cuidAspect(_._managedAspect(Base)) {
    declare year?: number | null
    declare actor?: __.Association.to<Actor> | null
    declare actor_ID?: string | null
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare category?: __.Association.to<Category> | null
    declare category_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Award> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Award>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Award extends _AwardAspect(__.Entity) {}
Object.defineProperty(Award, 'name', { value: 'sap.oscar.Awards' })
Object.defineProperty(Award, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Awards extends Array<Award> {$count?: number}
Object.defineProperty(Awards, 'name', { value: 'sap.oscar.Awards' })

export function _CategoryAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Category extends _._cuidAspect(_._managedAspect(Base)) {
    declare name?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Category> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Category>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Category extends _CategoryAspect(__.Entity) {}
Object.defineProperty(Category, 'name', { value: 'sap.oscar.Categories' })
Object.defineProperty(Category, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Categories extends Array<Category> {$count?: number}
Object.defineProperty(Categories, 'name', { value: 'sap.oscar.Categories' })

export namespace Actors {
  export function _filmAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class film extends Base {
      declare up_?: __.Key<__.Association.to<Actor>>
      declare up__ID?: __.Key<string>
      declare film?: __.Key<__.Association.to<Film>>
      declare film_ID?: __.Key<string>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<film>;
      declare static readonly elements: __.ElementsOf<film>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class film extends _filmAspect(__.Entity) {}
  Object.defineProperty(film, 'name', { value: 'sap.oscar.Actors.films' })
  Object.defineProperty(film, 'is_singular', { value: true })
  export class films extends Array<film> {$count?: number}
  Object.defineProperty(films, 'name', { value: 'sap.oscar.Actors.films' })
  
}