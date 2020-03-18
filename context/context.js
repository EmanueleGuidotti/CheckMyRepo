import React, {createContext, useReducer, useContext} from 'react';

const SET_USERNAME = 'SET_USERNAME';
const SET_REPO = 'SET_REPO';

const globalContext = createContext();

const initialState = {
  username: '',
  repo: '',
};

// Global Reducer
const globalReducer = (state, action) => {
  switch (action.type) {
    case SET_REPO:
      return {
        ...state,
        repo: action.payload.repo,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload.username,
      };
    default:
      return state;
  }
};

// App Wrapper
export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  return (
    <globalContext.Provider value={[state, dispatch]}>
      {children}
    </globalContext.Provider>
  );
};

// Global State
const useGlobalState = () => {
  const [state, dispatch] = useContext(globalContext);

  const setUsername = username => {
    dispatch({
      type: SET_USERNAME,
      payload: {username: username},
    });
  };

  const setRepo = repo => {
    dispatch({
      type: SET_REPO,
      payload: {repo: repo},
    });
  };

  return {
    setUsername,
    setRepo,
    state: {...state},
  };
};

export default useGlobalState;
