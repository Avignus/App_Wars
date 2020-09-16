import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
const Splash = (props) => { 
    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('Index')
        }, 3000);
    }) 
    
    return(
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/app-wars.jpg')}/>
        </View>        
    )
}

export default Splash;