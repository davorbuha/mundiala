import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../res/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import SHADOWS from '../../res/shadows';
import FONTS from '../../res/fonts';
import {connect} from 'react-redux';
import {AppState} from '../../store';

interface Props {
    navigation: any;
    admin: boolean;
}

const height = Dimensions.get('screen').height;

class HomeScreen extends Component<Props> {
    public render() {
        return (
            <View style={style.container}>
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
                    onPress={() => this.props.navigation.navigate('Pressence')}>
                    <View style={style.itemWrapper}>
                        <MaterialIcons
                            name="event-available"
                            size={height * 0.1}
                            color="#fff"
                        />
                    </View>
                    <Text style={style.itemTitle}>Prisutnost</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.touchableWrapper}
                    onPress={() => this.props.navigation.navigate('Billing')}>
                    <View style={style.itemWrapper}>
                        <MaterialIcons
                            name="local-atm"
                            size={height * 0.1}
                            color="#fff"
                        />
                    </View>
                    <Text style={style.itemTitle}>Članarina</Text>
                </TouchableOpacity>
                {this.props.admin ? (
                    <TouchableOpacity
                        style={style.touchableWrapper}
                        onPress={() => this.props.navigation.navigate('Admin')}>
                        <View style={style.itemWrapper}>
                            <MaterialIcons
                                name="local-atm"
                                size={height * 0.1}
                                color="#fff"
                            />
                        </View>
                        <Text style={style.itemTitle}>Admin</Text>
                    </TouchableOpacity>
                ) : null}
                {this.props.admin ? (
                    <View style={style.touchableWrapper}></View>
                ) : null}
            </View>
        );
    }
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
        fontSize: 16,
        fontFamily: FONTS.bold,
        marginTop: 10,
    },
    touchableWrapper: {
        marginHorizontal: 8,
        marginBottom: 42,
        alignItems: 'center',
        width: '40%',
    },
});

const mapStateToProps = (state: AppState) => ({
    admin: state.user.admin,
});

export default connect(mapStateToProps)(HomeScreen);
