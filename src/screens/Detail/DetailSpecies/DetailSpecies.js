import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const DetailSpecies = ({route, navigation}) => {
    const [specieDetail] = useState(route.params.specie)
    const [attributes, setAttributes] = useState([]);
    const [values, setValues] = useState([]);
    const [listOfPeople, setListOfPeople] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getData() 
        fetchPeople(route)
        fetchMovies(route)
    }, [])

    const getData = () => {
        let values = Object.values(specieDetail);
        let valuesFiltered = values.slice(0, 8);
        let valuesBit = values.slice(9, 10);
        let completeValuesData = valuesFiltered.concat(valuesBit);
        let attributes = Object.keys(specieDetail);
        let attrFiltered = attributes.filter(item => item != 'homeworld' && item != 'people' && item != 'films' && item != 'created' && item != 'edited' && item != 'url')
        
        setAttributes(attrFiltered)
        setValues(completeValuesData)
    }

    const getPeopleUrl = (id) => `http://swapi.dev/api/people/${id}/`

    // const fetchPeople = async(route) => {
    //     setLoading(true);
    //     const specie = route.params.specie;
    //     let listOfElements = [];
    //     const elementsPromises = [];
    //     for (let i = 1; i <= specie.people.length; i++) {
    //         elementsPromises.push(fetch(getPeopleUrl(i)).then(response => response.json()));
    //     }
    //     await Promise.all(elementsPromises)
    //         .then((response) => response.forEach(function(element) {
    //             listOfElements.push(element)
    //         }))
    //         .then(() => setPeople(listOfElements))
    //         .then(() => setLoading(false))
    // }

    const fetchPeople = async(route) => {
        setLoading(true);
        const people = route.params.specie.people;
        let listOfPeopleUrl = [];
        const peoplePromises = [];
        people.map(peopleUrl => listOfPeopleUrl.push(peopleUrl))
        for (let i = 0; i < people.length; i++) {
            peoplePromises.push(fetch(listOfPeopleUrl[i]).then(response => response.json()).catch(err => console.log(err)))
        }
        await Promise.all(peoplePromises)
        .then(response => response.forEach(function(people) {
            listOfPeople.push(people)
        }))
        .then(() => setListOfPeople(listOfPeople))
        .then(() => setLoading(false))
    
    }

    const getMoviesUrl = (id) => `http://swapi.dev/api/films/${id}/`
    const fetchMovies = async(route) => {
        setLoading(true)
        const movies = route.params.specie.films 
        let listOfMovies = [];
        const moviesPromises = [];

        for (let i = 0; i < movies.length; i++) {
            console.log(i);
            moviesPromises.push(fetch(movies[i]).then(response => response.json()));            
        }
        await Promise.all(moviesPromises)
            .then((response) => response.forEach(function(movie) {
                listOfMovies.push(movie)
            }))
            .then(() => setMovies(listOfMovies))
            .then(() => setLoading(false))
    }
    const getValues = (values) => {
        return (
            values.map((item, index) => (
                <View key={index} style={{width: '50%', height: 105}}>
                    <Text style={textStyle}>{item}</Text>
                </View>
            ))
        )   
    }

    const getAttributes = (attributes) => {
        return (
            attributes.map((item, index) => (
                <View key={index} style={{width: '100%', backgroundColor: 'purple', height: 100, justifyContent: 'flex-start'}}>
                    <Text style={labelStyle}>{item}</Text>
                </View>
            ))
        )
    }

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
        height: 80, 
        borderWidth: 0.5, 
        borderColor: 'black', 
        marginTop: 10
    }

    const getPeople = () => {
        return (
            listOfPeople.map((people, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('DetailCharacter', {
                        character: people
                    })}
                >
                    <Text>{people.name}</Text>
                </TouchableOpacity>
            ))
        )
    }

    const handleGoBack = (navigation, movie) => {
        navigation.navigate('Detail', {
            movieSelected: movie
        })
    }
    const getMovies = (movies) => {
        return(
            movies.map((movie, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleGoBack(navigation, movie)}
                    // onPress={() => navigation.navigate('Detail', {
                    //     movieSelected: movie
                    // })}
                >
                    <Text>{movie.title}</Text>
                </TouchableOpacity>
            ))
        )
    }
    console.log(listOfPeople, 'lista de pessoas')
    return (
        <ScrollView>
            <Spinner visible={loading} color="white"/>
            <View style={{flexDirection: 'row', backgroundColor: 'orange', height: '72%'}}>
                {/* <View>
                    {getPeople()}
                </View> */}
                <View style={{width: '40%', paddingLeft: 20, backgroundColor: 'green', alignItems: 'center', justifyContent: 'flex-start'}}>
                    {getAttributes(attributes)}
                </View>
                <View style={{width: '50%', paddingLeft: 20, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'transparent', height: 300, paddingTop: 2}}>
                    {getValues(values)}
                </View>
            </View>
            <View style={{flexDirection: 'row', backgroundColor: 'purple'}}>
                <View style={{width: '50%', height: 350, paddingLeft: 20}}>
                    <Text>Indivíduos</Text>
                    {getPeople()}
                </View>
                <View style={{width: '50%'}}>
                    <Text>Filmes</Text>
                    {getMovies(movies)}
                </View>
            </View>
        </ScrollView>

    )
}
export default DetailSpecies;