import React ,{useContext, useEffect,useState} from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity} from "react-native";
import { Context as CategoryContext} from "../context/CategoryContext";
import { Context as AuthContext } from "../context/AuthContext";
import { AntDesign } from '@expo/vector-icons';
import { withNavigationFocus } from "react-navigation";
import commonStyles from "../styles/Common";
import { SearchBar } from 'react-native-elements';




const MainScreen = ({isFocused, navigation}) => {
    const {state, fetchCategories} =useContext(CategoryContext);
    const {signOut} = useContext(AuthContext);
    const [search, setSearch] = useState('');
    const [filteredCategories, setFilteredCategories] = useState(state);

    
    useEffect(()=>{
        if (isFocused) {
            signOut();
            fetchCategories();
        }
    }, [isFocused]);

    useEffect(() => {
        setFilteredCategories(
            state.filter(category =>
                category.title.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, state]);
    
    return (
        <View style={commonStyles.container}>
            <SearchBar
                placeholder="חפש קטגוריה..."
                onChangeText={setSearch}
                value={search}
                lightTheme
                round
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInputContainer}
                inputStyle={styles.searchInput}
            />
            <FlatList
                data={filteredCategories}
                keyExtractor={(category)=> category.id}
                numColumns={2}
                renderItem={({item})=>{
                    return (
                        <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Content', { categoryId: item.id, categoryTitle: item.title })}>
                            <Text style={styles.categoryButtonText}>{item.title}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

MainScreen.navigationOptions =({navigation})=>{
    return{
        headerLeft: ()=> (
            <TouchableOpacity 
                style={styles.loginButton}
                onPress={()=>(navigation.navigate('Login'))}
            >
                <AntDesign name="login" size={24} color="#00796B" />
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
    loginButton: {
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
    searchContainer: {
        backgroundColor: '#E0F7FA',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        padding: 10,
    },
    searchInputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    searchInput: {
        color: '#00796B',
        textAlign: 'right',
    },
});

export default withNavigationFocus(MainScreen);