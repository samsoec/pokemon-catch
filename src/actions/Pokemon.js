import api from 'util/Api'
import {gql} from "@apollo/client";
import {
  SHOW_MESSAGE,
  NOTIFICATION_ERROR,
  GET_ALL_POKEMON,
  GET_ONE_POKEMON,
  UI_START_ACTION,
  UI_STOP_ACTION,
  CATCH_POKEMON,
  SAVE_POKEMON,
  RELEASE_POKEMON
} from "../constants/ActionTypes";

const SUCCESS_RATE = 0.5;

export const getAllPokemon = ({limit, offset}) => {
  return dispatch => {
    dispatch({type: UI_START_ACTION, name: GET_ALL_POKEMON});
    api.query({
      query: gql`
        query pokemons($limit: Int, $offset: Int) {
          pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            nextOffset
            prevOffset
            status
            message
            results {
              id
              url
              name
              image
              artwork
              dreamworld
            }
          }
        }
      `,
      variables: {limit, offset}
    }).then(({data}) => {
      const {pokemons: {results, nextOffset}} = data;
      dispatch({type: UI_STOP_ACTION, name: GET_ALL_POKEMON});
      dispatch({type: GET_ALL_POKEMON, payload: results, offset: nextOffset})
    }).catch(({response}) => {
      dispatch({type: UI_STOP_ACTION, name: GET_ALL_POKEMON});
      if (response) {
        console.log("Error****:", response.message);
        dispatch({type: SHOW_MESSAGE, title: 'Package error.', message: response.data.message, severity: NOTIFICATION_ERROR})
      }
    });
  }
};

export const getPokemonDetail = ({name}) => {
  return dispatch => {
    dispatch({type: UI_START_ACTION, name: GET_ONE_POKEMON});
    api.query({
      query: gql`
        query pokemon($name: String!) {
          pokemon(name: $name) {
            id
            name
            message
            height
            weight
            species {
              url
              name
            }
            sprites {
              front_default
              front_female
              front_shiny
              front_shiny_female
            }
            abilities {
              ability {
                url
                name
              }
              is_hidden
              slot
            }
            moves {
              move {
                url
                name
              }
            }
            stats {
              base_stat
              effort
              stat {
                url
                name
              }
            }
            types {
              slot
              type {
                url
                name
              }
            }
          }
        }
      `,
      variables: {name}
    }).then(({data}) => {
      const {pokemon} = data;
      dispatch({type: UI_STOP_ACTION, name: GET_ONE_POKEMON});
      dispatch({type: GET_ONE_POKEMON, payload: pokemon})
    }).catch(({response}) => {
      dispatch({type: UI_STOP_ACTION, name: GET_ONE_POKEMON});
      if (response) {
        console.log("Error****:", response.message);
        dispatch({type: SHOW_MESSAGE, title: 'Package error.', message: response.data.message, severity: NOTIFICATION_ERROR})
      }
    });
  }
};

export const catchPokemon = (pokemon) => {
  return dispatch => {
    dispatch({type: UI_START_ACTION, name: CATCH_POKEMON});
    setTimeout(() => {
      const result = Math.random() < SUCCESS_RATE;
      if (result)
        dispatch({type: CATCH_POKEMON, payload: pokemon});
      else
        dispatch({type: CATCH_POKEMON, payload: false});
      dispatch({type: UI_STOP_ACTION, name: CATCH_POKEMON});
    }, 5000)
  }
};

export const savePokemon = (nickname = '', pokemon = {}) => {
  return dispatch => {
    dispatch({type: SAVE_POKEMON, payload: {...pokemon, nickname}});
  }
};

export const releasePokemon = ({name, nickname}) => {
  return dispatch => {
    dispatch({type: RELEASE_POKEMON, name, nickname});
  }
};