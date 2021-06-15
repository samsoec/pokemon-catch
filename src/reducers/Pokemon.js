import {GET_ALL_POKEMON, GET_ONE_POKEMON, CATCH_POKEMON, SAVE_POKEMON, RELEASE_POKEMON} from "../constants/ActionTypes";

const INIT_STATE = {
  list: [],
  owned: [],
  detail: null,
  caught: null,
  params: {
    limit: 10,
    offset: 0
  }
};

const Pokemon = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_POKEMON:
      return {...state, list: [...state.list, ...action.payload], params: {...state.params, offset: action.offset}};
    case GET_ONE_POKEMON:
      return {...state, detail: action.payload};
    case CATCH_POKEMON:
      return {...state, caught: action.payload};
    case SAVE_POKEMON:
      return {...state, caught: INIT_STATE.caught, owned: state.caught ? [...state.owned, action.payload] : state.owned};
    case RELEASE_POKEMON:
      return {
        ...state, owned: state.owned.filter(({name, nickname}) => name !== action.name || nickname !== action.nickname)
      };
    default:
      return state;
  }
};

export default Pokemon;