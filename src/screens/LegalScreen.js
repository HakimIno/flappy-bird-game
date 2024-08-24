import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, Image as ImageRn, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Canvas, Image, useImage } from '@shopify/react-native-skia'
import { Entypo, Ionicons } from '@expo/vector-icons'

const LegalScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState(0);

    const [language, setLanguage] = useState('th');

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'th' ? 'en' : 'th'));
    };

    return (
        <View style={{ width, height }}>
            <StatusBar style="auto" />
            <Canvas style={{ width, height }}>
                <Image image={useImage(require('../../assets/Background/nigt.png'))} width={width} height={height} fit={'cover'} />
            </Canvas>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'white', padding: 10, position: 'absolute', top: "5%", left: 10, borderRadius: 100 }}>
                <Entypo name="chevron-left" size={30} color="black" />
            </TouchableOpacity>

            <View style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 20, borderWidth: 1, width: width * 0.9, height: height * 0.7, position: 'absolute', top: "15%", left: "5%" }}>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 20 }}>
                    <Pressable
                        style={{
                            backgroundColor: activeTab === 0 ? '#FFF4DC' : 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: "#674A2C",
                            padding: 8
                        }}
                        onPress={() => setActiveTab(0)}
                    >
                        <Text style={{ fontFamily: 'PressStart2P_400Regular', marginTop: 8, color: "#674A2C", fontSize: 7 }}>Privacy Policy</Text>
                    </Pressable>

                    <Pressable
                        style={{
                            padding: 8,
                            backgroundColor: activeTab === 1 ? '#FFF4DC' : 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: "#674A2C"
                        }}
                        onPress={() => setActiveTab(1)}
                    >
                        <Text style={{ fontFamily: 'PressStart2P_400Regular', marginTop: 8, color: "#674A2C", fontSize: 7 }}>Terms of Service</Text>
                    </Pressable>
                </View>


                {activeTab === 0 ? (
                    <ScrollView style={styles.scrollView} overScrollMode="never" showsVerticalScrollIndicator={false}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',

                        }}>
                            <View />
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    marginHorizontal: 10,
                                    marginBottom: 5,
                                    padding: 6,
                                    backgroundColor: "white",
                                    borderRadius: 10
                                }}
                                onPress={toggleLanguage}
                            >
                                <Ionicons name="language" size={16} color="black" />
                                <Text style={styles.content}>{language === 'th' ? 'English' : 'ไทย'}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.container}>
                            {language === 'th' ? (
                                <View>
                                    <Text style={styles.title}>นโยบายความเป็นส่วนตัว</Text>
                                    <Text style={styles.date}>ปรับปรุงล่าสุด: 23/08/2024</Text>

                                    <Text style={styles.sectionTitle}>การเก็บรวบรวมและใช้ข้อมูล</Text>
                                    <Text style={styles.content}>
                                        แอปเกมของเราใช้การแจ้งเตือนเพื่อแจ้งข้อมูลสำคัญ เช่น การอัพเดท การแจ้งเตือนต่างๆ เพื่อให้ประสบการณ์การเล่นเกมของคุณดียิ่งขึ้น เราอาจขอสิทธิ์ในการเข้าถึงข้อมูลบางส่วนบนอุปกรณ์ของคุณ เช่น การแจ้งเตือนและข้อมูลการใช้งานเพื่อปรับปรุงการให้บริการ
                                    </Text>

                                    <Text style={styles.sectionTitle}>การสร้างรูปภาพในเกม</Text>
                                    <Text style={styles.content}>
                                        รูปภาพทั้งหมดที่ใช้ภายในเกม เช่น รูปพื้นหลังและรูปนก ได้รับการสร้างขึ้นโดยใช้เทคโนโลยี OpenAI ซึ่งช่วยให้เราสร้างสรรค์งานกราฟิกที่ไม่เหมือนใครและมอบประสบการณ์การเล่นเกมที่น่าตื่นเต้นให้กับผู้เล่น
                                    </Text>

                                    <Text style={styles.sectionTitle}>การแบ่งปันข้อมูล</Text>
                                    <Text style={styles.content}>
                                        เราจะไม่แบ่งปันข้อมูลส่วนตัวของคุณกับบุคคลที่สามโดยไม่ได้รับความยินยอม เว้นแต่จะเป็นไปตามกฎหมายหรือข้อกำหนดของหน่วยงานที่เกี่ยวข้อง
                                    </Text>

                                    <Text style={styles.sectionTitle}>การรักษาความปลอดภัยของข้อมูล</Text>
                                    <Text style={styles.content}>
                                        เรามุ่งมั่นที่จะปกป้องข้อมูลของคุณด้วยมาตรการรักษาความปลอดภัยที่เหมาะสม อย่างไรก็ตาม เราไม่สามารถรับประกันได้ว่าข้อมูลที่ส่งผ่านทางอินเทอร์เน็ตหรือเก็บไว้ในเซิร์ฟเวอร์ของเราจะปลอดภัย 100%
                                    </Text>

                                    <Text style={styles.sectionTitle}>การเปลี่ยนแปลงนโยบายความเป็นส่วนตัว</Text>
                                    <Text style={styles.content}>
                                        เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้ตามความจำเป็น การเปลี่ยนแปลงใดๆ จะถูกประกาศบนหน้าเพจนี้
                                    </Text>

                                    <Text style={styles.content}>
                                        หากคุณมีข้อสงสัยหรือข้อเสนอแนะเกี่ยวกับนโยบายความเป็นส่วนตัวของเรากรุณาติดต่อเราผ่านช่องทางอีเมล
                                    </Text>
                                    <Text style={[styles.content, { fontSize: 12, textDecorationLine: 'underline' }]}>
                                        nonthachaikhanyou@gmail.com
                                    </Text>
                                </View>
                            ) : (
                                <View>
                                    <Text style={styles.title}>Privacy Policy</Text>
                                    <Text style={styles.date}>Last Updated: 23/08/2024</Text>

                                    <Text style={styles.sectionTitle}>Data Collection and Usage</Text>
                                    <Text style={styles.content}>
                                        Our game app uses notifications to inform you of important updates and alerts, enhancing your gaming experience. We may request access to certain data on your device, such as notifications and usage data, to improve our services.
                                    </Text>

                                    <Text style={styles.sectionTitle}>Image Creation in the Game</Text>
                                    <Text style={styles.content}>
                                        All images used in the game, including backgrounds and birds, are created using OpenAI technology, enabling us to craft unique graphics and provide an exciting gaming experience.
                                    </Text>

                                    <Text style={styles.sectionTitle}>Data Sharing</Text>
                                    <Text style={styles.content}>
                                        We will not share your personal information with third parties without your consent, except as required by law or relevant authorities.
                                    </Text>

                                    <Text style={styles.sectionTitle}>Data Security</Text>
                                    <Text style={styles.content}>
                                        We are committed to protecting your data with appropriate security measures. However, we cannot guarantee that information transmitted over the internet or stored on our servers will be 100% secure.
                                    </Text>

                                    <Text style={styles.sectionTitle}>Changes to Privacy Policy</Text>
                                    <Text style={styles.content}>
                                        We may update this Privacy Policy as necessary. Any changes will be posted on this page.
                                    </Text>

                                    <Text style={styles.content}>
                                        If you have any questions or suggestions regarding our Privacy Policy, please contact us Email.
                                    </Text>
                                    <Text style={[styles.content, { fontSize: 12, textDecorationLine: 'underline' }]}>
                                        nonthachaikhanyou@gmail.com
                                    </Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                ) : (
                    <ScrollView style={styles.scrollView} overScrollMode="never" showsVerticalScrollIndicator={false}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',

                        }}>
                            <View />
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    marginHorizontal: 10,
                                    marginBottom: 5,
                                    padding: 6,
                                    backgroundColor: "white",
                                    borderRadius: 10
                                }}
                                onPress={toggleLanguage}
                            >
                                <Ionicons name="language" size={16} color="black" />
                                <Text style={styles.content}>{language === 'th' ? 'English' : 'ไทย'}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.container}>
                            {language === 'th' ? (
                                <View>
                                    <Text style={styles.title}>ข้อตกลงในการใช้บริการ</Text>
                                    <Text style={styles.date}>ปรับปรุงล่าสุด: 23/08/2024</Text>
                                    <Text style={[styles.content, { marginVertical: 10 }]}>ขอขอบคุณที่เล่นเกมของเรา กรุณาอ่านข้อตกลงในการใช้บริการนี้อย่างละเอียดก่อนเล่นเกม การเข้าเล่นเกมนี้หมายความว่าคุณยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขเหล่านี้</Text>
                                    <Text style={styles.sectionTitle}>1. การยอมรับข้อกำหนด</Text>
                                    <Text style={styles.content}>
                                        โดยการดาวน์โหลด ติดตั้ง หรือเล่นเกมนี้ คุณตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขเหล่านี้ หากคุณไม่ยอมรับข้อกำหนดเหล่านี้ กรุณาหยุดเล่นเกมนี้ทันที
                                    </Text>

                                    <Text style={styles.sectionTitle}>2. การใช้เกม</Text>
                                    <Text style={styles.content}>
                                        คุณตกลงที่จะใช้เกมนี้เพื่อความบันเทิงส่วนตัวเท่านั้น ห้ามใช้เกมนี้ในทางที่อาจทำให้เกิดความเสียหายแก่ผู้อื่น หรือในทางที่ผิดกฎหมาย
                                    </Text>

                                    <Text style={styles.sectionTitle}>3. สิทธิ์ในทรัพย์สินทางปัญญา</Text>
                                    <Text style={styles.content}>
                                        เนื้อหาและทรัพย์สินทางปัญญาทั้งหมดที่เกี่ยวข้องกับเกมนี้เป็นของเรา ซึ่งรวมถึงรูปภาพทั้งหมดที่สร้างขึ้นโดยใช้เทคโนโลยีของ OpenAI รูปภาพเหล่านี้ได้รับการออกแบบและสร้างสรรค์เพื่อใช้เฉพาะในเกมนี้ คุณไม่มีสิทธิ์ในการใช้ทรัพย์สินทางปัญญาใดๆ ของเราโดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร ภาษา อังกฟาด้ววย
                                    </Text>

                                    <Text style={styles.sectionTitle}>4. การยกเลิกการใช้งาน</Text>
                                    <Text style={styles.content}>
                                        เราขอสงวนสิทธิ์ในการยกเลิกหรือระงับการเข้าถึงเกมของคุณได้ทุกเมื่อ หากพบว่าคุณละเมิดข้อตกลงนี้หรือใช้เกมในทางที่ผิด
                                    </Text>

                                    <Text style={styles.sectionTitle}>5. ข้อจำกัดความรับผิด</Text>
                                    <Text style={styles.content}>
                                        เราจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดขึ้นจากการเล่นเกมนี้ และเราไม่รับประกันว่าเกมจะไม่มีข้อบกพร่องหรือข้อผิดพลาด
                                    </Text>

                                    <Text style={styles.sectionTitle}>6. การแก้ไขข้อตกลง</Text>
                                    <Text style={styles.content}>
                                        เราขอสงวนสิทธิ์ในการปรับปรุงหรือแก้ไขข้อตกลงนี้ได้ทุกเมื่อ การแก้ไขใดๆ จะมีผลบังคับใช้ทันทีเมื่อมีการเผยแพร่ในเกม กรุณาตรวจสอบข้อตกลงนี้เป็นประจำเพื่อรับทราบถึงการเปลี่ยนแปลง
                                    </Text>

                                </View>
                            ) : (
                                <View>
                                    <Text style={styles.title}>Terms of Service</Text>
                                    <Text style={styles.date}>Last Updated: 23/08/2024</Text>
                                    <Text style={[styles.content, { marginVertical: 10 }]}>
                                        Thank you for playing our game. Please read these Terms of Service carefully before playing. By accessing or playing the game, you agree to be bound by these terms and conditions.
                                    </Text>
                                    <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                                    <Text style={styles.content}>
                                        By downloading, installing, or playing this game, you agree to comply with these terms and conditions. If you do not agree with these terms, please discontinue playing the game immediately.
                                    </Text>

                                    <Text style={styles.sectionTitle}>2. Use of the Game</Text>
                                    <Text style={styles.content}>
                                        You agree to use the game solely for personal entertainment purposes. You must not use the game in a way that could cause harm to others or for any illegal activities.
                                    </Text>

                                    <Text style={styles.sectionTitle}>3. Intellectual Property Rights</Text>
                                    <Text style={styles.content}>
                                        All content and intellectual property related to this game are owned by us, including all images created using OpenAI technology. These images have been designed and created specifically for use in this game. You do not have any rights to use our intellectual property without express written permission.
                                    </Text>

                                    <Text style={styles.sectionTitle}>4. Termination of Use</Text>
                                    <Text style={styles.content}>
                                        We reserve the right to terminate or suspend your access to the game at any time if we find that you have violated these terms or misused the game.
                                    </Text>

                                    <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
                                    <Text style={styles.content}>
                                        We shall not be liable for any damages arising from playing this game, and we do not warrant that the game will be error-free or without defects.
                                    </Text>

                                    <Text style={styles.sectionTitle}>6. Modifications to the Terms</Text>
                                    <Text style={styles.content}>
                                        We reserve the right to update or modify these terms at any time. Any changes will be effective immediately upon posting in the game. Please check these terms regularly to stay informed of any updates.
                                    </Text>

                                </View>
                            )}
                        </View>
                    </ScrollView>
                )}
            </View>
        </View>
    )
}

export default LegalScreen

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        margin: 10,

    },
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        paddingHorizontal: 30
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    date: {
        fontSize: 10,
        textAlign: 'center',
        color: '#888',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: '#444',
    },
    content: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        color: '#555',
        textAlign: 'justify',
    },
})