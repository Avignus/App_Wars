import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {LanguageProvider} from 'react-native-translation';
import MyStack from './routes';

function App() {
    return (

        <LanguageProvider language={'pt-BR'}>
            <NavigationContainer>
                <MyStack/>
            </NavigationContainer>
        </LanguageProvider>
    )
}

export default App; 
