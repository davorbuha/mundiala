import React, {Component, useEffect} from 'react';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {View, Text, Image, StyleSheet} from 'react-native';
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
            <View>
                <Image
                    resizeMode="stretch"
                    style={style.itemImage}
                    source={{
                        uri:
                            'https://app.mundiala.com/upload/ourteam/news/' +
                            data.image,
                    }}
                />
                <View style={[style.container, {padding: 16}]}>
                    <Text style={style.titleText}>{data.name}</Text>
                    <View style={style.aboutWrapper}>
                        <Text style={style.aboutText}>
                            Autor: {data.authorName}
                        </Text>
                        <Text style={style.aboutText}>
                            Objavljeno:{' '}
                            {data.createdOn.format('YYYY.MM.DD HH:mm')}
                        </Text>
                    </View>
                    <Text style={style.descriptionText}>
                        {data.description}
                    </Text>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemImage: {
        width: '100%',
        height: '60%',
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
