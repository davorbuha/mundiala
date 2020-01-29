import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import {getNavigationOptionsWithAction} from '../../router/navigationHelpers';
import LogoTitle from './components/LogoTitle';
import COLORS from '../../res/colors';
import NavBarItem from '../../components/NavBarItem';
import {NavigationStackOptions} from 'react-navigation-stack';
import service from '../../service';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import Organization from '../../types/organization';
import {NewsReply, News} from '../../types/news';
import FONTS from '../../res/fonts';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';

interface Props {
    organisations: Organization[];
    token: string;
    navigation: StackNavigationProp;
}

interface State {
    data: NewsReply | undefined;
}

class NewsScreen extends Component<Props, State> {
    state = {
        data: undefined,
    };
    static navigationOptions(p: any): NavigationStackOptions {
        return getNavigationOptionsWithAction(
            () => <LogoTitle />,
            COLORS.primary,
            'white',
            () => (
                <NavBarItem
                    onPress={() => p.navigation.goBack()}
                    iconName="arrow-left"
                />
            ),
        );
    }
    public componentDidMount() {
        const {organisations, token} = this.props;
        service
            .getNews(organisations[0].id, token, 0, 10)
            .then(res => this.setState({data: res}));
    }
    public render() {
        if (!this.state.data) {
            return null;
        }
        return (
            <View style={style.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    renderItem={RenderFlatListItem(this.props.navigation)}
                    ListFooterComponent={RenderFooterComponent}
                    data={this.state.data.data}
                />
            </View>
        );
    }
}

const RenderFooterComponent = () => {
    return (
        <View style={style.loadMoreContainer}>
            <TouchableOpacity style={style.loadMoreButton}>
                <Text style={style.loadMoreText}>LOAD MORE</Text>
            </TouchableOpacity>
        </View>
    );
};

const RenderFlatListItem = (navigation: StackNavigationProp) => (
    item: ListRenderItemInfo<News>,
) => (
    <TouchableOpacity
        onPress={() =>
            navigation.navigate('NewsDetails', {
                id: item.item.id,
                organisationId: item.item.organisationId,
            })
        }>
        <View style={style.rowContainer}>
            <Image
                resizeMode="stretch"
                style={style.itemImage}
                source={{
                    uri:
                        'https://app.mundiala.com/upload/ourteam/news/small_' +
                        item.item.image,
                }}
            />
            <View style={style.container}>
                <Text style={style.itemTitle}>{item.item.name}</Text>
                <Text>{item.item.description}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadMoreContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    loadMoreButton: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadMoreText: {
        fontSize: 14,
        fontFamily: FONTS.bold,
        color: COLORS.white,
    },
    itemTitle: {
        fontSize: 16,
        fontFamily: FONTS.bold,
    },
    itemBody: {
        fontSize: 12,
        fontFamily: FONTS.regular,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    rowContainer: {
        width: '100%',
        padding: 16,
        flexDirection: 'row',
        borderColor: COLORS.lightGrey,
        borderBottomWidth: 1,
        alignItems: 'center',
    },
});

const mapStateToProps = (state: AppState) => ({
    token: state.user.token,
    organisations: state.user.organisations,
});

export default connect(mapStateToProps)(NewsScreen);
