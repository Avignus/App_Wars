import React from 'react';
import { Transition } from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import SplashScreen from './screens/Splash/Splash';
import Index from './screens/Index/Index';
import Detail from './screens/Detail/Detail';
import DetailCharacter from './screens/Detail/DetailCharacter/DetailCharacter';
import DetailPlanets from './screens/Detail/DetailPlanets/DetailPlanets';
import DetailStarships from './screens/Detail/DetailStarships/DetailStarships';
import DetailVehicles from './screens/Detail/DetailVehicles/DetailVehicles';
import DetailSpecies from './screens/Detail/DetailSpecies/DetailSpecies';
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator 
            initialRouteName="Splash"
            headerMode="none"
        >
            <Stack.Screen 
                name="Splash"
                component={SplashScreen}
            />
            <Stack.Screen 
                name="Index"
                component={Index}
            />
            <Stack.Screen
                name="DetailCharacter"
                component={DetailCharacter}
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
            />
            <Stack.Screen 
                name="DetailPlanet"
                component={DetailPlanets}
            />
            <Stack.Screen 
                name="DetailStarship"
                component={DetailStarships}
            />
            <Stack.Screen 
                name="DetailVehicles"
                component={DetailVehicles}
            />
            <Stack.Screen 
                name="DetailSpecies"
                component={DetailSpecies}
            />
        </Stack.Navigator>
    )
}
// const Routes = createStackNavigator({
//     Splash: { screen: SplashScreen },
//     Index: { screen: Index },
//     Detail: { screen: Detail }  
// }, {
//     initialRouteName: 'Splash',
//     headerMode: 'none',
//     navigationOptions: { 
//         headerVisible: false
//     }, 
//     transition: ( 
//         <Transition.Together>
//             <Transition.Out
//                 type="fade"
//                 durationMs={0}
//                 interpolation="easeIn"
//             />
//                 <Transition.In type="fade" durationMs={0} />
//         </Transition.Together>
//     )
// })



export default MyStack;