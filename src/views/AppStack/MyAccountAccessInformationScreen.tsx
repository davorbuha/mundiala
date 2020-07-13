import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {
    NavigationStackOptions,
    NavigationStackProp,
} from 'react-navigation-stack';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import Account from '../../types/account';
import {Table, Rows} from 'react-native-table-component';
import FONTS from '../../res/fonts';
import COLORS from '../../res/colors';
import CustomButton from '../../components/CustomButton';
import SHADOWS from '../../res/shadows';

interface Props {
    navigation: NavigationStackProp;
    account: Account | undefined;
    email: string;
}

interface State {
    showChangePasswordModal: boolean;
}

class MyAccountAccessInformationScreen extends Component<Props, State> {
    state: State = {
        showChangePasswordModal: false,
    };
    static navigationOptions(): NavigationStackOptions {
        return {
            title: 'Pristupne informacije',
        };
    }
    public render() {
        const {account} = this.props;
        if (!account) return null;
        return (
            <View style={{flex: 1, padding: 20}}>
                {renderTable(account, this.props.email)}
                <CustomButton
                    type="success"
                    label={
                        <Text
                            style={{
                                fontFamily: FONTS.bold,
                                fontSize: 14,
                                color: COLORS.darkGrey,
                            }}>
                            Lozinka
                        </Text>
                    }
                    onPress={() => {
                        this.props.navigation.navigate('PasswordScreen');
                    }}
                />
            </View>
        );
    }
}

const renderTable = (account: Account, email: string) => {
    const rowData = [
        [
            'Ime',
            <TextInput
                style={[style.regularText, style.inputStyle]}
                editable={false}
                value={account.firstName}
            />,
        ],
        [
            'Prezime',
            <TextInput
                style={[style.regularText, style.inputStyle]}
                editable={false}
                value={account.lastName}
            />,
        ],
        [
            'Email',
            <TextInput
                style={[style.regularText, style.inputStyle]}
                editable={false}
                value={email}
            />,
        ],
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
    inputStyle: {
        borderColor: COLORS.darkGrey,
        borderWidth: 1,
        marginRight: 40,
        width: '100%',
        backgroundColor: COLORS.lightGrey,
        borderRadius: 4,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        position: 'absolute',
        width: '60%',
        height: 200,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 20,
        ...SHADOWS.primary,
    },
    title: {fontFamily: FONTS.bold, fontSize: 20},
    body: {
        marginTop: 10,
        fontFamily: FONTS.regular,
    },
    okButton: {fontFamily: FONTS.bold},
});

const mapStateToProps = (state: AppState) => ({
    account: state.user.account,
    email: state.user.email,
});

export default connect(mapStateToProps)(MyAccountAccessInformationScreen);
