import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { ProgressBar } from 'react-native-paper';  // Import ProgressBar
import * as DocumentPicker from 'expo-document-picker';
import { addDoc, collection } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import commonStyles from '../styles/Common';

const ContentUploadScreen = ({ navigation }) => {
    const categoryId = navigation.getParam('categoryId');
    const type = navigation.getParam('type');
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const pickDocument = async () => {
        try {
            const allowedTypes = type === 'article' ? 'application/pdf' : ['video/mp4', 'video/quicktime'];

            let result = await DocumentPicker.getDocumentAsync({
                type: allowedTypes,
                copyToCacheDirectory: true
            });

            console.log('Document Picker Result:', result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const { uri, name, size, mimeType } = result.assets[0];
                const fileName = name || uri.split('/').pop();
                console.log('Selected file:', { uri, name: fileName, size, mimeType });

                if (type === 'article' && mimeType !== 'application/pdf') {
                    Alert.alert("Error", "הקובץ חייב להיות בפורמט PDF");
                    return;
                }

                if (type === 'video' && !['video/mp4', 'video/quicktime'].includes(mimeType)) {
                    Alert.alert("Error", "הקובץ שנבחר אינו נתמך");
                    return;
                }

                setFile({ uri, name: fileName, size, mimeType });
            } 
        } catch (error) {
            console.error("DocumentPicker Error: ", error);
            Alert.alert("Error", "משהו השתבש בזמן בחירת הקובץ");
        }
    };


    const uploadFileToFirebase = async (file) => {
        try {
            const response = await fetch(file.uri);
            const blob = await response.blob();
            const storageRef = ref(storage, `files/${encodeURIComponent(file.name)}`);
            console.log('Uploading to:', `files/${encodeURIComponent(file.name)}`);

            console.log('Starting upload...');
            setIsUploading(true);
            setUploadProgress(0);
            await uploadBytes(storageRef, blob);
            console.log('Upload successful, fetching download URL...');

            const downloadURL = await getDownloadURL(storageRef);
            console.log('File available at:', downloadURL);
            return downloadURL;
        } catch (error) {
            console.error('Upload Error:', JSON.stringify(error, null, 2));
            Alert.alert("Error", "משהו השתבש בזמן ההעלאת הקובץ");
            throw error;
        }
    };

    const uploadContent = async () => {
        if (type === 'qa') {
            if (question && answer) {
                await addDoc(collection(db, "content"), {
                    categoryId,
                    type,
                    question,
                    answer,
                    createdAt: new Date()
                });
                Alert.alert("Success", "הועלה בהצלחה");
            } else {
                Alert.alert("Error", "אנא הכנס שאלה ותשובה");
            }
        } else {
            if (file && title) {
                const fileUri = await uploadFileToFirebase(file);
                await addDoc(collection(db, "content"), {
                    categoryId,
                    type,
                    title,
                    fileUri,
                    fileName: file.name,
                    createdAt: new Date()
                });
                Alert.alert("Success", "הקובץ הועלה בהצלחה");
            } else {
                Alert.alert("Error", "אנא הכנס כותרת וקובץ");
            }
        }
        navigation.navigate('Upload');
    };

    return (
        <View style={commonStyles.container}>
            {type === 'qa' ? (
                <>
                    <TextInput
                        placeholder="שאלה"
                        value={question}
                        onChangeText={setQuestion}
                        style={commonStyles.input}
                    />
                    <TextInput
                        placeholder="תשובה"
                        value={answer}
                        onChangeText={setAnswer}
                        style={commonStyles.input}
                    />
                </>
            ) : (
                <>
                    <TextInput
                        placeholder="כותרת"
                        value={title}
                        onChangeText={setTitle}
                        style={commonStyles.input}
                    />
                    <TouchableOpacity style={commonStyles.button} onPress={pickDocument}>
                        <Text style={commonStyles.buttonText}>בחירה מקבצים</Text>
                    </TouchableOpacity>
                    {file && (
                        <View>
                            <Text>הקובץ שנבחר: {file.name}</Text>
                        </View>
                    )}
                    {isUploading && (
                        <View style={styles.progressContainer}>
                            <Text>Uploading... {uploadProgress.toFixed(2)}%</Text>
                            <ProgressBar progress={uploadProgress / 100} />
                        </View>
                    )}
                </>
            )}
            <TouchableOpacity style={commonStyles.button} onPress={uploadContent}>
                <Text style={commonStyles.buttonText}>העלה תוכן</Text>
            </TouchableOpacity>
        </View>
    );
};

ContentUploadScreen.navigationOptions = ({ navigation }) => {
    const categoryTitle = navigation.getParam('categoryTitle');
    return {
        title: categoryTitle,
        headerStyle: {
            backgroundColor: '#E0F7FA', // Matching the background color
        },
        headerTintColor: '#00796B',
    };
};

const styles = StyleSheet.create({
    progressContainer: {
        marginVertical: 10,
    },
});

export default ContentUploadScreen;
