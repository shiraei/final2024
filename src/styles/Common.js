import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#E0F7FA', // Soft, calming background color
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 16,
        color: '#00796B', // Darker teal for titles
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#004D40', // Darker teal for section titles
    },
    input: {
        borderColor: '#B2DFDB', // Light border color
        borderWidth: 1,
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    button: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#00796B', // Uniform button color
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#B2DFDB',
        backgroundColor: '#FFFFFF',
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00796B',
    },
    errorText: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
    answerText: {
        fontSize: 16,
        color: '#004D40',
        marginTop: 8,
    },
});

export default commonStyles;
