import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import { Provider as CategoryProvider } from "./src/context/CategoryContext";
import { Provider as AuthProvider} from './src/context/AuthContext';
import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/LoginScreen";
import PasswordScreen from "./src/screens/PasswodsScreen";
import UploadScreen from "./src/screens/UploadScreen";
import ContentScreen from "./src/screens/ContentScreen";
import ContentTypeSelectionScreen from "./src/screens/ContentTypeSelectionScreen";
import ContentUploadScreen from "./src/screens/ContentUploadScreen";
import ContentViewScreen from "./src/screens/ContentViewScreen";


const navigator = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: {
        headerTitle: 'ראשי'
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerTitle: 'כניסת משתמשים'
      }
    },
    Password: {
      screen: PasswordScreen,
      navigationOptions: {
        headerTitle: 'סיסמה'
      }
    },
    Upload: {
      screen: UploadScreen,
      navigationOptions: {
        headerTitle: ''
      }
    },
    Content: ContentScreen, 
    ContentTypeSelection: ContentTypeSelectionScreen,
    ContentUpload: ContentUploadScreen,
    ContentView: ContentViewScreen,
  },
  {
    initialRouteName:'Main',
    defaultNavigationOptions: { 
      
    }
  }
);
const App = createAppContainer(navigator);

export default () => {
  return <AuthProvider>
    <CategoryProvider>
        <App/>
    </CategoryProvider>
  </AuthProvider>
};


