import CreateDataContext from "./CreateDataContext";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const reducer = (state, action) =>{
    switch (action.type){
      case 'fetch_categories':
        return action.payload;
      case 'add_category':
        return [
          ...state,
          {
            id: action.payload.id,
            title: action.payload.title,
          },
        ];
        default:
            return state;
    }
};

const fetchCategories = dispatch => async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
  }));
  dispatch({ type: 'fetch_categories', payload: categories });
};

const addCategory = dispatch => async (title) => {
  const docRef = await addDoc(collection(db, "categories"), {
      title
  });
  dispatch({ type: 'add_category', payload: { id: docRef.id, title } });
};


const catActions = {
    fetchCategories,
    addCategory,
    
};

export const {Context,Provider} = CreateDataContext(reducer,catActions,[]);