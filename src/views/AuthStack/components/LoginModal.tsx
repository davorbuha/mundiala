import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
} from 'react-native';
import FONTS from '../../../res/fonts';
import COLORS from '../../../res/colors';
import DismissKeyboard from '../../../components/DismissKeyboard';
import CustomButton from '../../../components/CustomButton';

interface Props {
    email: string;
    password: string;
    setEmail: (e: string) => void;
    setPassword: (p: string) => void;
    visible: boolean;
    onLoginPress: () => void;
    loading: {[name: string]: boolean};
}

const buttonLabel = (loading: boolean) => {
    if (loading) {
        return <ActivityIndicator size="small" />;
    }
    return <Text style={style.successButtonText}>Prijavi se</Text>;
};

function LoginModal(p: Props) {
    return (
        <Modal animationType="slide" transparent visible={p.visible}>
            <DismissKeyboard>
                <KeyboardAvoidingView
                    behavior="height"
                    style={style.modalContainer}>
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
                            autoCorrect={false}
                            autoCompleteType="off"
                            autoCapitalize="none"
                            style={style.textInput}
                            value={p.email}
                            onChangeText={p.setEmail}
                        />
                        <TextInput
                            textContentType="password"
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCompleteType="off"
                            autoCapitalize="none"
                            style={style.textInput}
                            value={p.password}
                            onChangeText={p.setPassword}
                        />
                        <CustomButton
                            type="success"
                            label={buttonLabel(p.loading.login)}
                            onPress={p.onLoginPress}
                        />
                    </View>
                </KeyboardAvoidingView>
            </DismissKeyboard>
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
        marginBottom: 16,
    },
    successButtonText: {
        color: COLORS.darkGrey,
        fontFamily: FONTS.regular,
        fontSize: 16,
    },
});

export default LoginModal;
