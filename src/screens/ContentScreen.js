import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import commonStyles from '../styles/Common';

const ContentScreen = ({ navigation }) => {
    const categoryId = navigation.getParam('categoryId');

    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [qas, setQas] = useState([]);
    const [visibleAnswers, setVisibleAnswers] = useState({});

    useEffect(() => {
        const fetchContent = async () => {
            const q = query(collection(db, "content"), where("categoryId", "==", categoryId));
            const querySnapshot = await getDocs(q);
            const allContent = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setArticles(allContent.filter(item => item.type === 'article'));
            setVideos(allContent.filter(item => item.type === 'video'));
            setQas(allContent.filter(item => item.type === 'qa'));
        };
        fetchContent();
    }, [categoryId]);

    const toggleAnswerVisibility = (id) => {
        setVisibleAnswers(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const navigateToContentView = (content) => {
        navigation.navigate('ContentView', { content });
    };

    const renderSectionHeader = (title) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    return (
        <View style={commonStyles.container}>
            {articles.length > 0 && (
                <>
                    {renderSectionHeader('מאמרים')}
                    <FlatList
                        data={articles}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigateToContentView(item)} style={styles.itemContainer}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}
            {videos.length > 0 && (
                <>
                    {renderSectionHeader('סרטונים')}
                    <FlatList
                        data={videos}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigateToContentView(item)} style={styles.itemContainer}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}
            {qas.length > 0 && (
                <>
                    {renderSectionHeader('שאלות נפוצות')}
                    <FlatList
                        data={qas}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => toggleAnswerVisibility(item.id)}>
                                    <Text style={styles.itemTitle}>{item.question}</Text>
                                </TouchableOpacity>
                                {visibleAnswers[item.id] && (
                                    <Text style={styles.answerText}>{item.answer}</Text>
                                )}
                            </View>
                        )}
                    />
                </>
            )}
        </View>
    );
};

ContentScreen.navigationOptions = ({ navigation }) => {
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
    sectionHeader: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#00796B',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    itemContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00796B',
    },
    answerText: {
        fontSize: 16,
        color: '#004D40',
        marginTop: 8,
    },
});

export default ContentScreen;
