import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { TransText } from 'react-native-translation';
import Spinner from 'react-native-loading-spinner-overlay';
const DetailCharacter = ({route, navigation}) => {
    const [characterDetail, setCharacterDetail] = useState(route.params.character);
    const [gender, setGender] = useState('');
    const [homeworld, setHomeworld] = useState({});
    const [movies, setMovies] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(characterDetail);
    useEffect(() => {
        fetchHomeworld();
        fetchMovies(characterDetail);
        fetchVehicles(characterDetail);
        fetchstarships(characterDetail);
        
    }, [])
    const formatHeight = (height) => {
        let part1 = height.slice(0, 1);
        let part2 = height.slice(1, 3);
        return part1 + ', ' + part2;
        
    }
    const genderMale = {
        'en-US' : 'male',
        'pt-BR' : 'Masculino',
    }

    const genderFemale = {
        'en-US' : 'female',
        'pt-BR' : 'feminino'
    }

    const fetchHomeworld = async() => {
        
        const homeworldData = await fetch(characterDetail.homeworld)
        const homeworld = await homeworldData.json();
        setHomeworld(homeworld);
        setLoading(false);
    }

    const getMoviesUrl = (id) => `http://swapi.dev/api/films/${id}`;

    const fetchMovies = async(object) => {
        setLoading(true);
        let listOfMovies = []
        const moviesPromises = []
        for (let i = 1; i <= object.films.length; i++) {
            moviesPromises.push(fetch(getMoviesUrl(i)).then(response => response.json()));
        }
        await Promise.all(moviesPromises)
            .then((response) => response.forEach(function(movie) {
                listOfMovies.push(movie)
            }))
            .then(() => setMovies(listOfMovies))
            .then(setLoading(false))
    }

    const getMovies = () => {
        return (
            movies.map((movie, index) => (
                <TouchableOpacity 
                    key={index}
                    onPress={() => navigation.navigate('Detail', {
                        movieSelected: movie
                    })}
                >
                    <Text>{movie.title}</Text>
                </TouchableOpacity>
            ))
        )
    }

    const getVehiclesUrl = (id) => `http://swapi.dev/api/vehicles/${id}`
    const fetchVehicles = (object) => {
        setLoading(true);
        let listOfVehicles = [];
        const vehiclesPromises = [];
        for (let i = 0; i < object.vehicles.length; i++) {
            console.log(object.vehicles[i], 'veículo');
            vehiclesPromises.push(fetch(object.vehicles[i]).then(response => response.json()))
        }
        Promise.all(vehiclesPromises)
            .then((response) => response.forEach(function(vehicle) {
                listOfVehicles.push(vehicle)
            }))
            .then(() => setVehicles(listOfVehicles))
            .then(() => setLoading(false))
    }
    const getVehicles = (vehicles) => {
        return (
            vehicles.map((vehicle, index) => (
                <TouchableOpacity
                    key={index}> 
                    <Text>{vehicle.name}</Text>
                </TouchableOpacity>
            ))
        )
    }

    const fetchstarships = (object) => {
        setLoading(true);
        let listOfStarships = [];
        const starshipsPromises = [];
        if (object.starships.length > 0) {
            for (let i = 0; i < object.starships.length; i++) {
                starshipsPromises.push(fetch(object.starships[i]).then(response => response.json()))
            }
            Promise.all(starshipsPromises)
                .then((response) => response.forEach(function(starship) {
                    listOfStarships.push(starship)
                }))
                .then(() => setStarships(listOfStarships))
                .then(() => setLoading(false))
        } else {
            return
        }
    }
    console.log(characterDetail, 'veículos');

    const getStarships = () => {
        return (
            starships.map((starship, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('DetailStarship', {
                        starship: starship
                    })}
                >
                    <Text>{starship.name}</Text>
                </TouchableOpacity>
            ))
        )
    }
    return (
        <View>
            {loading ?
            <Spinner visible={loading} color="white"/>
            :
            <View>
                <Text>Detalhes do personagem</Text>
                <Text>Nome: {characterDetail.name}</Text>
                <Text>Altura: {formatHeight(characterDetail.height)}</Text>
                <Text>Gênero: </Text>
                <Text>Cor da pele: </Text>
                <Text>{characterDetail.skin_color}</Text>
                <Text>Cor dos olhos</Text>
                <Text>{characterDetail.eye_color}</Text>
                <Text>Ano de nascimento</Text>
                <Text>{characterDetail.birth_year}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('DetailPlanet', {
                    planet: homeworld
                })}> 
                    <Text>Terra natal: {homeworld.name}</Text>
                </TouchableOpacity>
                <View>
                    <Text>Filmes</Text>
                    {getMovies()}
                </View>
                <View>
                    <Text>Veículos</Text>
                    {getVehicles(vehicles)}
                </View>
                <View>
                    <Text>Naves</Text>
                    {getStarships(starships)}
                </View>
            </View>
        
        }
        </View>
    )
}

export default DetailCharacter;