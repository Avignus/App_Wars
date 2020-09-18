import React, { useEffect, useState, useRef } from 'react';
import { InteractionManager, Image, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, ImageBackground } from 'react-native';
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
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);
    const [expanded5, setExpanded5] = useState(false);
    const isFocused = useIsFocused()
    const scrollView = useRef(null);
    useEffect(() => {
        
        
        fetchCharacters(route);
        fetchPlanets(route);
        fetchStarships(route);
        fetchVehicles(route);
        fetchSpecies(route);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
          }

    }, [isFocused])
    const changeLayout1 = () => { 
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded1(!expanded1);
        InteractionManager.runAfterInteractions(() => scrollView.current.scrollTo({ x: 0 }));
    }
   
    const changeLayout2 = () => { 
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded2(!expanded2);
    }
    
    const changeLayout3 = () => { 
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded3(!expanded3);
    }

    const changeLayout4 = () => { 
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded4(!expanded4);
    }

    const changeLayout5 = () => { 
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded5(!expanded5);
    }

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
                    style={{backgroundColor: 'lightblue', width: 250, height: 30, borderWidth: 0.5, borderColor: 'black', marginTop: 10}}
                    key={index} 
                    onPress={() => navigation.navigate('DetailCharacter', {
                        character: character
                })}>
                    <Text style={{color: 'black', backgroundColor: 'transparent', fontSize: 18}}>{character.name}</Text>
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
                    style={{backgroundColor: '#E9D437', width: 250, height: 30, borderWidth: 0.5, borderColor: 'black', marginTop: 10}}
                >
                    <Text style={{color: 'black', backgroundColor: 'transparent', fontSize: 18}}>{planet.name}</Text>
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
                    style={{backgroundColor: '#E9D437', width: 250, height: 30, borderWidth: 0.5, borderColor: 'black', marginTop: 10}}
                >
                    <Text style={{color: 'black', backgroundColor: 'transparent', fontSize: 18}}>{starship.name}</Text>
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
                    style={{backgroundColor: '#E9D437', width: 250, height: 30, borderWidth: 0.5, borderColor: 'black', marginTop: 10}}
                >
                    <Text style={{color: 'black', backgroundColor: 'transparent', fontSize: 18}}>{vehicle.name}</Text>
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
                    style={{backgroundColor: '#5AFF7A', width: 250, height: 30, borderWidth: 0.5, borderColor: 'black', marginTop: 10}}
                >
                    <Text style={{color: 'black', backgroundColor: 'transparent', fontSize: 18}}>{specie.name}</Text>
                </TouchableOpacity>
            ))
        )
    }
    console.log(characters, 'personagens lista');
    const image1 = require('../../assets/characters.jpg');
    const image2 = require('../../assets/planets.jpg');
    const image3 = require('../../assets/millennium-falcon.jpg');
    const image4 = require('../../assets/snowspeeder.png');
    const image5 = require('../../assets/greedo.jpg');
    const image6 = require('../../assets/r2d2popcorn.jpg');
    const imageStyle1 = {
        width: '100%',
        height: expanded1 ? 47 * characters.length : 90,
    }
    const imageStyle2 = {
        width: '100%', 
        height: expanded2 ? 550 : 90,
    }

    const imageStyle3 = {
        width: '100%', 
        height: expanded3 ? 500 : 90
    } 

    const imageStyle4 = {
        width: '100%', 
        height: expanded4 ? 500 : 90
    }

    const imageStyle5 = {
        width: '100%',
        height: expanded5 ? 500 : 90
    }

    const image6Style = {
        height: 130,
        width: '100%',

    }
    return (

        <ScrollView ref={scrollView}>
                <Spinner visible={loading1} color="white"/>
                <ImageBackground source={image1} style={imageStyle1}>
                    <View style={{marginTop: 10, backgroundColor: 'transparent', height: expanded1 ? 38 * characters.length : 140, width: '100%', alignItems: 'center'}}>
                        <Text style={{textAlign: 'center', fontFamily: 'Starjedi', color: 'black'}}>Detalhes do filme</Text>
                        <View style={{width: '100%', height: 65}}>
                            <TouchableOpacity onPress={changeLayout1} style={{flexDirection: 'row', marginTop: 10, paddingLeft: 10, justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 50}}>
                                <Text style={{textAlign: 'center', fontSize: 25, color: expanded1 ? '#5AE2FF' : 'black'}}>Personagens</Text>    
                                <Image source={require('../../assets/down-arrow.png')} style={{width: 15, height: 15, marginLeft: 10, marginTop: 5}}/>          
                            </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: 'transparent', height: expanded1 ? 38 * characters.length : 0, overflow: 'hidden', alignItems: 'center', justifyContent: 'space-around'}}>
                            {getCharacters()}
                        </View>
                        <View style={{backgroundColor: 'transparent', width: '100%', height: 3 * characters.length, justifyContent: 'flex-end'}}>
                            <TouchableOpacity onPress={changeLayout1} style={{paddingRight: 20, justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', height: 50, backgroundColor: 'transparent'}}>
                                <Image source={require('../../assets/up-arrow-lightblue.png')} style={{width: 35, height: 35, marginLeft: 10, marginTop: 5}}/>          
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <Spinner visible={loading2} color="white"/>
                {/* // <View style={{backgroundColor: 'blue'}}>    
                //     <Text>Planetas</Text>
                //     {getPlanets()}
                // </View> */}
                <ImageBackground source={image2} style={imageStyle2}>
                    <View style={{marginTop: 10, backgroundColor: 'transparent', height: expanded2 ? 400 : 140, width: '100%', alignItems: 'center'}}>
                        <View style={{width: '100%', height: 65}}>
                            <TouchableOpacity onPress={changeLayout2} style={{flexDirection: 'row', marginTop: 10, paddingLeft: 10, justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 50}}>
                                <Text style={{textAlign: 'center', fontSize: 25, color: expanded2 ? '#E9D437' : '#5AE2FF'}}>Planetas</Text>    
                                <Image source={require('../../assets/down-arrow-yellow.png')} style={{width: 15, height: 15, marginLeft: 10, marginTop: 5, paddingRight: 20}}/>          
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '100%', backgroundColor: 'transparent', height: expanded2 ? 600 : 0, overflow: 'hidden', alignItems: 'center', justifyContent: 'flex-start'}}>
                            {getPlanets()}
                            <View style={{backgroundColor: 'transparent', width: '100%', justifyContent: 'flex-start'}}>
                                <TouchableOpacity onPress={changeLayout2} style={{ paddingRight: 20, paddingLeft: 10, justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', height: 50}}>
                                    <Image source={require('../../assets/up-arrow-yellow.png')} style={{width: 35, height: 35, marginTop: 5}}/>          
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View>
                    <Spinner visible={loading3} color="white"/>

                </View>
                {/* // <View style={{backgroundColor: 'purple'}}>
                //     <Text>Naves</Text>
                //     {getStarships()}
                // </View> */}
                <ImageBackground source={image3} style={imageStyle3}>
                    <View style={{marginTop: 10, backgroundColor: 'transparent', height: expanded3 ? 500 : 140, width: '100%', alignItems: 'center'}}>
                        <View style={{width: '100%', height: 65}}>
                            <TouchableOpacity onPress={changeLayout3} style={{flexDirection: 'row', marginTop: 10, paddingLeft: 10, justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 50}}>
                                <Text style={{textAlign: 'center', fontSize: 25, color: expanded3 ? '#5AE2FF' : '#E9D437'}}>Naves</Text>    
                                <Image source={require('../../assets/down-arrow-yellow.png')} style={{width: 15, height: 15, marginLeft: 10, marginTop: 5}}/>          
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '100%', backgroundColor: 'transparent', height: expanded3 ? 600 : 0, overflow: 'hidden', alignItems: 'center', justifyContent: 'flex-start'}}>
                            {getStarships()}
                            <View style={{backgroundColor: 'transparent', width: '100%', justifyContent: 'flex-start'}}>
                                <TouchableOpacity onPress={changeLayout3} style={{paddingRight: 20, justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', height: 50}}>
                                    <Image source={require('../../assets/up-arrow-yellow.png')} style={{width: 35, height: 35, marginLeft: 10, marginTop: 5}}/>          
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* <View style={{backgroundColor: 'transparent', width: '100%', justifyContent: 'flex-start'}}>
                            <TouchableOpacity onPress={changeLayout3} style={{backgroundColor: 'blue', paddingLeft: 10, justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', height: 50}}>
                                <Image source={require('../../assets/up-arrow.png')} style={{width: 40, height: 40, marginLeft: 10, marginTop: 5}}/>          
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </ImageBackground>

                <View>
                    <Spinner visible={loading4} color="white"/>
                </View>
                {/* <View style={{backgroundColor: 'green', height: 150}}>
                    <Text>Veículos</Text>
                    {getVehicles()}
                </View> */}
                <ImageBackground source={image4} style={imageStyle4}>
                    <View style={{marginTop: 10, backgroundColor: 'transparent', height: expanded4 ? 500 : 140, width: '100%', alignItems: 'center'}}>
                        <View style={{width: '100%', height: 65}}>
                            <TouchableOpacity onPress={changeLayout4} style={{flexDirection: 'row', marginTop: 10, paddingLeft: 10, justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 50}}>
                                <Text style={{textAlign: 'center', fontSize: 25, color: expanded4 ? '#5AE2FF' : 'white'}}>Veículos</Text>    
                                <Image source={require('../../assets/down-arrow-yellow.png')} style={{width: 15, height: 15, marginLeft: 10, marginTop: 5}}/>          
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '100%', backgroundColor: 'transparent', height: expanded4 ? 600 : 0, overflow: 'hidden', alignItems: 'center', justifyContent: 'flex-start'}}>
                            {getVehicles()}
                            <View style={{backgroundColor: 'transparent', width: '100%', justifyContent: 'flex-start'}}>
                                <TouchableOpacity onPress={changeLayout4} style={{paddingRight: 20, justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', height: 50}}>
                                    <Image source={require('../../assets/up-arrow-yellow.png')} style={{width: 35, height: 35, marginLeft: 10, marginTop: 5}}/>          
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* <View style={{backgroundColor: 'transparent', width: '100%', justifyContent: 'flex-start'}}>
                            <TouchableOpacity onPress={changeLayout3} style={{backgroundColor: 'blue', paddingLeft: 10, justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', height: 50}}>
                                <Image source={require('../../assets/up-arrow.png')} style={{width: 40, height: 40, marginLeft: 10, marginTop: 5}}/>          
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </ImageBackground>
                
                <Spinner visible={loading5} color="white"/>
                {/* <View style={{backgroundColor: 'gray', height: 300}}>
                    <Text>Espécies</Text>
                    {getSpecies()}
                </View> */}

                <ImageBackground source={image5} style={imageStyle5}>
                    <View style={{marginTop: 10, backgroundColor: 'transparent', height: expanded5 ? 500 : 140, width: '100%', alignItems: 'center'}}>
                        <View style={{width: '100%', height: 65}}>
                            <TouchableOpacity onPress={changeLayout5} style={{flexDirection: 'row', marginTop: 10, paddingLeft: 10, justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 50}}>
                                <Text style={{textAlign: 'center', fontSize: 25, color: expanded5 ? '#5AE2FF' : '#5AFF7A'}}>Espécies</Text>    
                                <Image source={require('../../assets/down-arrow-yellow.png')} style={{width: 15, height: 15, marginLeft: 10, marginTop: 5}}/>          
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '100%', backgroundColor: 'transparent', height: expanded5 ? 600 : 0, overflow: 'hidden', alignItems: 'center', justifyContent: 'flex-start'}}>
                            {getSpecies()}
                            <View style={{backgroundColor: 'transparent', width: '100%', justifyContent: 'flex-start'}}>
                                <TouchableOpacity onPress={changeLayout5} style={{paddingRight: 20, justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', height: 50}}>
                                    <Image source={require('../../assets/up-arrow-yellow.png')} style={{width: 35, height: 35, marginLeft: 10, marginTop: 5}}/>          
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* <View style={{backgroundColor: 'transparent', width: '100%', justifyContent: 'flex-start'}}>
                            <TouchableOpacity onPress={changeLayout3} style={{backgroundColor: 'blue', paddingLeft: 10, justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', height: 50}}>
                                <Image source={require('../../assets/up-arrow.png')} style={{width: 40, height: 40, marginLeft: 10, marginTop: 5}}/>          
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </ImageBackground>
                <ImageBackground source={image6} style={image6Style}>
                            <TouchableOpacity onPress={() => navigation.navigate('Index')} style={{backgroundColor: 'transparent', flexDirection: 'row', paddingLeft: 10, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                <Text style={{textAlign: 'center', fontSize: 25, color: '#E9D437'}}>Voltar para o início</Text>    
                                <Image source={require('../../assets/left-arrow.png')} style={{width: 15, height: 15, marginLeft: 10, marginTop: 5}}/>          
                            </TouchableOpacity>
                        {/* <View style={{backgroundColor: 'transparent', width: '100%', justifyContent: 'flex-start'}}>
                            <TouchableOpacity onPress={changeLayout3} style={{backgroundColor: 'blue', paddingLeft: 10, justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', height: 50}}>
                                <Image source={require('../../assets/up-arrow.png')} style={{width: 40, height: 40, marginLeft: 10, marginTop: 5}}/>          
                            </TouchableOpacity>
                        </View> */}
                </ImageBackground>

        </ScrollView>       
    )
}

