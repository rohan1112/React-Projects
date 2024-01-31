import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function FakeAuthContext({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(userData) {
    // simulate a server response with a delay of 500ms
    setTimeout(() => {
      if (
        FAKE_USER.email === userData.email &&
        FAKE_USER.password === userData.password
      ) {
        dispatch({ type: "LOGIN", payload: FAKE_USER });
      } else {
        alert("Wrong credentials");
      }
    }, 500);
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useFakeAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Cannot use without provider");
  }
  return context;
}

export default FakeAuthContext;
export { useFakeAuth };
