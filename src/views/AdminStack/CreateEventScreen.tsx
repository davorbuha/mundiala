import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import COLORS from '../../res/colors';
import FONTS from '../../res/fonts';
import service from '../../service';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';
import Category from '../../types/category';
import moment from 'moment';
import CustomButton from '../../components/CustomButton';
import CreateEvent from '../../types/createEvent';
import RadioButtonRN from 'radio-buttons-react-native';
import Modal from 'react-native-modal';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';

const fields = {
    title: 'title',
    description: 'description',
    category: 'category',
    season: 'season',
    date: 'date',
    type: 'type',
};

const radioData = [
    {
        label: 'Trening',
        value: 'training',
    },
    {
        label: 'Događaj',
        value: 'event',
    },
];

interface Props {
    navigation: StackNavigationProp;
}

function CreateEventScreen(p: Props) {
    const state = useSelector((state: AppState) => ({
        organisationId: state.user.organisations[0].id,
        token: state.user.token,
    }));
    const [categories, setCategories] = useState<Category[]>([]);
    const [successModal, setSuccessModal] = useState<boolean>(false);
    React.useEffect(() => {
        service
            .getCategories(state.token, state.organisationId)
            .then(setCategories).catch;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const {control, handleSubmit, watch} = useForm();
    const submit = handleSubmit((data) => {
        service
            .createEvent(
                new CreateEvent(
                    data[fields.category],
                    data[fields.date],
                    'event',
                    data[fields.title],
                    data[fields.description],
                ),
                state.organisationId,
                state.token,
            )
            .then(() => setSuccessModal(true)).catch;
    });
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
                        Događaj Kreiran
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
                <Text style={style.title}>Kreiranje novog događaja</Text>
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
                    name={fields.description}
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
                    name={fields.category}
                    render={({onChange}) => (
                        <RadioButtonRN
                            activeColor={COLORS.primary}
                            data={categories.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            selectedBtn={(e) => onChange(e.value)}
                        />
                    )}
                />
                <Text style={style.text}>Vrsta događaja:</Text>
                <Controller
                    control={control}
                    name={fields.type}
                    render={({onChange}) => (
                        <RadioButtonRN
                            activeColor={COLORS.primary}
                            data={radioData}
                            selectedBtn={(e) => onChange(e.value)}
                        />
                    )}
                />
                <Text style={{...style.text, marginBottom: 0}}>Datum:</Text>
                <Controller
                    control={control}
                    name={fields.date}
                    defaultValue={moment()}
                    render={({onChange, value}) => (
                        <DatePicker
                            date={value.toDate()}
                            style={{alignSelf: 'center', marginVertical: 8}}
                            mode="datetime"
                            onDateChange={(date) => onChange(moment(date))}
                        />
                    )}
                />
                <CustomButton
                    label={<Text>Kreiraj</Text>}
                    type="success"
                    onPress={submit}
                />
            </ScrollView>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
    title: {
        fontSize: 16,
        alignSelf: 'center',
        fontFamily: FONTS.bold,
        fontWeight: 'bold',
        marginBottom: 16,
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

export default CreateEventScreen;
