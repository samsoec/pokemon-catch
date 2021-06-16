import {GET_ALL_POKEMON, GET_ONE_POKEMON, CATCH_POKEMON, SAVE_POKEMON, RELEASE_POKEMON} from '../../constants/ActionTypes';
import reducer from '../../reducers/Pokemon';

describe('todos reducer', () => {

  it('should return initial state', function () {
    expect(reducer(undefined, {})).toEqual({
      list: [],
      owned: [],
      detail: null,
      caught: null,
      params: {
        limit: 10,
        offset: 0
      }
    })
  });

  it('should handle GET_ALL_POKEMON', function () {
    expect(reducer(undefined, {type: GET_ALL_POKEMON, payload: [{name: 'charizard'}], offset: 10})).toEqual({
      list: [{name: 'charizard'}],
      owned: [],
      detail: null,
      caught: null,
      params: {
        limit: 10,
        offset: 10
      }
    })
  });

  it('should handle GET_ONE_POKEMON', function () {
    expect(reducer(undefined, {type: GET_ONE_POKEMON, payload: {name: 'charizard'}})).toEqual({
      list: [],
      owned: [],
      detail: {name: 'charizard'},
      caught: null,
      params: {
        limit: 10,
        offset: 0
      }
    })
  });

  it('should handle CATCH_POKEMON', function () {
    expect(reducer(undefined, {type: CATCH_POKEMON, payload: {name: 'charizard'}})).toEqual({
      list: [],
      owned: [],
      detail: null,
      caught: {name: 'charizard'},
      params: {
        limit: 10,
        offset: 0
      }
    })
  });

  it('should handle SAVE_POKEMON', function () {
    expect(reducer({
      list: [],
      owned: [],
      detail: null,
      caught: {name: 'charizard'},
      params: {
        limit: 10,
        offset: 0
      }
    }, {
      type: SAVE_POKEMON,
      payload: {name: 'charizard', nickname: 'dragon'}
    })).toEqual({
      list: [],
      owned: [{name: 'charizard', nickname: 'dragon'}],
      detail: null,
      caught: null,
      params: {
        limit: 10,
        offset: 0
      }
    })
  });

  it('should handle RELEASE_POKEMON', function () {
    expect(reducer({
      list: [],
      owned: [{name: 'charizard', nickname: 'dragon'}],
      detail: null,
      caught: null,
      params: {
        limit: 10,
        offset: 0
      }
    }, {
      type: RELEASE_POKEMON,
      name: 'charizard', nickname: 'dragon'
    })).toEqual({
      list: [],
      owned: [],
      detail: null,
      caught: null,
      params: {
        limit: 10,
        offset: 0
      }
    })
  });

});