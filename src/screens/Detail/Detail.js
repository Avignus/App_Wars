import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { useIsFocused } from '@react-navigation/native';

export default Detail = ( {route, navigation} ) => {
    const [characters, setCharacters] = useState([]);
    const [starships, setStarships] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [species, setSpecies] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);
    const [loading5, setLoading5] = useState(false);
    const isFocused = useIsFocused()
    useEffect(() => {
        fetchCharacters(route);
        fetchPlanets(route);
        fetchStarships(route);
        fetchVehicles(route);
        fetchSpecies(route);
    }, [isFocused])
    
    const fetchVehicles = async(route) => {
        setLoading4(true);
        const movie = route.params.movieSelected;
        let listOfVehiclesUrl = [];
        let listOfVehicles = [];
        const vehiclesPromises = [];
        const vehicles = movie.vehicles
        vehicles.map(vehicleUrl => listOfVehiclesUrl.push(vehicleUrl))
        for (let i = 0; i < listOfVehiclesUrl.length; i++) {
            vehiclesPromises.push(fetch(listOfVehiclesUrl[i]).then(response => response.json()).catch(err => console.log(err)))
        }
        await Promise.all(vehiclesPromises)
        .then(response => response.forEach(function(vehicle){
            listOfVehicles.push(vehicle)
            console.log(listOfVehicles, 'veículos');
        }))
        .then(() => setVehicles(listOfVehicles))
        .then(() => setLoading4(false))
    
    }

    const fetchStarships = async(route) => {
        setLoading3(true);
        const movie = route.params.movieSelected;
        let listOfStarshipsUrl = [];
        let listOfStarships = [];
        const starshipPromises = [];
        const starships = movie.starships;
        starships.map(starshipUrl => listOfStarshipsUrl.push(starshipUrl))
        for (let i = 0; i < listOfStarshipsUrl.length; i++) {
            starshipPromises.push(fetch(listOfStarshipsUrl[i]).then(response => response.json()).catch(err => console.log(err)))
        }
        await Promise.all(starshipPromises)
        .then(response => response.forEach(function(starship) {
            listOfStarships.push(starship)
        }))
        .then(() => setStarships(listOfStarships))
        .then(() => setLoading3(false))
    
    }
    
    const fetchPlanets = async(route) => {
        setLoading2(true);
        const movie = route.params.movieSelected;
        let listOfPlanetsUrl = [];
        let listOfPlanets = [];
        const planetsPromises = [];
        const planets = movie.planets
        planets.map(planetUrl => listOfPlanetsUrl.push(planetUrl))
        for (let i = 0; i < listOfPlanetsUrl.length; i++) {
            planetsPromises.push(fetch(listOfPlanetsUrl[i]).then(response => response.json()).catch(err => console.log(err)))
        }
        await Promise.all(planetsPromises)
        .then(response => response.forEach(function(planet) {
            listOfPlanets.push(planet)
        }))
        .then(() => setPlanets(listOfPlanets))
        .then(() => setLoading2(false))
        
    }
    const fetchCharacters = async(route) => {
        setLoading1(true)
        const charactersUrl = route.params.movieSelected.characters
        let listOfCharacters = [];
        const charactersPromises = [];

        for (let i = 0; i < charactersUrl.length; i++) {
            charactersPromises.push(fetch(charactersUrl[i]).then(response => response.json()));
        }
        await Promise.all(charactersPromises)
            .then(response => response.forEach(function(character) {
                listOfCharacters.push(character);
            }))
            .then(() => setCharacters(listOfCharacters))
            .then(() => setLoading1(false))
       
    }

    
    const fetchSpecies = async(route) => {
        setLoading5(true);
        const movie = route.params.movieSelected;
        let listOfSpeciesUrl = [];
        let listOfSpecies = [];
        const speciesPromises = [];
        const species = movie.species;
        species.map(specieUrl => listOfSpeciesUrl.push(specieUrl))
        for (let i = 0; i < listOfSpeciesUrl.length; i++) {
            speciesPromises.push(fetch(listOfSpeciesUrl[i]).then(response => response.json()).catch(err => console.log(err)))
        }
        await Promise.all(speciesPromises)
        .then(response => response.forEach(function(specie) {
            listOfSpecies.push(specie)
        }))
        .then(setSpecies(listOfSpecies))
        .then(() => setLoading5(false))
    }

    const getCharacters = () => {
        return (
            
            characters.map((character, index) => (
                <TouchableOpacity 
                    style={{backgroundColor: 'green', width: 250, height: 20, borderWidth: 0.5, borderColor: 'black'}}
                    key={index} 
                    onPress={() => navigation.navigate('DetailCharacter', {
                        character: character
                })}>
                    <Text>{character.name}</Text>
                </TouchableOpacity>    
            ))
        )
    }
    
    const getPlanets = () => {
        return (
            planets.map((planet, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('DetailPlanet', {
                        planet: planet
                    })}
                >
                    <Text>{planet.name}</Text>
                </TouchableOpacity>
            ))
        )
    }

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

    const getVehicles = () => {
        return (
            vehicles.map((vehicle, index) => (
                <TouchableOpacity 
                    key={index}
                    onPress={() => navigation.navigate('DetailVehicles', {
                        vehicle: vehicle
                    })}
                >
                    <Text>{vehicle.name}</Text>
                </TouchableOpacity>
            ))
        )
    }

    const getSpecies = () => {
        return(
            species.map((specie, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('DetailSpecies', {
                        specie: specie
                    })}
                >
                    <Text>{specie.name}</Text>
                </TouchableOpacity>
            ))
        )
    }
    console.log(characters, 'personagens lista');
    return (

        <ScrollView>
            {loading1 ? 
                <Spinner visible={loading1} color="white"/>
                :   
                <View style={{backgroundColor: 'orange', height: 800}}>
                    <Text style={{textAlign: 'center'}}>Detalhes do filme</Text>
                    <Text style={{paddingLeft: 20}}>Personagens</Text>              
                    <View style={{height: '100%', paddingLeft: 30, display: 'flex', justifyContent: 'space-around'}}>
                        {getCharacters()}
                    </View>
                        
                </View>
            }
            {loading2 ?
                <Spinner visible={loading2} color="white"/>
                :
                <View style={{backgroundColor: 'blue'}}>
                    <Text>Planetas</Text>
                    {getPlanets()}
                </View>
            }
            {loading3 ?
                <View>
                    <Spinner visible={loading3} color="white"/>

                </View>
                :
                <View style={{backgroundColor: 'purple'}}>
                    <Text>Naves</Text>
                    {getStarships()}
                </View>
            }
            {loading4 ?
                <View>
                    <Spinner visible={loading4} color="white"/>
                </View>
                :
                <View style={{backgroundColor: 'green', height: 150}}>
                    <Text>Veículos</Text>
                    {getVehicles()}
                </View>
            }
            {loading5 ?
                <Spinner visible={loading5} color="white"/>
                :
                <View style={{backgroundColor: 'gray', height: 300}}>
                    <Text>Espécies</Text>
                    {getSpecies()}
                </View>
            }
        </ScrollView>       
    )
}

