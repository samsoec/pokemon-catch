import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import _ from 'lodash';

import {GET_ALL_POKEMON, GET_ONE_POKEMON, CATCH_POKEMON, SAVE_POKEMON, RELEASE_POKEMON} from '../../constants/ActionTypes';
import {getAllPokemon, getPokemonDetail, catchPokemon, savePokemon, releasePokemon} from '../../actions/Pokemon';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('load pokemon list', () => {
  it('loads pokemon list from api provider', () => {
    const params = {limit: 10, offset: 0};

    const expectedAction = {type: GET_ALL_POKEMON};

    const store = mockStore({ list: {} });

    return store.dispatch(getAllPokemon(params)).then(() => {
      expect(_.filter(store.getActions(), expectedAction).length).toBeGreaterThan(0);
    });
  }, 10000)
});

describe('load pokemon detail', () => {
  it('loads pokemon detail from api provider and found', () => {
    const params = {name: 'charizard'};

    const expectedAction = {type: GET_ONE_POKEMON};

    const store = mockStore({ detail: null });

    return store.dispatch(getPokemonDetail(params)).then(() => {
      expect(_.filter(store.getActions(), expectedAction).length).toBeGreaterThan(0);
    });
  }, 10000)

  it('loads pokemon detail from api provider and not found', () => {
    const params = {name: 'whatever'};

    const expectedAction = {type: GET_ONE_POKEMON};

    const store = mockStore({ detail: null });

    return store.dispatch(getPokemonDetail(params)).then(() => {
      expect(_.filter(store.getActions(), expectedAction).length).toBe(0);
    });
  }, 10000)
});

describe('catching pokemon', () => {
  it('should catch pokemon with succeed or failed probability', () => {
    const pokemon = {name: 'charizard'};

    const optionalActions = [
      {type: CATCH_POKEMON, payload: pokemon},
      {type: CATCH_POKEMON, payload: false}
    ];

    const store = mockStore({ pokemon: {} });

    return store.dispatch(catchPokemon(pokemon)).then(() => {
      expect(store.getActions().some(action => optionalActions.find(opt => _.isEqual(opt, action)))).toBe(true);
    });
  }, 10000)
});

describe('saving pokemon', () => {
  it('should create catched pokemon with nickname', () => {
    const nickname = 'fire dragon';
    const pokemon = {name: 'charizard'};

    const expectedActions = {type: SAVE_POKEMON, payload: {...pokemon, nickname}};

    expect(savePokemon(nickname, pokemon)).toEqual(expectedActions);
  })
});

describe('release pokemon', () => {
  it('should remove specific caught pokemon from owned list', () => {
    const pokemon = {name: 'charizard', nickname: 'fire dragon'};

    const expectedActions = {type: RELEASE_POKEMON, ...pokemon};

    expect(releasePokemon(pokemon)).toEqual(expectedActions);
  })
});