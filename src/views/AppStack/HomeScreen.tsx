import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import COLORS from '../../res/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import SHADOWS from '../../res/shadows';
import FONTS from '../../res/fonts';

interface Props {
    navigation: any;
}

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

class HomeScreen extends Component<Props> {
    public render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 50,
                    justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                    style={style.touchableWrapper}
                    onPress={() => this.props.navigation.navigate('News')}>
                    <View style={style.itemWrapper}>
                        <Icon
                            name="newspaper-o"
                            size={height * 0.1}
                            color="#fff"
                        />
                    </View>
                    <Text style={style.itemTitle}>Novosti</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.touchableWrapper}
                    onPress={() => this.props.navigation.navigate('Calendar')}>
                    <View style={style.itemWrapper}>
                        <Icon
                            name="calendar"
                            size={height * 0.1}
                            color="#fff"
                        />
                    </View>
                    <Text style={style.itemTitle}>Kalendar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.touchableWrapper}
                    onPress={() => this.props.navigation.navigate('MyAccount')}>
                    <View style={style.itemWrapper}>
                        <Icon name="user-o" size={height * 0.1} color="#fff" />
                    </View>
                    <Text style={style.itemTitle}>Moj Račun</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    itemWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.45,
        height: height * 0.15,
        backgroundColor: COLORS.primary,
        opacity: 0.2,
        borderRadius: 20,
        ...SHADOWS.primary,
    },
    itemTitle: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        marginTop: 10,
    },
    touchableWrapper: {alignItems: 'center'},
});

export default HomeScreen;
