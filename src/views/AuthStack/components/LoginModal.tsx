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
    TouchableOpacity,
} from 'react-native';
import FONTS from '../../../res/fonts';
import COLORS from '../../../res/colors';
import DismissKeyboard from '../../../components/DismissKeyboard';
import CustomButton from '../../../components/CustomButton';
import RegisterSuccessModal from './RegisterSuccessModal';

interface Props {
    email: string;
    password: string;
    setEmail: (e: string) => void;
    setPassword: (p: string) => void;
    visible: boolean;
    onLoginPress: () => void;
    loading: {[name: string]: boolean};
    onRegisterPress: (email: string, then: () => void) => void;
    showRegisterSuccess: boolean;
    onOkRegisterPress: () => void;
}

interface LoginModalContentProps extends Props {
    onRegisterPress: () => void;
}

interface RegisterModalContentProps {
    onBackPress: () => void;
    onRegisterPress: (email: string, then: () => void) => void;
}

const buttonLabel = (loading: boolean, title?: string) => {
    if (loading) {
        return <ActivityIndicator size="small" />;
    }
    return (
        <Text style={style.successButtonText}>
            {title ? title : 'Prijavi se'}
        </Text>
    );
};

function RegisterModalContent(p: RegisterModalContentProps) {
    const [email, setEmail] = React.useState('');
    const [loading] = React.useState(false);
    return (
        <View style={style.modalWrapper}>
            <Image
                resizeMethod="auto"
                resizeMode="contain"
                style={{
                    marginTop: 16,
                    height: 50,
                    width: Dimensions.get('screen').width * 0.5,
                }}
                source={require('../../../res/images/logo-login2.png')}></Image>
            <Text
                style={{
                    fontFamily: FONTS.regular,
                    color: COLORS.white,
                    fontSize: 20,
                    marginBottom: 20,
                }}>
                Registracija
            </Text>
            <TextInput
                placeholder="Email"
                autoCorrect={false}
                autoCompleteType="off"
                autoCapitalize="none"
                style={style.textInput}
                value={email}
                onChangeText={setEmail}
            />
            <CustomButton
                type="success"
                label={buttonLabel(loading, 'Registriraj se')}
                onPress={() => p.onRegisterPress(email, () => p.onBackPress())}
            />
            <View style={{marginTop: 16, width: '100%'}}>
                <TouchableOpacity onPress={p.onBackPress}>
                    <Text
                        style={{
                            alignSelf: 'center',
                            marginTop: -8,
                            fontFamily: FONTS.regular,
                            color: COLORS.white,
                            fontSize: 16,
                            marginBottom: 4,
                        }}>
                        Nazad
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function LoginModalContent(p: LoginModalContentProps) {
    return (
        <View style={style.modalWrapper}>
            <Image
                resizeMethod="auto"
                resizeMode="contain"
                style={{
                    marginTop: 16,
                    height: 50,
                    width: Dimensions.get('screen').width * 0.5,
                }}
                source={require('../../../res/images/logo-login2.png')}></Image>
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
                placeholder="Email"
                autoCorrect={false}
                autoCompleteType="off"
                autoCapitalize="none"
                style={style.textInput}
                value={p.email}
                onChangeText={p.setEmail}
            />
            <TextInput
                placeholder="Lozinka"
                textContentType="password"
                secureTextEntry={true}
                autoCorrect={false}
                autoCompleteType="off"
                autoCapitalize="none"
                style={style.textInput}
                value={p.password}
                onChangeText={p.setPassword}
            />
            <TouchableOpacity>
                <Text
                    style={{
                        marginTop: -8,
                        fontFamily: FONTS.regular,
                        color: COLORS.white,
                        fontSize: 16,
                        marginBottom: 28,
                    }}>
                    Zaboravili ste lozinku?
                </Text>
            </TouchableOpacity>
            <CustomButton
                type="success"
                label={buttonLabel(p.loading.login)}
                onPress={p.onLoginPress}
            />
            <View style={{marginTop: 16, width: '100%'}}>
                <TouchableOpacity onPress={p.onRegisterPress}>
                    <Text
                        style={{
                            alignSelf: 'center',
                            marginTop: -8,
                            fontFamily: FONTS.regular,
                            color: COLORS.white,
                            fontSize: 16,
                            marginBottom: 4,
                        }}>
                        Registriraj se
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function LoginModal(p: Props) {
    const [isLogin, setIsLogin] = React.useState(true);
    const onRegisterPress = () => {
        setIsLogin(false);
    };
    return (
        <>
            {p.showRegisterSuccess ? (
                <RegisterSuccessModal
                    onOkPress={p.onOkRegisterPress}
                    show={p.showRegisterSuccess}
                />
            ) : null}
            <Modal animationType="slide" transparent visible={p.visible}>
                <DismissKeyboard>
                    <KeyboardAvoidingView
                        behavior="height"
                        style={style.modalContainer}>
                        {isLogin ? (
                            <LoginModalContent
                                {...p}
                                onRegisterPress={onRegisterPress}
                            />
                        ) : (
                            <RegisterModalContent
                                onRegisterPress={p.onRegisterPress}
                                onBackPress={() => setIsLogin(true)}
                            />
                        )}
                    </KeyboardAvoidingView>
                </DismissKeyboard>
            </Modal>
        </>
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
        width: '80%',
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
        fontSize: 16,
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
