import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
const getMovieUrl = (id) => `https://`



export default Index = (props) => { 
    useEffect(() => {
        fetchMovies();
    }, [])

    const [text, setText] = useState('teste');
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [moviesTitle, setMoviesTitle] = useState([]);
    const fetchMovies = async () => {
        setLoading(true)
        let listOfMovies = [];
        let listOfTitles = [];
        const moviesData = await fetch('https://swapi.dev/api/films/')
        const movies = await moviesData.json();
    
        for (let i = 0; i < movies.count; i++) {
            listOfMovies.push(movies.results[i]);
        }
        setMovies(listOfMovies);
        listOfMovies.map(item => {
            listOfTitles.push(item.title);
        })
        setMoviesTitle(listOfTitles)
        setLoading(false);
    }

    const renderMovies = () => {
        return (
        <View style={styles.listContainer}>
            {movies.map((item, index) => (
                
                <TouchableOpacity onPress={() => props.navigation.navigate('Detail', {
                    movieSelected: item 
                })} style={styles.buttonOptions} key={index}>
                    <Text style={styles.listItem}>{item.title}</Text>
                    <Text>Lançamento</Text>
                    <Text>{item.release_date}</Text>
                    <Text>Diretor</Text>
                    <Text>{item.director}</Text>
                    <Text>Produtor(es)</Text>
                    <Text>{item.producer}</Text>
                </TouchableOpacity>
            ))}
        </View>
        )
    }
    console.log(moviesTitle, 'tamanho')
    
    return ( 
        <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>Selecione o filme</Text>
                </View>
                {loading ? <Spinner
                            visible={loading}
                            color="white"
                            />
                        :
                    <View style={styles.options}>
                        {/* {moviesTitle.map((item, index) => {
                            <Text style={{fontSize: 18}} key={index}>{item}</Text>
                        })} */}
                        {renderMovies()}
                        
                    </View>
                }
                <Spinner
                    visible={loading}
                    color="white"
                />
            </View>
        )
    }