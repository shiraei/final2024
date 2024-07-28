import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import commonStyles from '../styles/Common';

const ContentTypeSelectionScreen = ({ navigation }) => {
    const categoryId = navigation.getParam('categoryId');
    const categoryTitle = navigation.getParam('categoryTitle');

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>בחר סוג תוכן</Text>
            <TouchableOpacity
                style={commonStyles.button}
                onPress={() => navigation.navigate('ContentUpload', { categoryId, categoryTitle, type: 'qa' })}
            >
                <Text style={commonStyles.buttonText}>שאלה ותשובה</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={commonStyles.button}
                onPress={() => navigation.navigate('ContentUpload', { categoryId, categoryTitle, type: 'article' })}
            >
                <Text style={commonStyles.buttonText}>מאמר</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={commonStyles.button}
                onPress={() => navigation.navigate('ContentUpload', { categoryId, categoryTitle, type: 'video' })}
            >
                <Text style={commonStyles.buttonText}>וידאו</Text>
            </TouchableOpacity>
        </View>
    );
};

ContentTypeSelectionScreen.navigationOptions = ({ navigation }) => {
    const categoryTitle = navigation.getParam('categoryTitle');
    return {
        title: categoryTitle,
        headerStyle: {
            backgroundColor: '#E0F7FA', // Matching the background color
        },
        headerTintColor: '#00796B',
    };
};

export default ContentTypeSelectionScreen;


