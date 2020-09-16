import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Detail = ( {route, navigation} ) => {
    const [movie, setMovie] = useState({});
    const [characters, setCharacters] = useState([]);
    useEffect(() => {
        fetchCharacters(route)
    }, [])
    const getCharactersUrl = (id) => `http://swapi.dev/api/people/${id}/`
    const fetchCharacters = (route) => {
        const movie = route.params.movieSelected
        let listOfCharacters = [];
        const charactersPromises = [];

        for (let i = 1; i <= movie.characters.length; i++) {
            charactersPromises.push(fetch(getCharactersUrl(i)).then(response => response.json()));
        }
        Promise.all(charactersPromises)
            .then((response) => response.forEach(function(character) {
                listOfCharacters.push(character);
            }))
            .then(() => setCharacters(listOfCharacters))
    }
    console.log(route);
    // const handleNavigation = () => {
    //     props.navigation.navigate('DetailCharacter')
    // }

    return (
        <View>
            <Text>Rota de detalhes</Text>
                <Text>Teste de personagens</Text>
                {characters.map((character, index) => (
                    <TouchableOpacity style={{marginTop: 10}} key={index} onPress={() => navigation.navigate('DetailCharacter', {
                        character: character
                    })}>
                        <Text>{character.name}</Text>
                    </TouchableOpacity>                    
                ))}
        </View>
    )
}

