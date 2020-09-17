import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const DetailPlanet = ({route, navigation}) => {
    const [planetDetail, setPlanetDetail] = useState(route.params.planet);
    const [residents, setResidents] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchResidents()
        fetchMovies()
    }, [])
    
    const getResidentsUrl = (id) => `http://swapi.dev/api/people/${id}/`
    const fetchResidents = async() => {
        let listOfResidentsUrl = [];
        let listOfResidents = [];
        const residentPromises = [];
        const residents = planetDetail.residents;
        residents.map(item => listOfResidentsUrl.push(item)) 
        for (let i = 0; i < listOfResidentsUrl.length; i++) {
            // residentPromises.push(fetch(residents[i]).then(response => response.json()))
            residentPromises.push(fetch(listOfResidentsUrl[i]).then(response => response.json()).catch(err => console.log(err)))
        }
        await Promise.all(residentPromises) 
            .then(response => response.forEach(function(resident) {
                listOfResidents.push(resident)
            }))
            .then(() => setResidents(listOfResidents))
    }
    const getResidents = () => {
        return (
            residents.map((resident, index) => (
                <TouchableOpacity
                    style={{marginTop: 10}}
                    key={index}
                    onPress={() => navigation.navigate('DetailCharacter', {
                        character: resident
                    })}
                >
                    <Text style={{fontSize: 18, color: 'pink'}}>{resident.name}</Text>
                </TouchableOpacity>
            ))
        )
    }

    const fetchMovies = async() => {
        let listOfMoviesUrl = [];
        let listOfMovies = [];
        const moviesPromises = [];
        const movies = planetDetail.films;
        movies.map(movieUrl => listOfMoviesUrl.push(movieUrl))
        for (let i = 0; i < listOfMoviesUrl.length; i++) {
            moviesPromises.push(fetch(listOfMoviesUrl[i]).then(response => response.json()).catch(err => console.log(err)))    
        }
        await Promise.all(moviesPromises)
        .then(response => response.forEach(function(movie) {
            listOfMovies.push(movie)
        }))
        .then(() => setMovies(listOfMovies))
    }

    const getMovies = () => {
        return (
            movies.map((movie, index) => (
                <TouchableOpacity
                    style={{marginTop: 10}}
                    key={index}
                    onPress={() => navigation.navigate('DetailPlanet', {
                        character: movie
                    })}
                >
                    <Text style={{fontSize: 18, color: 'pink'}}>{movie.title}</Text>
                </TouchableOpacity>
            ))
        )
    }

    return (
        <ScrollView>
            {loading ? 
            <Spinner visible={loading} color="white"/>
            :
            <View>
                <Text>Detalhes do planeta</Text>
                <TouchableOpacity onPress={console.log(planetDetail)}>
                </TouchableOpacity>
                <Text>Detalhes</Text>
                <Text>Nome: {planetDetail.name}</Text>
                <Text>Tempo de rotação: {planetDetail.rotation_period} + dias</Text>
                <Text>Diâmetro: {planetDetail.diameter}</Text>
                <Text>Clima: {planetDetail.climate}</Text>
                <Text>Terreno: {planetDetail.terrain}</Text>
                <Text>Superfície de água: {planetDetail.surface_water}</Text>
                <Text>População: {planetDetail.population}</Text>
                <Text>Moradores</Text>
                <View style={{backgroundColor: 'blue', height: 170, width: '100%'}}>
                    {getResidents()}
                </View>
                <Text>Filmes</Text>
                <View style={{backgroundColor: 'orange', height: 170, width: '100%'}}>
                    {getMovies()}
                </View>
            </View>
            }
        </ScrollView>
    )
}

export default DetailPlanet;