import React, { useRef, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ImageCarousel = ({ backgroundList, width, height, left, right, bottom, onImageChange }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < backgroundList.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            // @ts-ignore
            flatListRef.current.scrollToIndex({ index: newIndex });
            onImageChange(backgroundList[newIndex]);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            // @ts-ignore
            flatListRef.current.scrollToIndex({ index: newIndex });
            onImageChange(backgroundList[newIndex]);
        }
    };

    const renderButton = (position, onPress, symbol) => (
        <TouchableOpacity style={[styles.button, position]} onPress={onPress}>
            <Text style={styles.buttonText}>{symbol}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ width: width }}>
            <FlatList
                ref={flatListRef}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                data={backgroundList}
                horizontal
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={{ width: width, height: height }}>
                        <Image source={item} style={{ width: width, height: height, borderRadius: 10 }} />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={[styles.buttonContainer, { bottom: bottom }]}>
                {renderButton({ left }, handleNext, ">")}
                {renderButton({ right }, handlePrev, "<")}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: '100%',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        width: 40,
        height: 40,
    },
    buttonText: {
        fontFamily: 'PressStart2P_400Regular',
        color: '#4B3C46',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 5,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -10,
        width: '100%',
    },
    indicator: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#888',
        marginHorizontal: 4,
    },
    activeIndicator: {
        backgroundColor: '#FFF',
    },
});

export default ImageCarousel;
