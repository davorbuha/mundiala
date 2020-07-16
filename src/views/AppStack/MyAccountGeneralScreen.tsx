import React, {Component} from 'react';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {NavigationStackOptions} from 'react-navigation-stack';
import COLORS from '../../res/colors';
import {View, StyleSheet, Image, Platform, Text} from 'react-native';
import service from '../../service';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import Account from '../../types/account';
import FONTS from '../../res/fonts';
import {Table, Rows} from 'react-native-table-component';
import {Dispatch} from 'redux';
import {setAccount} from '../../userReducer/actions';
import CustomButton from '../../components/CustomButton';
import {deleteCredentials} from '../../asyncStorage';
import {showBackground} from '../../backgroundReducer/actions';

interface Props {
    token: string;
    organisationId: number;
    navigation: StackNavigationProp;
    account: Account | undefined;
    dispatch: Dispatch;
}

class MyAccountGeneralScreen extends Component<Props> {
    static navigationOptions(): NavigationStackOptions {
        return {
            title: 'Općenito',
        };
    }

    public componentDidMount() {
        const {token, organisationId} = this.props;
        service
            .getUserProfile(token, organisationId)
            .then(res => this.props.dispatch(setAccount(res)))
            .catch(e => {
                this.props.navigation.goBack();
            });
    }

    public render() {
        const {account} = this.props;
        if (!account) return null;
        return (
            <View style={{flex: 1, padding: 20}}>
                {renderTable(account)}
                <CustomButton
                    type="success"
                    onPress={async () => {
                        this.props.dispatch(showBackground());
                        await deleteCredentials();
                        this.props.navigation.navigate('Auth');
                    }}
                    label={
                        <Text
                            style={{
                                fontFamily: FONTS.bold,
                                fontSize: 14,
                                color: COLORS.darkGrey,
                            }}>
                            Logout
                        </Text>
                    }
                />
            </View>
        );
    }
}

const renderTable = (account: Account) => {
    const rowData = [
        [
            'Profilna fotografija: ',
            <Image
                resizeMode="cover"
                style={style.itemImage}
                source={{
                    uri:
                        'https://app.mundiala.com/upload/images/members/small_' +
                        account.image,
                }}
            />,
        ],
        ['Ime *', account.firstName],
        ['Prezime *', account.lastName],
        ['OIB *', account.oib],
        ['E-mail *', account.email],
        ['Adresa *', account.address],
        ['Kontakt telefon *', account.tel],
        ['Datum rođenja *', account.dateOfBirth.format('DD.MM.YYYY')],
        ['Pozicija ', account.playPosition],
    ];
    return (
        <Table>
            <Rows textStyle={style.regularText} data={rowData} />
        </Table>
    );
};

const style = StyleSheet.create({
    regularText: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        marginBottom: 16,
        alignSelf: 'center',
        textAlign: 'center',
    },
    titleText: {
        alignSelf: 'center',
        fontFamily: FONTS.bold,
        fontSize: 16,
        marginBottom: 16,
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.lightGrey,
        marginBottom: 16,
    },
    itemImage: {
        borderRadius: Platform.OS === 'ios' ? 30 : 60,
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginBottom: 16,
    },
});

const mapStateToProps = (state: AppState) => ({
    token: state.user.token,
    organisationId: state.user.organisations[0].id,
    account: state.user.account,
});

export default connect(mapStateToProps)(MyAccountGeneralScreen);
