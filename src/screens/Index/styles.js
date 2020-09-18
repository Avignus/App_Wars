import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: { 
        height: '40%', 
        backgroundColor: 'transparent',
        alignItems: 'center', 
        justifyContent: 'flex-end'
    },
    titleStyle: { 
        fontFamily: 'Montserrat-Medium',
        fontSize: 30,
        color: 'white',
    },
    options: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: windowWidth * 6, 
        backgroundColor: 'transparent'
    },
    buttonOptions: {
        marginTop: 8,
        backgroundColor: 'rgba(90, 90, 90, 0.8)',
        width: windowWidth - 40,
        paddingLeft: 20,
        height: '30%', 
        justifyContent: 'center',
        borderWidth: 0.8, 
        borderColor: 'white',
        borderRadius: 14
    },
    listContainer: { 
        backgroundColor: 'transparent',
        flexDirection: 'row',
        height: '100%',
    },
    listItem: { 
        fontFamily: 'Montserrat-Medium',
        fontSize: 24,
        color: 'gold',
        textAlign: 'center'
    },
    information: { 
        color: 'white'
    },
    label: { 
        color: 'orange'
    }
})

export default styles;