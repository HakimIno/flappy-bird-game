import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import packageJson from '../../package.json';

const VersionDisplay = () => {
    return (
        <View style={{ position: 'absolute', bottom: "2%", right: "37%", left: "37%" }}>
            <Text style={styles.versionText}>
                version: {packageJson.version}
            </Text>
        </View>

    );
};

const styles = StyleSheet.create({
    versionText: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'Kanit_500Medium',
    },
});

export default VersionDisplay;