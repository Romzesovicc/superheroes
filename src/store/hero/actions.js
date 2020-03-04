import {
  ADD_HERO, DELETE_HERO, GET_HERO, GET_HEROES, UPDATE_HERO,
} from './types';

export const getHero = (id) => ({
  type: GET_HERO,
  request: {
    method: 'get',
    url: `heroes/${id}`,
  },
});

export const getHeroes = (query = { skip: 0, limit: 10 }) => ({
  type: GET_HEROES,
  request: {
    method: 'GET',
    url: 'heroes',
    params: {
      ...query,
    },
  },
});

export const addHero = (data) => ({
  type: ADD_HERO,
  request: {
    method: 'post',
    url: 'heroes',
    data,
  },
});

export const deleteHero = (id) => ({
  type: DELETE_HERO,
  request: {
    method: 'delete',
    url: `heroes/${id}`,
  },
});

export const updateHero = (id, data) => ({
  type: UPDATE_HERO,
  request: {
    method: 'patch',
    url: `heroes/${id}`,
    data,
  },
});
