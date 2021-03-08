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
    show: boolean;
    onOkPress: () => void;
}

function RegisterSuccessModal(p: Props) {
    return (
        <Modal visible={p.show} transparent>
            <TouchableOpacity
                onPress={p.onOkPress}
                activeOpacity={1}
                style={style.container}>
                <TouchableWithoutFeedback>
                    <View style={style.modal}>
                        <View>
                            <Text style={style.title}>Uspješno</Text>
                            <Text style={style.body}>
                                Pristupni podaci su poslani na email.
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

export default RegisterSuccessModal;
