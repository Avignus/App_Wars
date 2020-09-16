import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
const RenderOption = (props) => { 
    return (
        <TouchableOpacity style={{height: 50, width: 200}} onPress={() => console.log('Apertado')} key={props.index}>
                <Text>{props.item}</Text>
        </TouchableOpacity>
    )
}

export default RenderOption;