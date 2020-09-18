import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const DetailVehicles = ({route, navigation}) => {
    const [detailVehicle, setVehicleDetail] = useState(route.params.vehicle);
    const [attributes, setAttributes] = useState([]);
    const [values, setValues] = useState([]);
    const [pilots, setPilots] = useState([]);
    const [movies, setMovies] = useState([]);
    const windowWidth = Dimensions.get('window').width;

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


    console.log(pilots, 'pilotos')
    return (
        <ScrollView>
            <View>
                <View style={{justifyContent: 'center', alignItems: 'center', height: '4%', width: windowWidth, backgroundColor: 'transparent'}}>
                    <Text style={{fontSize: 18}}>Detalhes do veículo</Text>
                </View>
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
        </ScrollView>
    )
}

export default DetailVehicles;