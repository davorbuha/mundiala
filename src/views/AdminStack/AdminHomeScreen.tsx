import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import COLORS from '../../res/colors';
import FONTS from '../../res/fonts';
import SHADOWS from '../../res/shadows';

const height = Dimensions.get('screen').height;

interface Props {
    navigation: StackNavigationProp;
}

function AdminHomeScreen(props: Props) {
    return (
        <View style={style.container}>
            <TouchableOpacity
                style={style.touchableWrapper}
                onPress={() => props.navigation.navigate('CreateEvent')}>
                <View style={style.itemWrapper}>
                    <MaterialIcons
                        name="event-available"
                        size={height * 0.1}
                        color="#fff"
                    />
                </View>
                <Text style={style.itemTitle}>Kreiraj događaj</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={style.touchableWrapper}
                onPress={() => props.navigation.navigate('SendPush')}>
                <View style={style.itemWrapper}>
                    <MaterialIcons
                        name="event-available"
                        size={height * 0.1}
                        color="#fff"
                    />
                </View>
                <Text style={style.itemTitle}>Pošalji notifikaciju</Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    touchableWrapper: {
        marginHorizontal: 8,
        marginBottom: 42,
        alignItems: 'center',
        width: '40%',
    },
    itemWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: height * 0.15,
        backgroundColor: COLORS.primary,
        opacity: 0.2,
        borderRadius: 20,
        ...SHADOWS.primary,
    },
    itemTitle: {
        fontSize: 14,
        fontFamily: FONTS.bold,
        marginTop: 10,
    },
});

export default AdminHomeScreen;
