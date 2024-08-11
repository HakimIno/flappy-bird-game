import { Platform, TouchableOpacity, useWindowDimensions, View, Text as TextRn, Image as ImageRn } from 'react-native';
import {
    Canvas,
    useImage,
    Image,
    Group,
    Text,
    matchFont,
    Rect,
    Path,
    Skia,
    RoundedRect,

} from '@shopify/react-native-skia';
import {
    useSharedValue,
    withTiming,
    Easing,
    withSequence,
    withRepeat,
    useFrameCallback,
    useDerivedValue,
    interpolate,
    Extrapolation,
    useAnimatedReaction,
    runOnJS,
    cancelAnimation,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import {
    GestureHandlerRootView,
    GestureDetector,
    Gesture,
} from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import { useSelector } from 'react-redux';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


const GRAVITY = 1000;
const JUMP_FORCE = -500;

const pipeWidth = 104;
const pipeHeight = 640;


async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/sfx_wing.mp3') // ตรวจสอบตำแหน่งไฟล์ให้ถูกต้อง
    );
    await sound.playAsync();

    // Remember to unload the sound after playing it
    sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
        }
    });
}

async function playSoundDie() {
    const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/sfx_die.wav') // ตรวจสอบตำแหน่งไฟล์ให้ถูกต้อง
    );
    await sound.playAsync();

    // Remember to unload the sound after playing it
    sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
        }
    });
}


const GameScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const [score, setScore] = useState(0);



    // @ts-ignore
    const currentBirdImage = useSelector((state) => state.images.currentBirdImage);
    // @ts-ignore
    const currentMapImage = useSelector((state) => state.images.currentMapImage);

    const bg = useImage(currentMapImage ? currentMapImage : require('../../assets/sprites/background-day.png'));
    const bird = useImage(currentBirdImage ? currentBirdImage : require('../../assets/brid/blue.png'))
    const pipeBottom = useImage(require('../../assets/sprites/pipe-green.png'));
    const pipeTop = useImage(require('../../assets/sprites/pipe-green-top.png'));
    const base = useImage(require('../../assets/sprites/base.png'));

    const gameOver = useSharedValue(false);
    const pipeX = useSharedValue(width);

    const birdY = useSharedValue(height / 3);
    const birdX = width / 4;
    const birdYVelocity = useSharedValue(0);

    const pipeOffset = useSharedValue(0);
    const topPipeY = useDerivedValue(() => pipeOffset.value - 320);
    const bottomPipeY = useDerivedValue(() => height - 320 + pipeOffset.value);


    const pipesSpeed = useDerivedValue(() => {
        return interpolate(score, [0, 20], [1, 2]);
    });

    const obstacles = useDerivedValue(() => [
        // bottom pipe
        {
            x: pipeX.value,
            y: bottomPipeY.value,
            h: pipeHeight,
            w: pipeWidth,
        },
        // top pipe
        {
            x: pipeX.value,
            y: topPipeY.value,
            h: pipeHeight,
            w: pipeWidth,
        },
    ]);

    useEffect(() => {
        moveTheMap();
    }, []);

    const moveTheMap = () => {
        pipeX.value = withSequence(
            withTiming(width, { duration: 0 }),
            withTiming(-150, {
                duration: 3000 / pipesSpeed.value,
                easing: Easing.linear,
            }),
            withTiming(width, { duration: 0 })
        );
    };

    // Scoring system
    useAnimatedReaction(
        () => pipeX.value,
        (currentValue, previousValue) => {
            const middle = birdX;

            // change offset for the position of the next gap
            if (previousValue && currentValue < -100 && previousValue > -100) {
                pipeOffset.value = Math.random() * 400 - 200;
                cancelAnimation(pipeX);
                runOnJS(moveTheMap)();
            }

            if (
                currentValue !== previousValue &&
                previousValue &&
                currentValue <= middle &&
                previousValue > middle
            ) {
                // do something ✨
                runOnJS(setScore)(score + 1);
            }
        }
    );

    const isPointCollidingWithRect = (point, rect) => {
        'worklet';
        return (
            point.x >= rect.x && // right of the left edge AND
            point.x <= rect.x + rect.w && // left of the right edge AND
            point.y >= rect.y && // below the top AND
            point.y <= rect.y + rect.h // above the bottom
        );
    };

    // Collision detection
    useAnimatedReaction(
        () => birdY.value,
        (currentValue, previousValue) => {
            const center = {
                x: birdX + 32,
                y: birdY.value + 24,
            };

            // Ground collision detection
            if (currentValue > height - 100 || currentValue < 0) {
                gameOver.value = true;
                runOnJS(playSoundDie)()

            }

            const isColliding = obstacles.value.some((rect) =>
                isPointCollidingWithRect(center, rect)
            );
            if (isColliding) {
                gameOver.value = true;
                runOnJS(playSoundDie)()

            }
        }
    );

    useAnimatedReaction(
        () => gameOver.value,
        (currentValue, previousValue) => {
            if (currentValue && !previousValue) {
                cancelAnimation(pipeX);
            }
        }
    );

    useFrameCallback(({ timeSincePreviousFrame: dt }) => {
        if (!dt || gameOver.value) {
            return;
        }
        birdY.value = birdY.value + (birdYVelocity.value * dt) / 1000;
        birdYVelocity.value = birdYVelocity.value + (GRAVITY * dt) / 1000;
    });

    const restartGame = () => {
        'worklet';
        birdY.value = height / 3;
        birdYVelocity.value = 0;
        gameOver.value = false;
        pipeX.value = width;
        runOnJS(moveTheMap)();
        runOnJS(setScore)(0);
    };

    const gesture = Gesture.Tap().onStart(() => {
        if (gameOver.value) {

        } else {
            // jump
            birdYVelocity.value = JUMP_FORCE;
            runOnJS(playSound)()
        }
    });


    const birdTransform = useDerivedValue(() => {
        return [
            {
                rotate: interpolate(
                    birdYVelocity.value,
                    [-500, 500],
                    [-0.5, 0.5],
                    Extrapolation.CLAMP
                ),
            },
        ];
    });
    const birdOrigin = useDerivedValue(() => {
        return { x: width / 4 + 32, y: birdY.value + 24 };
    });

    const fontFamily = Platform.select({ ios: 'Helvetica', default: 'Helvetica' });
    const fontStyle = {
        fontFamily,
        fontSize: 40,
        fontWeight: 'bold',
    };
    // @ts-ignore
    const font = matchFont(fontStyle);

    const scorefont = matchFont({
        fontFamily,
        fontSize: 40,
    });

    const [gameOverState, setGameOverState] = useState(false)
    const gameOverImage = useImage(require('../../assets/sprites/gameover.png'));

    useAnimatedReaction(
        () => gameOver.value,
        (currentValue, previousValue) => {
            if (currentValue !== previousValue) {
                runOnJS(setGameOverState)(currentValue);
            }
        }
    );

    const size = 300;
    const r = size * 0.1;
    const rrct = {
        rect: { x: width / 2 - 150, y: height / 2 - 100, width: size, height: 100 },
        topLeft: { x: r, y: r },
        topRight: { x: r, y: r },
        bottomRight: { x: r, y: r },
        bottomLeft: { x: r, y: r },

    };

    const { top } = useSafeAreaInsets()

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#4DC1CB"
                translucent
            />
            <GestureDetector gesture={gesture}>
                <Canvas style={{ width, height, marginTop: top }}>
                    {/* BG */}
                    <Image image={bg} width={width} height={height} fit={'cover'} />

                    {/* Pipes */}
                    <Image
                        image={pipeTop}
                        y={topPipeY}
                        x={pipeX}
                        width={pipeWidth}
                        height={pipeHeight}
                    />
                    <Image
                        image={pipeBottom}
                        y={bottomPipeY}
                        x={pipeX}
                        width={pipeWidth}
                        height={pipeHeight}
                    />

                    {/* Base */}
                    <Image
                        image={base}
                        width={width}
                        height={150}
                        y={height - 75}
                        x={0}
                        fit={'cover'}
                    />

                    {/* Bird */}
                    <Group transform={birdTransform} origin={birdOrigin}>
                        <Image image={bird} y={birdY} x={birdX} width={64} height={48} />
                    </Group>

                    {/* Sim */}

                    {/* Score */}

                    {/* <Text
                        x={width / 2 - 30}
                        y={100}
                        text={score.toString()}
                        font={font}
                        color={"white"}
                    /> */}

                    {gameOverState && (
                        <>

                            {gameOverImage && (
                                <Image
                                    image={gameOverImage}
                                    x={width / 2 - 200}
                                    y={height / 3.5}
                                    width={400}
                                    height={60}
                                />
                            )}

                            <RoundedRect
                                rect={rrct}
                                color="white"
                                opacity={1}
                                strokeWidth={4}
                            />

                        </>
                    )}
                </Canvas>
            </GestureDetector>


            <View style={{ position: 'absolute', top: "9%", left: "40%" }}>
                <TextRn style={{ fontFamily: "PressStart2P_400Regular", fontSize: 30, color: "white" }}>
                    {score.toString()}
                </TextRn>
            </View>

            {gameOverState && (
                <>

                    <ImageRn source={require('../../assets/bridLogo.png')} style={{ width: "100%", height: 150, resizeMode: 'contain', position: 'absolute', top: "15%", left: "0%" }} />
                    <ImageRn source={require("../../assets/WLogo.png")} style={{ width: 60, height: 60, resizeMode: 'contain', position: 'absolute', top: "40%", left: "18%" }} />

                    <View style={{ position: 'absolute', top: "44%", left: "23%" }}>
                        <TextRn style={{ fontFamily: "PressStart2P_400Regular", fontSize: 20, color: "#674A2C" }}>
                            score: {score.toString()}
                        </TextRn>
                    </View>


                    <View style={{ position: 'absolute', top: "53%", left: "-20%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginLeft: "40%" }}>
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
                            onPress={() => navigation.goBack()}
                        >
                            <Entypo name="chevron-left" size={50} color="black" />
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
                            onPress={() => {
                                if (gameOverState) {
                                    restartGame()
                                }
                            }}
                        >
                            <Ionicons name="play" size={50} color="black" />
                        </TouchableOpacity>
                    </View>
                </>
            )}

        </GestureHandlerRootView>
    );
};
export default GameScreen;