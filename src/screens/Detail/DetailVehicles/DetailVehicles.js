import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const DetailVehicles = ({route, navigation}) => {
    const [detailVehicle, setVehicleDetail] = useState(route.params.vehicle);
    const [attributes, setAttributes] = useState([]);
    const [values, setValues] = useState([]);
    const [pilots, setPilots] = useState([]);
    const [movies, setMovies] = useState([]);
    const getData = () => {
        let attributes = Object.keys(detailVehicle); 
        let values = Object.values(detailVehicle);
        let attrFiltered = attributes.slice(0, 12)
        let valuesFiltered = values.slice(0, 12)
        setAttributes(attrFiltered);
        setValues(valuesFiltered);
        console.log(attrFiltered);
    }
    useEffect(() => {
        getData()
        fetchPilots()
        fetchMovies()
    }, [])

    const fetchPilots = async() => {
        const pilots = detailVehicle.pilots
        let listOfPilots = [];
        const pilotsPromises = [];
        for (let i = 0; i < pilots.length; i++) {
            pilotsPromises.push(fetch(pilots[i]).then(response => response.json()).catch(err => console.log(err)))
        }
        Promise.all(pilotsPromises)
            .then(response => response.forEach(function(pilot) {
                listOfPilots.push(pilot)
            }))
            .then(() => setPilots(listOfPilots))
    }
    const getPilots = () => {
        return (
            pilots.map((pilot, index) => (
                <TouchableOpacity
                    key={index}
                >
                    <Text>{pilot.name}</Text>
                </TouchableOpacity>
            ))
        )
    }

    const fetchMovies = async() => {
        let listOfMoviesUrl = [];
        let listOfMovies = [];
        const moviesPromises = [];
        const movies = detailVehicle.films;
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

    console.log(pilots, 'pilotos')
    return (
        <View>
            <Text>
                Detalhes do veículo
            </Text>
            <TouchableOpacity onPress={() => getData()}>
                <Text>Atributos</Text>
            </TouchableOpacity>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <View>
                    {attributes.map((attribute, index) => (
                        <Text key={index}>{attribute}</Text>
                    ))}
                </View>
                <View>
                    {values.map((value, index) => (
                        <Text key={index}>{value}</Text>
                    ))}
                    <Text>Pilotos</Text>
                    {getPilots()}
                    <View style={{backgroundColor: 'purple'}}>
                        <Text>Filmes</Text>
                        {getMovies()}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DetailVehicles;