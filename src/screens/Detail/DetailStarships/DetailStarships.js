import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';


const DetailStarship = ({route, navigation}) => {
    const [starshipDetail] = useState(route.params.starship)
    const [attributes, setAttributes] = useState([]);
    const [values, setValues] = useState([]);
    const [pilots, setPilots] = useState([]);
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getData()
        fetchPilots()
        fetchMovies()
        console.log(starshipDetail, 'detalhes da nave');
    }, [])
    const getData = () => {
        
       let attributes = Object.keys(starshipDetail);
       let attrFiltered = attributes.slice(0, 13);
       
       let values = Object.values(starshipDetail);
       let valuesFiltered = values.slice(0, 13);
       setAttributes(attrFiltered);
       setValues(valuesFiltered);

    }
    const fetchPilots = async() => {
        const pilots = starshipDetail.pilots
        let listOfPilots = [];
        const pilotsPromises = [];
        for (let i = 0; i < pilots.length; i++) {
            pilotsPromises.push(fetch(pilots[i]).then(response => response.json()))
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
        const movies = starshipDetail.films;
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
                    style={{marginTop: 10, paddingLeft: 20}}
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

    console.log(pilots, 'pilotos de nave')

    const labelStyle = {
        paddingLeft: 5,
        paddingTop: 5,
        color: 'black', 
        fontSize: 15,
        backgroundColor: '#E9D437', 
        width: '100%', 
        height: 40, 
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
        width: '100%', 
        height: 40, 
        borderWidth: 0.5, 
        borderColor: 'black', 
        marginTop: 10
    }

    return (
        <ScrollView>
            {/* <Text>Detalhes da nave</Text>
            <Text>Nome: {starshipDetail.name}</Text>
            <Text>Modelo: {starshipDetail.model}</Text>
            <Text>Fabricante: {starshipDetail.manufacturer}</Text>
            <Text>Custo em créditos: {starshipDetail.cost_in_credits}</Text>
            <Text>Largura: {starshipDetail.length}</Text>
            <Text>Velocidae máxima na atmosfera: {starshipDetail.max_atmosphering_speed}</Text>
            <Text>Grupo: {starshipDetail.crew}</Text>
            <Text>Capacidade de passageiros: {starshipDetail.passengers}</Text>
            <Text>Capacidade: {starshipDetail.cargo_capacity}</Text>
            <Text>Consumíveis: {starshipDetail.consumables}</Text>
            <Text>Rating hyperdrive: {starshipDetail.hyperdrive_rating}</Text>
            <Text>MGLT: {starshipDetail.MGLT}</Text>
             */}
             <Text style={{fontSize: 18, textAlign: 'center'}}>Detalhes da nave</Text>
            <View style={{backgroundColor: 'transparent', flexDirection: 'row', width: '100%'}}>
                <View style={{width: '50%'}}>
                    {attributes.map((item, index) => (
                        <Text style={labelStyle} key={index}>{item}</Text>
                        ))}
                </View>
                <View style={{width: '50%'}}>
                    {values.map((item, index) => (
                        <Text style={textStyle} key={index}>{item}</Text> 
                    ))}
                </View>
            </View>
            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', width: '100%'}}>
                <Text style={{fontSize: 18, paddingLeft: 10}}>Pilotos</Text>
                {getPilots()}
            </View>
            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', width: '100%'}}>
                <Text style={{paddingLeft: 10, fontSize: 18}}>Filmes</Text>
                {getMovies()}
            </View>
        </ScrollView>
    )
}

export default DetailStarship;