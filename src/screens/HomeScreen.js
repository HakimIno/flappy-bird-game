import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, useWindowDimensions, Platform, Text as TextRn, Pressable, TouchableOpacity, Image as ImageRn, FlatList } from 'react-native';
import { useImage, Image, Canvas, Text, matchFont, useFont } from '@shopify/react-native-skia';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../utils/supabase';
import AdvertModal from '../components/AdvertModal';
import { Ionicons } from '@expo/vector-icons';
import { useNotifications } from '../context/NotificationContext';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const HomeScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions();


    const [modalVisible, setModalVisible] = useState(false);
    const [advertData, setAdvertData] = useState(null)

    async function fetchData() {
        let { data: advert, error } = await supabase
            .from('advert')
            .select('*')
            .limit(10);

        if (error) {
            console.error('Error fetching data:', error);
        } else {
            // @ts-ignore
            setAdvertData(advert)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const { top } = useSafeAreaInsets()
    return (
        <View style={{ width, height }}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#74D5D8"
                translucent
            />
            <Canvas style={{ width, height, marginTop: top }}>
                <Image
                    image={useImage(require('../../assets/Background/tree_bg.png'))}
                    width={width}
                    height={height}
                    fit="fill"
                />
            </Canvas>

            {advertData &&
                <TouchableOpacity onPress={openModal} style={{ position: 'absolute', bottom: "4%", left: "2.5%", width: "95%", height: 60, borderEndWidth: 10, borderStartWidth: 10, borderRadius: 10, borderColor: "white" }}>
                    <ImageRn source={{
                        uri: "https://hedwig-cf.netmarble.com/forum-common/sololvnpc/slvcr_th/cb91f7ffd5b0492990f5666e106f0c37_1718792584436.gif"
                    }} style={{ width: "100%", height: "100%", resizeMode: 'cover', }} />
                </TouchableOpacity>
            }
            {/* Button should be outside the Canvas */}
            <View style={styles.buttonContainer}>
                <ImageRn source={require('../../assets/sprites/pngegg.png')} style={{ width: "80%", height: 100 }} />
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 15,
                        borderRadius: 140,
                        borderWidth: 2,
                        borderColor: "#4B3C46",

                    }}
                    onPress={() => navigation.navigate("Game")}
                >
                    <Ionicons name="play" size={80} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', marginLeft: "40%" }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 15,
                            borderRadius: 140,
                            borderWidth: 1,
                            borderColor: "#4B3C46",
                        }}
                        onPress={() => navigation.navigate("Menu")}
                    >
                        <Ionicons name="menu" size={35} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 15,
                            borderRadius: 140,
                            borderWidth: 1,
                            borderColor: "#4B3C46",
                            marginRight: "40%"

                        }}
                    // onPress={async () => {
                    //     await schedulePushNotification();
                    // }}
                    >
                        <Ionicons name="volume-medium" size={35} color="black" />
                    </TouchableOpacity>
                </View>


                {/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                    <TextRn style={{ fontFamily: 'PressStart2P_400Regular', color: "#4B3C46", fontSize: 13, paddingVertical: 5 }}>bird</TextRn>
                    <ImageCarousel
                        backgroundList={bridList}
                        width={60}
                        height={50}
                        left={80}
                        right={120}
                        bottom={0}
                        onImageChange={changeBirdImage}
                    />
                </View>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                    <TextRn style={{ fontFamily: 'PressStart2P_400Regular', color: "#4B3C46", fontSize: 13, paddingVertical: 5 }}>Map</TextRn>
                    <ImageCarousel
                        backgroundList={backgroundList}
                        width={100}
                        height={100}
                        left={120}
                        right={120}
                        bottom={25}
                        onImageChange={changeMapImage}
                    />
                </View> */}
            </View>
            <AdvertModal
                visible={modalVisible}
                onClose={closeModal}
                advertData={advertData}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute', // Use absolute positioning to place it over the Canvas
        width: '100%',
        bottom: "40%",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },
});

export default HomeScreen;
