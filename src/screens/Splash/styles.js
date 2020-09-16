import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor: 'black',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    img: {
        width: '100%',
        height: '100%'
    },
    animatedEllipsis: {
        color: '#cccccc',
        fontSize: 100,
        letterSpacing: -15,
        top: hp('40%'),
    },
})

export default styles;