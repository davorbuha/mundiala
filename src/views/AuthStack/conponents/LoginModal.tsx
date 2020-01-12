import React from 'react';
import {Modal, View, Text, StyleSheet, Image, Dimensions} from 'react-native';

interface Props {
    visible: boolean;
}

function LoginModal(p: Props) {
    return (
        <Modal animationType="slide" transparent visible={p.visible}>
            <View style={style.modalContainer}>
                <View style={style.modalWrapper}>
                    <Image
                        resizeMethod="scale"
                        resizeMode="contain"
                        style={{
                            width: Dimensions.get('screen').width * 0.5,
                            marginBottom: 20,
                        }}
                        source={require('../../../res/images/logo-login.png')}></Image>
                    <Text>dakiii</Text>
                </View>
            </View>
        </Modal>
    );
}

const style = StyleSheet.create({
    modalWrapper: {
        position: 'absolute',
        backgroundColor: 'rgba(26, 58, 111, 0.9)',
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginModal;
