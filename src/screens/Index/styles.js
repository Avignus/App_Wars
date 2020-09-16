import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: { 
        height: 50, 
        backgroundColor: 'blue',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    titleStyle: { 
        fontFamily: 'Montserrat-Medium',
        fontSize: 30
    },
    options: { 
        alignItems: 'center', 
        width: '100%', 
        flex: 1,
        backgroundColor: 'orange'
    },
    buttonOptions: {
        marginTop: 8,
        backgroundColor: 'lightblue',
        width: 170,
        height: 163,
        borderRadius: 18,
        paddingLeft: 20
    },
    listContainer: { 
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    listItem: { 
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        textAlign: 'center'
    }
})

export default styles;