import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
import COLORS from '../../res/colors';
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
    page: number;
    data: NewsReply | undefined;
}

class NewsScreen extends Component<Props, State> {
    state = {
        page: 0,
        data: undefined,
    };
    public componentDidMount() {
        const {organisations, token} = this.props;
        service
            .getNews(organisations[0].id, token, this.state.page, 10)
            .then(res => this.setState({data: res}));
    }
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
    componentDidUpdate(prevprops, prevstate) {
        console.log(prevstate, this.state);
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
                    ListFooterComponent={RenderFooterComponent(
                        this.onLoadMorePress,
                    )}
                    data={this.state.data.data}
                />
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
                resizeMode="cover"
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
        borderRadius: Platform.OS === 'ios' ? 30 : 60,
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
