import React ,{useContext,useState} from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Alert} from "react-native";
import { Context as CategoryContext } from "../context/CategoryContext";
import Popup from "../window/Popup";
import { AntDesign } from '@expo/vector-icons';
import commonStyles from "../styles/Common";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";



const UploadScreen = ({navigation}) => {
    const {state, addCategory} =useContext(CategoryContext);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };
    
    const closeModal = async (title) => {
        if (title == '')
            setModalVisible(false);
        else {
            const exists = await checkIfCategoryExists(title);
            if (exists) {
                Alert.alert('Error', 'הקטגוריה כבר קיימת');
            } else {
                addCategory(title);
            }
            setModalVisible(false);
        }
    };

    const checkIfCategoryExists = async (title) => {
        const q = query(collection(db, "categories"), where("title", "==", title));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    const navigateToContentTypeSelection = (categoryId, categoryTitle) => {
        navigation.navigate('ContentTypeSelection', { categoryId, categoryTitle});
    };


    return (
        <View style ={commonStyles.container}>
            <Text style={commonStyles.title}>בחר קטגוריה</Text>
            <FlatList
                data={state}
                keyExtractor={(category)=> category.id}
                numColumns={2}
                renderItem={({item})=>{
                    return (
                        <TouchableOpacity style={styles.categoryButton} onPress={() => navigateToContentTypeSelection(item.id, item.title)}>
                            <Text style={styles.categoryButtonText}>{item.title}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
            <TouchableOpacity style={styles.addButton} onPress={openModal}>
                <AntDesign name="pluscircleo" size={24} color="white" />
            </TouchableOpacity>
            <Popup visible={modalVisible} onClose={closeModal} />
        </View>
    );
};

UploadScreen.navigationOptions =({navigation})=>{
    return{
        headerLeft: ()=> (
            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={()=>(navigation.navigate('Main'))}
            >
                <AntDesign name="logout" size={24} color="#00796B" />
            </TouchableOpacity>
        ),
        headerStyle: {
            backgroundColor: '#E0F7FA', // Matching the background color
            borderBottomWidth: 0,
        },
        headerTintColor: '#00796B',
        
    };
};



const styles = StyleSheet.create({
    logoutButton: {
        marginLeft: 25, // Adjust this value to move the button right or left
    },
    categoryButton: {
        flex: 1,
        margin: 10,
        padding: 20,
        backgroundColor: '#00796B',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    categoryButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#2A9D8F',
        padding: 15,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
});

export default UploadScreen;
