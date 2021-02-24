import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import CustomButton from '../../components/CustomButton';
import FONTS from '../../res/fonts';
import Modal from 'react-native-modal';
import {Controller, useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';
import COLORS from '../../res/colors';
import RadioButtonRN from 'radio-buttons-react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import service from '../../service';

interface Props {
    navigation: StackNavigationProp;
}

const fields = {
    topic: 'topic',
    title: 'title',
    body: 'body',
};

function SendPushScreen(p: Props) {
    const [successModal, setSuccessModal] = useState<boolean>(false);
    const state = useSelector((state: AppState) => ({
        token: state.user.token,
        organisationId: state.user.organisations[0].id,
        ptn: state.user.ptn,
    }));
    const {control, handleSubmit} = useForm();
    const submit = handleSubmit(
        (data) =>
            service
                .sendPush(
                    state.token,
                    state.organisationId,
                    data[fields.topic],
                    data[fields.title],
                    data[fields.body],
                )
                .then(() => setSuccessModal(true)).catch,
    );
    return (
        <>
            <Modal
                isVisible={successModal}
                onBackdropPress={() => {
                    setSuccessModal(false);
                    p.navigation.navigate('Home');
                }}>
                <View style={style.modalContent}>
                    <Text style={{...style.title, marginBottom: 16}}>
                        Notifikacija poslana
                    </Text>
                    <CustomButton
                        label={
                            <Text
                                style={{
                                    ...style.text,
                                    marginTop: 0,
                                    marginBottom: 0,
                                }}>
                                Uredu
                            </Text>
                        }
                        type="cancel"
                        onPress={() => {
                            setSuccessModal(false);
                            p.navigation.navigate('Home');
                        }}
                    />
                </View>
            </Modal>
            <ScrollView contentContainerStyle={{flexGrow: 1, padding: 16}}>
                <Text style={style.title}>Slanje Push notifikacije</Text>
                <Controller
                    control={control}
                    name={fields.title}
                    render={({onChange}) => (
                        <TextInput
                            placeholder="Naslov"
                            autoCorrect={false}
                            autoCompleteType="off"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            style={style.textInput}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name={fields.body}
                    render={({onChange}) => (
                        <TextInput
                            numberOfLines={5}
                            multiline
                            placeholder="Opis"
                            autoCorrect={false}
                            autoCompleteType="off"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{
                                height: Dimensions.get('screen').height * 0.1,
                                ...style.textInput,
                            }}
                        />
                    )}
                />
                <Text style={style.text}>Kategorija:</Text>
                <Controller
                    control={control}
                    name={fields.topic}
                    render={({onChange}) => (
                        <RadioButtonRN
                            activeColor={COLORS.primary}
                            data={state.ptn.map((item) => ({
                                label: item.name,
                                value: item.value,
                            }))}
                            selectedBtn={(e) => onChange(e.value)}
                        />
                    )}
                />
                <View style={{marginTop: 16}}>
                    <CustomButton
                        label={<Text>Kreiraj</Text>}
                        type="success"
                        onPress={submit}
                    />
                </View>
            </ScrollView>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 16,
        alignSelf: 'center',
        fontFamily: FONTS.bold,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    text: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        marginBottom: 4,
        marginTop: 8,
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
});

export default SendPushScreen;
