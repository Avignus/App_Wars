import React, { useState } from 'react'
import { View, Text } from 'react-native';

const DetailCharacter = ({route}) => {
    const [characterDetail, setCharacterDetail] = useState(route.params.character);

    console.log(characterDetail);
    const formatHeight = (height) => {
        let part1 = height.slice(0, 1);
        let part2 = height.slice(1, 3);
        return part1 + ', ' + part2;
        
    }
    return (
        <View>
            <Text>Detalhes do personagem</Text>
            <Text>Nome: {characterDetail.name}</Text>
            <Text>Altura: {formatHeight(characterDetail.height)}</Text>
        </View>
    )
}

export default DetailCharacter;