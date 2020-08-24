import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Linking,
    AppState as RNAppState,
    RefreshControl,
} from 'react-native';
import COLORS from '../../res/colors';
import service from '../../service';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import Organization from '../../types/organization';
import {NewsReply, News} from '../../types/news';
import FONTS from '../../res/fonts';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {NavigationEvents} from 'react-navigation';
import Banner from '../../types/banner';
import SCImage from 'react-native-scalable-image';

interface Props {
    organisations: Organization[];
    token: string;
    navigation: StackNavigationProp;
    banners: Banner[];
}

interface State {
    refreshing: boolean;
    bannerIndex?: number;
    page: number;
    data: NewsReply | undefined;
}

class NewsScreen extends Component<Props, State> {
    state = {
        refreshing: false,
        bannerIndex: undefined,
        page: 0,
        data: undefined,
    };
    public componentDidMount() {
        RNAppState.addEventListener('change', () => {
            service
                .getNews(organisations[0].id, token, this.state.page, 10)
                .then(res => this.setState({data: res}));
        });
        this.setState({
            bannerIndex: Math.floor(Math.random() * this.props.banners.length),
        });
        const {organisations, token} = this.props;
        service
            .getNews(organisations[0].id, token, this.state.page, 10)
            .then(res => this.setState({data: res}));
    }
    public onRefresh = () => {
        const {organisations, token} = this.props;
        this.setState({refreshing: true});
        service
            .getNews(organisations[0].id, token, this.state.page, 10)
            .then(res => this.setState({data: res, refreshing: false}));
    };

    public onLoadMorePress = () => {
        const {organisations, token} = this.props;
        service
            .getNews(organisations[0].id, token, this.state.page + 1, 10)
            .then(res =>
                this.setState(state => ({
                    data: new NewsReply([...state.data.data, ...res.data]),
                    page: state.page + 1,
                })),
            );
    };
    public render() {
        if (!this.state.data) {
            return null;
        }
        return (
            <View style={style.container}>
                <NavigationEvents
                    onDidFocus={() => {
                        this.setState({
                            bannerIndex: Math.floor(
                                Math.random() * this.props.banners.length,
                            ),
                        });
                    }}
                />
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    renderItem={RenderFlatListItem(this.props.navigation)}
                    ListFooterComponent={RenderFooterComponent(
                        this.onLoadMorePress,
                    )}
                    data={this.state.data.data}
                />
                {this.state.bannerIndex !== undefined &&
                this.props.banners.length > 0 ? (
                    <TouchableOpacity
                        onPress={() =>
                            Linking.openURL(
                                this.props.banners[this.state.bannerIndex]
                                    .action,
                            )
                        }>
                        <SCImage
                            width={Dimensions.get('window').width}
                            source={{
                                uri: this.props.banners[this.state.bannerIndex]
                                    .banner,
                            }}
                        />
                    </TouchableOpacity>
                ) : null}
            </View>
        );
    }
}

const RenderFooterComponent = (onLoadMorePress: () => void) => () => {
    return (
        <View style={style.loadMoreContainer}>
            <TouchableOpacity
                onPress={onLoadMorePress}
                style={style.loadMoreButton}>
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
                resizeMode="contain"
                style={style.itemImage}
                source={buildUri(item.item.image)}
            />
            <View style={style.container}>
                <Text style={style.itemTitle}>{item.item.name}</Text>
                <Text>{item.item.description}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

export function buildUri(image: string | undefined) {
    if (image)
        return {
            uri: 'https://app.mundiala.com/upload/ourteam/news/small_' + image,
        };
    return require('../../res/images/placeholder.png');
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    ad: {width: '100%'},
    loadMoreContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
        lineHeight: 20,
        fontSize: 16,
        fontFamily: FONTS.bold,
    },
    itemBody: {
        fontSize: 12,
        fontFamily: FONTS.regular,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
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
    banners: state.user.banners,
});

export default connect(mapStateToProps)(NewsScreen);
