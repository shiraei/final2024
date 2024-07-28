import React from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Video } from 'expo-av';
import commonStyles from '../styles/Common';

const ContentViewScreen = ({ navigation }) => {
    const content = navigation.getParam('content');
    console.log('Content:', content);



    const renderContent = () => {
        if (content.type === 'article' && content.fileUri) {
            const pdfUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(content.fileUri)}`;
            console.log('PDF URL:', pdfUrl);
            return (
                <WebView
                    originWhitelist={['*']}
                    source={{ uri: pdfUrl }}
                    style={{ flex: 1 }}
                    onError={() => {
                        Alert.alert('Error', "שגיאה בטעינת התוכן");
                    }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState
                    renderLoading={() => <ActivityIndicator color='blue' size='large' />}
                />
            );
        } else if (content.type === 'video' && content.fileUri) {
            console.log('Loading video:', content.fileUri);
            return (
                <Video
                    source={{ uri: content.fileUri }}
                    style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    onError={() => {
                        Alert.alert('Error', "שגיאה בטעינת התוכן");
                    }}
                />
            );
        } else {
            return (
                <View style={commonStyles.errorContainer}>
                    <Text style={commonStyles.errorText}>לא נמצא תוכן להצגה</Text>
                </View>
            );
        }
    };

    return (
        <View style={commonStyles.container}>
            {renderContent()}
        </View>
    );
};

ContentViewScreen.navigationOptions = ({navigation})=>{
    const content = navigation.getParam('content');

    return {
        title: content.title,
        headerStyle: {
            backgroundColor: '#E0F7FA', // Matching the background color
        },
        headerTintColor: '#00796B',
    };
}

const styles = StyleSheet.create({
    
    video: {
        flex: 1,
        width: '100%',
    },
    
    
});

export default ContentViewScreen;
