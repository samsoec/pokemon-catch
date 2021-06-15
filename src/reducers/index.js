import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import UI from './UI';
import Pokemon from './Pokemon';

const Reducers = (history) => combineReducers({
  router: connectRouter(history),
  ui: UI,
  pokemon: Pokemon
});

export default Reducers;