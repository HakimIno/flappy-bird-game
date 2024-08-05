import React, { useRef, useState } from 'react';
import { View, Text, Modal, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';

const AdvertModal = ({ visible, onClose, advertData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onClose} // Called when the user taps the hardware back button
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>โปรโมชั่น</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ position: 'absolute', top: "12%", right: "12%", zIndex: 100, paddingHorizontal: 10, borderRadius: 100, backgroundColor: "rgba(0,0,0,0.3)" }}>
                        <Text style={{ fontFamily: 'Kanit_400Regular', color: 'white', fontSize: 13 }}>{currentIndex + 1}/{advertData?.length}</Text>
                    </View>

                    <FlatList
                        ref={flatListRef}
                        data={advertData}
                        horizontal
                        pagingEnabled // เลื่อนทีละรูป
                        showsHorizontalScrollIndicator={false} // ซ่อน Scroll Indicator
                        renderItem={({ item }) => (
                            <View style={styles.imageContainer}>
                                <View style={{ width: "100%", height: 400 }}>
                                    <Image source={{ uri: item?.image }} style={styles.image} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title} numberOfLines={1}>{item?.title}</Text>
                                    <Text style={styles.description} numberOfLines={2}>{item?.description}</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        onViewableItemsChanged={handleViewableItemsChanged}
                        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                        initialNumToRender={1}
                        maxToRenderPerBatch={1}
                        overScrollMode="never"
                    />

                    <View style={styles.dotsContainer}>
                        {advertData?.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    { opacity: currentIndex === index ? 1 : 0.4 }
                                ]}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '90%', // ใช้ความกว้าง 90% ของหน้าจอ
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        padding: 5,
    },
    closeButton: {
        paddingHorizontal: 10,
        paddingVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    closeButtonText: {
        fontSize: 18,
        fontFamily: 'PressStart2P_400Regular',
        marginTop: 10,
        marginLeft: 2,
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.9, // ความกว้างของรูปภาพเท่ากับ 90% ของหน้าจอ
    },
    image: {
        width: '100%',
        height: "100%",
        resizeMode: 'contain',
        backgroundColor: '#f8fafc'
    },
    textContainer: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 5
    },
    title: {
        fontSize: 16,
        fontFamily: 'Kanit_500Medium',
    },
    description: {
        fontSize: 12,
        fontFamily: 'Kanit_400Regular',
        color: "#9ca3af"
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: "15%",
        width: '100%',
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        margin: 3,
    },
});

export default AdvertModal;
