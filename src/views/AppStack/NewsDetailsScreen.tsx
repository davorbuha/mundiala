import React, {Component, useEffect} from 'react';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {NavigationStackOptions} from 'react-navigation-stack';
import {getNavigationOptionsWithAction} from '../../router/navigationHelpers';
import LogoTitle from './components/LogoTitle';
import COLORS from '../../res/colors';
import NavBarItem from '../../components/NavBarItem';
import service from '../../service';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import {NewsById} from '../../types/news';
import FONTS from '../../res/fonts';
import {ScrollView} from 'react-native-gesture-handler';
import {buildUri} from './NewsScreen';

interface Props {
    token: string;
    navigation: StackNavigationProp;
}

interface State {
    data: NewsById | undefined;
}

class NewsDetailsScreen extends Component<Props, State> {
    state = {
        data: undefined,
    };
    componentDidMount() {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        const organisationId = navigation.getParam('organisationId');
        service
            .getNewsById(this.props.token, id, organisationId)
            .then(res => this.setState({data: res.data}));
    }
    public render() {
        const {data}: {data: NewsById} = this.state;
        if (!data) return null;
        return (
            <View style={{flex: 1}}>
                <Image style={style.itemImage} source={buildUri(data.image)} />
                <ScrollView
                    style={{
                        flex: 1,
                    }}
                    bounces={false}
                    contentContainerStyle={[{padding: 16}]}>
                    <Text style={style.titleText}>{data.name}</Text>
                    <View style={style.aboutWrapper}>
                        <Text style={style.aboutText}>
                            Autor: {data.authorName}
                        </Text>
                        <Text style={style.aboutText}>
                            Objavljeno:{' '}
                            {data.createdOn.format('DD.MM.YYYY HH:mm')}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Text style={style.descriptionText}>
                            {data.description}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const win = Dimensions.get('window');

const ratio = win.width / 541;

const style = StyleSheet.create({
    itemImage: {
        aspectRatio: 1, // <-- this
    },
    aboutText: {
        color: COLORS.darkGrey,
        fontSize: 12,
        fontFamily: FONTS.regular,
    },
    aboutWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 14,
        fontFamily: FONTS.regular,
    },
    titleText: {
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: FONTS.bold,
        marginBottom: 14,
    },
});

const mapStateToProps = (state: AppState) => ({
    token: state.user.token,
});

export default connect(mapStateToProps)(NewsDetailsScreen);
