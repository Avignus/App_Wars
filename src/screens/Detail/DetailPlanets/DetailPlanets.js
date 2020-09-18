import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const DetailPlanet = ({route, navigation}) => {
    const [planetDetail, setPlanetDetail] = useState(route.params.planet);
    const [residents, setResidents] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const windowWidth = Dimensions.get('window').width;

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
                    style={{marginTop: 2}}
                    key={index}
                    onPress={() => navigation.navigate('DetailCharacter', {
                        character: resident
                    })}
                >
                    <Text style={{fontSize: 18, color: '#E9D437'}}>{resident.name} (Detalhar)</Text>
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
                    <Text style={{fontSize: 18, color: '#E9D437'}}>{movie.title} (Detalhar)</Text>
                </TouchableOpacity>
            ))
        )
    }

    const rowContainer = {
        justifyContent: 'center', 
        flexDirection: 'row', 
        width: windowWidth, 
        backgroundColor: 'transparent'
    }
    const labelStyle = {
        paddingLeft: 5,
        paddingTop: 5,
        color: 'black', 
        fontSize: 15,
        backgroundColor: '#E9D437', 
        width: '50%', 
        height: 30, 
        borderWidth: 0.5, 
        borderColor: 'black', 
        marginTop: 10
    }
    const textStyle = {
        paddingLeft: 5,
        paddingTop: 5,
        color: 'black', 
        fontSize: 15,
        backgroundColor: 'lightblue', 
        width: '50%', 
        height: 30, 
        borderWidth: 0.5, 
        borderColor: 'black', 
        marginTop: 10
    }

    return (
        <ScrollView>
            <View>
                <View style={{justifyContent: 'center', alignItems: 'center', height: '4%', width: windowWidth, backgroundColor: 'transparent'}}>
                    <Text style={{fontSize: 18}}>Detalhes do planeta</Text>
                </View>
                <View style={{ justifyContent: 'space-around', height: '96%', width: windowWidth, backgroundColor: 'transparent'}}>
                    <View style={rowContainer}>
                        <Text style={labelStyle}>Nome: </Text>
                        <Text style={textStyle}>{planetDetail.name}</Text>
                    </View>
                    <View style={rowContainer}>
                        <Text style={labelStyle}>Tempo de rotação:</Text>
                        <Text style={textStyle}>{planetDetail.rotation_period} dias</Text>
                    </View>
                    <View style={rowContainer}>
                        <Text style={labelStyle}>Diâmetro:</Text>
                        <Text style={textStyle}>{planetDetail.diameter}</Text>
                    </View>
                    <View style={rowContainer}>
                        <Text style={labelStyle}>Clima:</Text>
                        <Text style={textStyle}>{planetDetail.climate}</Text>
                    </View>
                    <View style={rowContainer}>
                        <Text style={labelStyle}>Tempo de rotação:</Text>
                        <Text style={textStyle}>{planetDetail.rotation_period} dias</Text>
                    </View>
                    <View style={rowContainer}>
                        <Text style={labelStyle}>Terreno: </Text>
                        <Text style={textStyle}>{planetDetail.terrain}</Text>
                    </View>
                    <View style={rowContainer}>
                        <Text style={labelStyle}>Superfície de água: </Text>
                        <Text style={textStyle}>{planetDetail.surface_water}</Text>
                    </View>
                    <View style={rowContainer}>
                        <Text style={labelStyle}>População: </Text>
                        <Text style={textStyle}>{planetDetail.population}</Text>
                    </View>
                    <Text style={{fontSize: 18}}>Moradores</Text>
                    <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', width: '100%'}}>
                        {getResidents()}
                    </View>
                    <Text style={{fontSize: 18}}>Filmes</Text>
                    <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', width: '100%'}}>
                        {getMovies()}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailPlanet;