import { auth } from "../../firebaseConfig";
import CreateDataContext from "./CreateDataContext";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return { ...state, user: action.payload };
        case 'signout':
            return { ...state, user: null };
        default:
            return state;
    }
};

const signIn = dispatch => async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        dispatch({ type: 'signin', payload: response.user });
    } catch (err) {
        throw new Error(err.message);
    }
};

const signUp = dispatch => async (email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({ type: 'signin', payload: response.user });
    } catch (err) {
        throw new Error(err.message);
    }
};

const signOut = dispatch => async () => {
    try {
        await auth.signOut();
        dispatch({ type: 'signout' });
    } catch (err) {
        console.error(err);
    }
};

const authActions = {
    signIn,
    signUp,
    signOut
};

const initialAuthState = {
    user: null
};

export const { Context, Provider } = CreateDataContext(authReducer, authActions, initialAuthState);

