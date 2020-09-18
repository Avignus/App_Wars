import React, { useEffect, useState, useRef } from 'react';
import { ImageBackground, Image, Dimensions, ScrollView, View, Text, TouchableOpacity, InteractionManager, LayoutAnimation, Platform, UIManager } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
const getMovieUrl = (id) => `https://`



export default Index = (props) => { 
    const [page1Set, setPage1] = useState(true)
    const [page2Set, setPage2] = useState(false)
    const [page3Set, setPage3] = useState(false)
    const [page4Set, setPage4] = useState(false)
    const [page5Set, setPage5] = useState(false)
    const [page6Set, setPage6] = useState(false)
    const [window, setWindow] = useState(require('../../assets/1.jpg'));
    const [joker, setJoker] = useState(false);
    const scrollViewHorizontal = useRef(null);
    const windowWidth = Dimensions.get('window').width;
    const button = {
        text: 'button one',
        action: () => console.log('pressed button one'),
    }
    
    useEffect(() => {
        fetchMovies();
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, [window])

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

    const changeLayout = (page) => {
        
        setJoker(true)
        if (page == 1) {
            setWindow(require('../../assets/1.jpg'))
            setPage1(true)
            setPage2(false)
            setPage3(false)
            setPage4(false)
            setPage5(false)
            setPage6(false)
        } else if (page == 2) {
            setPage1(false)
            setPage2(true)
            setPage3(false)
            setPage4(false)
            setPage5(false)
            setPage6(false)
            setWindow(require('../../assets/2.jpg'))
        } else if (page == 3) {
            setPage1(true)
            setPage2(false)
            setPage3(true)
            setPage4(false)
            setPage5(false)
            setPage6(false)
            setWindow(require('../../assets/3.jpg'))
        } else if (page == 4) {
            setPage1(false)
            setPage2(false)
            setPage3(false)
            setPage4(true)
            setPage5(false)
            setPage6(false)

            setWindow(require('../../assets/4.jpg'))
        } else if (page == 5) {
            setPage1(false)
            setPage2(false)
            setPage3(false)
            setPage4(false)
            setPage5(true)
            setPage6(false)
            setWindow(require('../../assets/5.jpg'))
        } else if (page == 6) {
            setPage1(false)
            setPage2(false)
            setPage3(false)
            setPage4(false)
            setPage5(false)
            setPage6(true)
            setWindow(require('../../assets/6.jpg'))
        }
        let value = page
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        InteractionManager.runAfterInteractions(() => scrollViewHorizontal.current.scrollTo({ x: windowWidth * (value - 1) }));
        setJoker(false)
    }
    const imageStyle = { 
        width: windowWidth, 
        height: '100%',
        alignItems: 'center', 
    }
    const renderMovies = () => {
        return (
        <View style={styles.listContainer}>
            {movies.map((item, index) => (
                <ImageBackground key={index} source={window} style={imageStyle}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleStyle}>Selecione o filme</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Detail', {
                        movieSelected: item 
                    })} style={styles.buttonOptions} key={index}>
                        <Text style={styles.listItem}>{item.title}</Text>
                        <Text style={styles.label}>Lançamento</Text>
                        <Text style={styles.information}>{item.release_date}</Text>
                        <Text style={styles.label}>Diretor(es)</Text>
                        <Text style={styles.information}>{item.director}</Text>
                        <Text style={styles.label}>Produtor(es)</Text>
                        <Text style={styles.information}>{item.producer}</Text>
                    </TouchableOpacity>
                    <View style={{width: windowWidth - 40, height: '19%', backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 0.8, borderColor: 'white', marginTop: 20}}>
                            <TouchableOpacity onPress={() => changeLayout(1)} style={{width: '15%', height: '50%', backgroundColor: 'transparent', justifyContent: 'center', borderWidth: page1Set ? 0.8 : 0, borderColor: 'white'}}>
                                <Image source={require('../../assets/IV.png')} style={{width: '100%', height: '90%'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeLayout(2)} style={{width: '15%', height: '50%', backgroundColor: 'transparent', justifyContent: 'center', borderWidth: page2Set ? 0.8 : 0, borderColor: 'white'}}>
                                <Image source={require('../../assets/IV.png')} style={{width: '100%', height: '90%'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeLayout(3)} style={{width: '15%', height: '50%', backgroundColor: 'transparent', justifyContent: 'center', borderWidth: page3Set ? 0.8 : 0, borderColor: 'white'}}>
                               <Image source={require('../../assets/VI.png')} style={{width: '100%', height: '90%'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeLayout(4)} style={{width: '15%', height: '50%', backgroundColor: 'transparent', justifyContent: 'center', borderWidth: page4Set ? 0.8 : 0, borderColor: 'white'}}>
                                <Image source={require('../../assets/I.png')} style={{width: '100%', height: '63%'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeLayout(5)} style={{width: '15%', height: '50%', backgroundColor: 'transparent', justifyContent: 'center', borderWidth: page5Set ? 0.8 : 0, borderColor: 'white'}}>
                                <Image source={require('../../assets/II.png')} style={{width: '100%', height: '60%'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeLayout(6)} style={{width: '15%', height: '50%', backgroundColor: 'transparent', justifyContent: 'center', borderWidth: page6Set ? 0.8 : 0, borderColor: 'white'}}>
                                <Image source={require('../../assets/III.png')} style={{width: '100%', height: '63%'}}/>
                            </TouchableOpacity>
                        </View>
                </ImageBackground>
            ))}
        </View>
        )
    }
    console.log(moviesTitle, 'tamanho')
    const image1 = require('../../assets/I.png');
    
    return ( 
        <View style={styles.container}>
                
                    <Spinner
                            visible={loading}
                            color="white"

                            />
                    <ScrollView 
                        showsHorizontalScrollIndicator={false} 
                        pagingEnabled={true} 
                        ref={scrollViewHorizontal} 
                        horizontal={true} 
                        scrollEnabled={joker}
                        contentContainerStyle={styles.options}>
                        {/* {moviesTitle.map((item, index) => {
                            <Text style={{fontSize: 18}} key={index}>{item}</Text>
                        })} */}
                        {renderMovies()}
                        
                        
                    </ScrollView>
                    {/* <View style={{width: windowWidth, height: '22%', backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => changeLayout(1)} style={{width: '15%', height: '50%', backgroundColor: 'green', justifyContent: 'center'}}>
                                <Image source={require('../../assets/IV.png')} style={{width: '100%', height: '90%'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeLayout(2)} style={{width: '15%', height: '50%', backgroundColor: 'green', justifyContent: 'center'}}>
                                <Image source={require('../../assets/IV.png')} style={{width: '100%', height: '90%'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeLayout(3)} style={{width: '15%', height: '50%', backgroundColor: 'green', justifyContent: 'center'}}>
                               <Image source={require('../../assets/VI.png')} style={{width: '100%', height: '90%'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeLayout(4)} style={{width: '15%', height: '50%', backgroundColor: 'green', justifyContent: 'center'}}>
                                <Image source={require('../../assets/I.png')} style={{width: '100%', height: '63%'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeLayout(5)} style={{width: '15%', height: '50%', backgroundColor: 'green', justifyContent: 'center'}}>
                                <Image source={require('../../assets/II.png')} style={{width: '100%', height: '60%'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeLayout(6)} style={{width: '15%', height: '50%', backgroundColor: 'green', justifyContent: 'center'}}>
                                <Image source={require('../../assets/III.png')} style={{width: '100%', height: '63%'}}/>
                            </TouchableOpacity>
                        </View> */}
                    {/* <View style={{backgroundColor: 'blue', flexDirection: 'row', width: 500, height: '100%'}}>
                        <TouchableOpacity onPress={changeLayout(2)} style={{width: 20, height: 50}}>
                            <Text>
                                Index 2
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={changeLayout} style={{width: 20, height: 50}}>
                            <Text>
                                Index 3
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={changeLayout} style={{width: 20, height: 50}}>
                            <Text>
                                Index 4
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={changeLayout} style={{width: 20, height: 50}}>
                            <Text>
                                Index 5
                            </Text>
                        </TouchableOpacity>
                    </View> */}
            </View>
        )
    }