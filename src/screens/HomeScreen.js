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
import ModalHowToPlay from '../components/ModalHowToPlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VersionDisplay from '../components/VersionDisplay';



const HomeScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions();

    const [modalVisible, setModalVisible] = useState(false);
    const [advertData, setAdvertData] = useState([])
    const [baner, setBaner] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        checkFirstTime();
    }, []);

    const checkFirstTime = async () => {
        try {
            const hasShownModal = await AsyncStorage.getItem('hasShownModal');
            if (hasShownModal !== 'true') {
                setIsModalVisible(true);
                await AsyncStorage.setItem('hasShownModal', 'true');
            }
        } catch (error) {
            console.error('Error checking first time:', error);
        }
    };

    const openModalHowto = () => {
        setIsModalVisible(true);
    };

    const closeModalHowto = () => {
        setIsModalVisible(false);
    };

    async function fetchData() {
        let { data: advert, error } = await supabase
            .from('advert')
            .select('*')
            .limit(10);

        if (error) {
            console.error('Error fetching data:', error);
        } else {
            setAdvertData(advert)
        }
    }

    async function fetchDataAnnounce() {
        let { data: banerData, error } = await supabase
            .from('announce')
            .select('image_url')
            .order('created_at', { ascending: false }) // ใช้คอลัมน์ที่เหมาะสมสำหรับการจัดเรียง
            .limit(1)
            .maybeSingle() // ใช้ maybeSingle() แทน single()

        if (error) {
            console.error('Error fetching data:', error);
        } else {
            setBaner(banerData)
        }
    }

    useEffect(() => {
        fetchData()
        fetchDataAnnounce()
    }, [])

    const openModal = () => {
        if (advertData.length > 0) {
            setModalVisible(true)
        }
    };
    const closeModal = () => setModalVisible(false);

    const { top } = useSafeAreaInsets()
    return (
        <View style={{ width, height }}>
            <StatusBar style="auto" />
            <Canvas style={{ width, height }}>
                <Image
                    image={useImage(require('../../assets/Background/nigt.png'))}
                    width={width}
                    height={height}
                    fit="fill"
                />
            </Canvas>
            <VersionDisplay />

            <View style={{ position: 'absolute', top: "5%", right: 10 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 8,
                        borderRadius: 140,
                    }}
                    onPress={openModalHowto}
                >
                    <Ionicons name="golf-sharp" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {advertData.length > 0 &&
                <TouchableOpacity onPress={openModal} style={{ position: 'absolute', bottom: "2%", left: "2.5%", width: "95%", height: 80, borderEndWidth: 10, borderStartWidth: 10, borderRadius: 10, borderColor: "white" }}>
                    {baner?.image_url && (
                        <ImageRn source={{
                            uri: baner?.image_url
                        }} style={{ width: "100%", height: "100%", resizeMode: 'cover', }} />
                    )}
                </TouchableOpacity>
            }
            {/* Button should be outside the Canvas */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        borderRadius: 140,
                        borderWidth: 2,
                        borderColor: "#4B3C46",

                    }}
                    onPress={() => navigation.navigate("Game")}
                >
                    <Ionicons name="play" size={100} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '80%', marginLeft: "0%" }}>
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
                        <Ionicons name="storefront-outline" size={30} color="black" />
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
                        }}
                        onPress={() => navigation.navigate("Legal")}
                    >
                        <Ionicons name="document-text-outline" size={30} color="black" />
                    </TouchableOpacity>

                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        borderColor: "#4B3C46",
                        position: 'absolute',
                        top: "24%",
                        left: "45%",

                    }}
                // onPress={async () => {
                //     await schedulePushNotification();
                // }}
                >
                    <ImageRn source={require('../../assets/Logo_W_Baby_Bird.png')} style={{ width: 30, height: 30, resizeMode: 'contain', transform: [{ rotate: '0deg' }] }} />
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
            <ModalHowToPlay visible={isModalVisible} onClose={closeModalHowto} />
        </View>
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
        bottom: "30%",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },
});

export default HomeScreen;
