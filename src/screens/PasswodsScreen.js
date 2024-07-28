import React, { useState} from 'react';
import { View, Text, TextInput,TouchableOpacity } from 'react-native';
import commonStyles from '../styles/Common';

const PasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleCheckPassword = () => {
    const storedPassword = 'Hadassa2024'; // Replace with the actual password you have stored

    if (password === storedPassword) {
      navigation.navigate('Upload');
    } else {
      setError('סיסמה שגויה');
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>הכנס סיסמה</Text>
      {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}
      <TextInput
        style={commonStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={commonStyles.button} onPress={handleCheckPassword}>
          <Text style={commonStyles.buttonText}>המשך</Text>
      </TouchableOpacity>
    </View>
  );
};

PasswordScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#E0F7FA', // Matching the background color
  },
  headerTintColor: '#00796B',
};


export default PasswordScreen;
