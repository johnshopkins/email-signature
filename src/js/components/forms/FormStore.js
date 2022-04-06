const { registerStore } = wp.data;

import checkSessionStorage from './utils/checkSessionStorage';
import checkServerData from './utils/checkServerData';

export default function (storeName) {

  const initialState = {};

  const reducer = (state = initialState, action) => {

    switch (action.type) {

      case 'SET_INITIAL_VALUE': {

        const newState = { ...state };

        const sessionData = checkSessionStorage(action.name, action.repeatable);
        const serverData = checkServerData(action.name);

        if (sessionData) {
          newState[action.name] = sessionData;
        } else if (serverData) {
          newState[action.name] = serverData;
        } else {
          newState[action.name] = action.value;
        }

        return { ...state, ...newState };

      }

      case 'UPDATE_VALUE': {

        const newState = { ...state }

        if (action.parent) {
          // element in repeatable
          newState[action.parent.name][action.parent.i][action.name] = action.value;
        } else {
          newState[action.name] = action.value;
        }

        if (Modernizr.sessionstorage) {
          const name = action.parent ? action.parent.name : action.name;
          const value = Array.isArray(newState[name]) ?
            JSON.stringify(newState[name]) :
            newState[name];

          sessionStorage.setItem(name, value);
        }

        return { ...state, ...newState };

      }

      case 'ADD_VALUE': {

        const newState = { ...state };
        newState[action.name].push(action.value);

        return { ...state, ...newState };

      }

      case 'REMOVE_VALUE': {

        let valueToStore;

        const newState = { ...state };

        newState[action.name].splice(action.i, 1);

        if (Modernizr.sessionstorage) {

          valueToStore = JSON.stringify(newState[action.name]);
          sessionStorage.setItem(action.name, valueToStore);
        }

        return { ...state, ...newState };

      }

    }
    return state;
  };

  const actions = {
    addValue(name, value) {
      return {
        type: 'ADD_VALUE',
        name: name,
        value: value
      };
    },
    removeValue(name, i) {
      return {
        type: 'REMOVE_VALUE',
        name: name,
        i: i
      };
    },
    setInitialValue(name, value, repeatable) {
      return {
        type: 'SET_INITIAL_VALUE',
        repeatable: repeatable ? true : false,
        name: name,
        value: value
      };
    },
    updateValue(name, value, parent) {
      return {
        type: 'UPDATE_VALUE',
        parent: parent,
        name: name,
        value: value
      };
    }
  }

  const selectors = {
    getValue(state, name, parent) {
      if (parent) {
        return state[parent.name][parent.i][name] || '';
      } else {
        return state[name] || '';
      }
    },
    getLength(state, name) {
      // used for repeaters
      const value = state[name]
      return Array.isArray(value) ? value.length : null;
    }
  };

  return registerStore(storeName, { reducer, actions, selectors });

};
