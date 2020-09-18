import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { TransText } from 'react-native-translation';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView } from 'react-native-gesture-handler';
const DetailCharacter = ({route, navigation}) => {
    const [characterDetail, setCharacterDetail] = useState(route.params.character);
    const [gender, setGender] = useState('');
    const [homeworld, setHomeworld] = useState({});
    const [movies, setMovies] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(characterDetail);
    const windowWidth = Dimensions.get('window').width;
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
        'pt-BR' : 'Feminino'
    }

    const skinColorJedi = { 
        'en-US' : 'fair',
        'pt-BR': 'justo'
    }

    const skinColorGold = {
        'en-US' : 'gold',
        'pt-BR' : 'Dourado'
    }

    const skinColorWhite = {
        'en-US' : 'white',
        'pt-BR' : 'Branca'
    }

    const skinColorLight = {
        'en-US' : 'light',
        'pt-BR' : 'Clara' 
    }

    const skinColorWhiteBlue = {
        'en-US' : 'white, blue',
        'pt-BR' : 'branco, azul'
    }

    const skinColorWhiteRed = {
        'en-US' : 'white, red',
        'pt-BR' : 'Branco, Vermelho'
    }

    const eyeColorBlue = {
        'en-US' : 'blue',
        'pt-BR' : 'Azul'
    }

    const eyeColorYellow = {
        'en-US' : 'yellow',
        'pt-BR' : 'Amarelo'
    }

    const eyeColorRed = {
        'en-US' : 'red',
        'pt-BR' : 'Vermelho'
    }

    const eyeColorBrown = {
        'en-US' : 'brown',
        'pt-BR' : 'Marrom'
    }

    const eyeColorBlueGray = {
        'en-US' : 'blue-gray',
        'pt-BR' : 'Azul-cinzento'
    }

    const movieFour = { 
        'en-US' : 'A New Hope',
        'pt-BR' : 'Uma Nova Esperança'
    }

    const movieFive = {
        'en-US' : 'The Empire Strikes Back',
        'pt-BR' : 'O Império Contra-ataca'
    }

    const movieSix = {
        'en-US' : 'Return of the Jedi',
        'pt-BR' : 'O Retorno de Jedi' 
    }

    const movieOne = {
        'en-US' : 'The Phantom Menace',
        'pt-BR' : 'A Ameaça Fantasma'
    }

    const movieTwo = {
        'en-US' : 'Attack of the Clones', 
        'pt-BR' : 'Ataque dos Clones'
    }

    const movieThree = {
        'en-US' : 'Revenge of the Sith',
        'pt-BR' : 'A Vingança dos Sith'
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
                <View key={index} style={{backgroundColor: 'transparent', justifyContent: 'flex-start', width: '100%', paddingLeft: 10}}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Detail', {
                            movieSelected: movie
                        })}>
                    {movie.title == 'A New Hope' ?
                        <Text style={{fontSize: 15, color: 'lightblue'}}>
                            <TransText dictionary={movieFour} /> (Detalhar)
                        </Text>
                        :
                    movie.title == 'The Empire Strikes Back' ?
                        <Text style={{fontSize: 15, color: 'lightblue'}}>
                            <TransText dictionary={movieFive} /> (Detalhar)
                        </Text>
                        :
                    movie.title == 'Return of the Jedi' ?
                        <Text style={{fontSize: 15, color: 'lightblue'}}>
                            <TransText dictionary={movieSix} /> (Detalhar)
                        </Text>
                        :
                    movie.title == 'The Phantom Menace' ?
                        <Text style={{fontSize: 15, color: 'lightblue'}}>
                            <TransText dictionary={movieOne} /> (Detalhar)
                        </Text>
                        :
                    movie.title == 'Attack of the Clones' ?
                        <Text style={{fontSize: 15, color: 'lightblue'}}>
                            <TransText dictionary={movieTwo} /> (Detalhar)
                        </Text>
                        :
                    movie.title == 'Revenge of the Sith' ?
                        <Text style={{fontSize: 15, color: 'lightblue'}}>
                            <TransText dictionary={movieThree} /> (Detalhar)
                        </Text>
                        :
                        null
                    }
                    </TouchableOpacity>
                </View>
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
                    key={index}
                    style={{ paddingLeft: 10}}> 
                    <Text style={{color: 'lightblue'}}>{vehicle.name} (Detalhar)</Text> 
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
                    style={{paddingLeft: 20}}
                >
                    <Text style={{color: 'lightblue'}}>{starship.name}</Text>
                </TouchableOpacity>
            ))
        )
    }

    const image1 = require('../../../assets/characters.jpg');
    const imageStyle = {
        width: '100%',
        height: '100%'
    }

    const labelStyle = {
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
    const textStyle ={
        paddingLeft: 5,
        paddingTop: 5,
        color: 'black', 
        fontSize: 15,
        backgroundColor: 'lightblue', 
        width: '100%', 
        height: 30, 
        borderWidth: 0.5, 
        borderColor: 'black', 
        marginTop: 10
        }
    const rowContainer = {
        justifyContent: 'center', 
        flexDirection: 'row', 
        width: windowWidth, 
        backgroundColor: 'transparent'
    }
    return (
        <View style={{width: windowWidth, backgroundColor: 'transparent', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <ImageBackground source={image1} style={imageStyle}>
                <Spinner visible={loading} color="white"/>
                <View style={{height: '100%', backgroundColor: 'transparent', justifyContent: 'space-around', width: windowWidth}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', height: '4%', width: windowWidth, backgroundColor: 'transparent'}}>
                        <Text style={{fontSize: 20}}>Detalhes do personagem</Text>
                    </View>
                    <View style={{ justifyContent: 'space-around', height: '96%', width: windowWidth, backgroundColor: 'transparent'}}>
                        <Text style={textStyle}>Nome: {characterDetail.name}</Text>
                        <View style={rowContainer}>
                            <Text style={labelStyle}>Altura: </Text>
                            <Text style={labelStyle}>{formatHeight(characterDetail.height)} metros</Text>
                        </View>
                        <View style={rowContainer}>
                            <View style={{width: '50%', backgroundColor: 'transparent'}}>
                                <Text style={textStyle}>
                                    Gênero:  
                                </Text>
                            </View>
                            <View style={{width: '50%'}}>
                                {characterDetail.gender == 'male' ?
                                    <Text style={textStyle}>
                                        <TransText dictionary={genderMale}/>
                                    </Text>
                                    :
                                characterDetail.gender == 'n/a' ?
                                    <Text style={textStyle}>
                                        Não possui
                                    </Text>
                                    :
                                    <Text style={{fontSize: 15}}>
                                        <TransText dictionary={genderFemale}/>
                                    </Text>
                                }                        
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={labelStyle}>Cor da pele: </Text>
                            {characterDetail.skin_color == 'fair' ?
                                <Text style={textStyle}>
                                    <TransText dictionary={skinColorJedi} />
                                </Text>
                                :
                            characterDetail.skin_color == 'gold' ?
                                <Text style={textStyle}>
                                    <TransText dictionary={skinColorGold} />
                                </Text>
                                :
                            characterDetail.skin_color == 'white' ?
                                <Text style={textStyle}>
                                    <TransText dictionary={skinColorWhite} />
                                </Text>
                                :
                            characterDetail.skin_color == 'light' ?
                                <Text style={textStyle}>
                                    <TransText dictionary={skinColorLight} />
                                </Text>
                                :
                            characterDetail.skin_color == 'white, blue' ?
                                <Text style={textStyle}>
                                    <TransText dictionary={skinColorWhiteBlue} />
                                </Text>
                                : 
                            characterDetail.skin_color == 'white, red' ?
                                <Text style={textStyle}>
                                    <TransText dictionary={skinColorWhiteRed} />
                                </Text>
                                :
                                null
                            }
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={labelStyle}>Cor dos olhos: </Text>
                            {characterDetail.eye_color == 'blue' ?
                                <Text style={textStyle}>
                                    <TransText dictionary={eyeColorBlue} />
                                </Text>
                                :
                            characterDetail.eye_color == 'brown' ?
                                <Text style={textStyle}>
                                    <TransText dictionary={eyeColorBrown} />
                                </Text>
                                :
                            characterDetail.eye_color == 'blue-gray' ?
                                <Text style={textStyle}>
                                    <TransText dictionary={eyeColorBlueGray} />
                                </Text>
                                :
                            characterDetail.eye_color == 'red' ?
                                <Text style={textStyle}>
                                    <TransText dictionary={eyeColorRed} />
                                </Text>
                                :
                            characterDetail.eye_color == 'yellow' ?
                                <Text style={textStyle}>
                                    <TransText dictionary={eyeColorYellow} />
                                </Text>
                                :
                                null
                            
                            }
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={labelStyle}>Ano de nascimento: </Text>
                            <Text style={textStyle}>{characterDetail.birth_year}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={labelStyle}>Terra natal:</Text>
                            <TouchableOpacity style={textStyle} onPress={() => navigation.navigate('DetailPlanet', {planet: homeworld})}> 
                                <Text>{homeworld.name}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', height: 109, alignItems: 'flex-start'}}>
                            <Text style={{fontSize: 18, color: 'lightblue', paddingLeft: 10}}>Filmes</Text>
                            {getMovies()}
                        </View>
                        <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', paddingLeft: 10}}>
                            <Text style={{fontSize: 18, color: 'lightblue'}}>Veículos</Text>
                            {getVehicles(vehicles)}
                        </View>
                        <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', paddingLeft: 10}}>
                            <Text style={{fontSize: 18, color: 'lightblue'}}>Naves</Text>
                            {getStarships(starships)}
                        </View>

                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default DetailCharacter;