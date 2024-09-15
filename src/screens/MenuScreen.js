import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, Image as ImageRn } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Canvas, Image, useImage } from '@shopify/react-native-skia'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { setCurrentBirdImage, setCurrentMapImage } from '../redux/slices/imageSlice'

const MenuScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState('SKIN');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedIndexBg, setSelectedIndexBg] = useState(0);

    const dispatch = useDispatch()

    const birdList = [
        { source: require('../../assets/bridv2/blue.png'), title: 'Blue Bird' },
        { source: require('../../assets/bridv2/brow.png'), title: 'Brown Bird' },
        { source: require('../../assets/bridv2/white.png'), title: 'White Bird' },
        { source: require('../../assets/bridv2/yellow.png'), title: 'Yellow Bird' },
    ];

    const handlePress = (item, index) => {
        setSelectedIndex(index);
        dispatch(setCurrentBirdImage(item?.source));
    };

    const handlePressBg = (item, index) => {
        setSelectedIndexBg(index);
        dispatch(setCurrentMapImage(item));
    };

    const backgroundList = [
        require('../../assets/Background/tree_bg.png'),
        // require('../../assets/sprites/background-day.png'),
        // require('../../assets/Background/boran.png'),
        // require('../../assets/sprites/background-night.png'),
        // require('../../assets/Background/Background1.png'),
        // require('../../assets/Background/Background2.png'),
        // require('../../assets/Background/Background4.png'),
        // require('../../assets/Background/Background7.png'),
        // require('../../assets/Background/Background8.png'),
        // require('../../assets/Background/Background9.png'),
        require('../../assets/Background/nigt.png'),
    ]

    return (
        <View style={{ width, height }}>
            <StatusBar style="auto" />
            <Canvas style={{ width, height }}>
                <Image image={useImage(require('../../assets/Background/nigt.png'))} width={width} height={height} fit={'cover'} />
            </Canvas>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'white', padding: 10, position: 'absolute', top: "5%", left: 10, borderRadius: 100 }}>
                <Entypo name="chevron-left" size={30} color="black" />
            </TouchableOpacity>

            <View style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 20, borderWidth: 1, width: Math.min(width * 0.9, 600), height: Math.min(height * 0.75, 800), position: 'absolute', top: "15%", left: "5%" }}>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 30 }}>
                    <Pressable
                        style={{
                            width: '45%',
                            height: 50,
                            backgroundColor: activeTab === 'SKIN' ? '#FFF4DC' : 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: "#674A2C"
                        }}
                        onPress={() => setActiveTab('SKIN')}
                    >
                        <Text style={{ fontFamily: 'PressStart2P_400Regular', marginTop: 8, color: "#674A2C" }}>SKIN</Text>
                    </Pressable>

                    <Pressable
                        style={{
                            width: '45%',
                            height: 50,
                            backgroundColor: activeTab === 'THEME' ? '#FFF4DC' : 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: "#674A2C"
                        }}
                        onPress={() => setActiveTab('THEME')}
                    >
                        <Text style={{ fontFamily: 'PressStart2P_400Regular', marginTop: 8, color: "#674A2C" }}>THEME</Text>
                    </Pressable>
                </View>


                <View style={{ width: '100%', height: '85%', marginTop: 10 }}>
                    {activeTab === 'SKIN' ? (
                        <FlatList
                            data={birdList}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    onPress={() => handlePress(item, index)}
                                    style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        margin: 20,
                                        alignItems: 'center',
                                        borderWidth: selectedIndex === index ? 2 : 2,
                                        borderColor: selectedIndex === index ? '#674A2C' : 'rgba(255,255,255,0)',
                                        borderRadius: 15,
                                        backgroundColor: selectedIndex === index ? "#DECCB9" : 'rgba(255,255,255,0)'
                                    }}
                                >
                                    <ImageRn source={item.source} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                                    <Text style={{ fontFamily: 'PressStart2P_400Regular', fontSize: 8 }}>{item.title}</Text>
                                </Pressable>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            contentContainerStyle={{ width: "100%" }}
                            showsVerticalScrollIndicator={false}
                            overScrollMode="never"
                        />
                    ) : (
                        <FlatList
                            data={backgroundList}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    onPress={() => handlePressBg(item, index)}
                                    style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        margin: 5,
                                        alignItems: 'center',

                                    }}
                                >
                                    <ImageRn source={item} style={{
                                        borderWidth: selectedIndexBg === index ? 3 : 0,
                                        borderColor: '#674A2C',
                                        borderRadius: 20,
                                        width: '90%',
                                        height: 180,
                                        padding: 5,
                                        resizeMode: 'cover'
                                    }} />

                                </Pressable>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            contentContainerStyle={{ width: "100%" }}
                            showsVerticalScrollIndicator={false}
                            overScrollMode="never"
                        />
                    )}
                </View>
            </View>
        </View>
    )
}

export default MenuScreen

const styles = StyleSheet.create({})