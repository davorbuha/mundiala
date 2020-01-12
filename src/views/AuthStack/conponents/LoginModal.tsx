import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
} from 'react-native';
import FONTS from '../../../res/fonts';
import COLORS from '../../../res/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
    email: string;
    password: string;
    setEmail: (e: string) => void;
    setPassword: (p: string) => void;
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
                        }}
                        source={require('../../../res/images/logo-login.png')}></Image>
                    <Text
                        style={{
                            fontFamily: FONTS.regular,
                            color: COLORS.white,
                            fontSize: 20,
                            marginBottom: 20,
                        }}>
                        Prijava
                    </Text>
                    <TextInput
                        style={{...style.textInput, marginBottom: 16}}
                        value={p.email}
                        onChangeText={p.setEmail}
                    />
                    <TextInput
                        style={style.textInput}
                        value={p.password}
                        onChangeText={p.setPassword}
                    />
                </View>
            </View>
        </Modal>
    );
}

const style = StyleSheet.create({
    modalWrapper: {
        position: 'absolute',
        backgroundColor: COLORS.primaryWithOpacity,
        paddingHorizontal: 30,
        paddingBottom: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: '100%',
        backgroundColor: COLORS.white,
        fontFamily: FONTS.regular,
        padding: 4,
        fontSize: 14,
        borderRadius: 5,
    },
});

export default LoginModal;
