import React, { useState, useContext , useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { withNavigationFocus } from "react-navigation";
import commonStyles from '../styles/Common';


const LoginScreen = ({navigation, isFocused}) => {
  const {signIn, signUp, signOut } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  useEffect(()=>{
    if (isFocused) {
        signOut();
    }
}, [isFocused]);

  const handleSignIn = async () => {
    try {
      setError('');
      await signIn(email, password);
      if (error == '')
        navigation.navigate('Password');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      setError('');
      await signUp(email, password);
      if (error == '')
        navigation.navigate('Password');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={commonStyles.container}>
      {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}
      <TextInput
        style={commonStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={commonStyles.button} onPress={handleSignIn}>
          <Text style={commonStyles.buttonText}>התחברות</Text>
      </TouchableOpacity>
      <TouchableOpacity style={commonStyles.button} onPress={handleSignUp}>
          <Text style={commonStyles.buttonText}>הרשמה</Text>
      </TouchableOpacity>
    </View>
  );
};

LoginScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#E0F7FA', // Matching the background color
  },
  headerTintColor: '#00796B',
};


export default withNavigationFocus(LoginScreen);

