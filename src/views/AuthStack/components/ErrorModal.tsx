import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import COLORS from '../../../res/colors';
import SHADOWS from '../../../res/shadows';
import FONTS from '../../../res/fonts';

interface Props {
    error: Error | undefined;
    onOkPress: () => void;
}

function ErrorModal(p: Props) {
    return (
        <Modal visible={p.error ? true : false} transparent>
            <TouchableOpacity
                onPress={p.onOkPress}
                activeOpacity={1}
                style={style.container}>
                <TouchableWithoutFeedback>
                    <View style={style.modal}>
                        <View>
                            <Text style={style.title}>Greška</Text>
                            <Text style={style.body}>
                                {renderErrorText(p.error)}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{alignSelf: 'flex-end'}}
                            onPress={p.onOkPress}>
                            <Text style={style.okButton}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        position: 'absolute',
        width: '60%',
        height: 200,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 20,
        ...SHADOWS.primary,
    },
    title: {fontFamily: FONTS.bold, fontSize: 20},
    body: {
        marginTop: 10,
        fontFamily: FONTS.regular,
    },
    okButton: {fontFamily: FONTS.bold},
});

export default ErrorModal;

function renderErrorText(error: Error | undefined): string {
    if (!error) return '';
    switch (error.message) {
        case ERROR_INVALID_LOGIN:
            return 'Pogrešno korisničko ime ili lozinka';
        case CURRENT_PASSWORD_IS_NOT_CORRECT:
            return 'Trenutna lozinka nije ispravna';
        case PASSWORDS_NOT_MATCHING:
            return 'Lozinke se ne podudaraju';
        case PASSWORD_TOO_SHORT:
            return 'Nova lozinka nije dovoljno dugačka (min. 5 znakova)';
        default:
            return error.message;
    }
}

export const ERROR_INVALID_LOGIN = 'invalid_login';
export const CURRENT_PASSWORD_IS_NOT_CORRECT =
    'current_password_is_not_correct';
export const PASSWORDS_NOT_MATCHING = 'passwords_not_matching';
export const PASSWORD_TOO_SHORT = 'password_too_short';
