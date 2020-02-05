import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
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
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomButton from '../../components/CustomButton';
import SHADOWS from '../../res/shadows';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

interface Props {
    navigation: NavigationStackProp;
    account: Account | undefined;
}

interface State {
    showChangePasswordModal: boolean;
}

class MyAccountAccessInformationScreen extends Component<Props, State> {
    state: State = {
        showChangePasswordModal: false,
    };
    static navigationOptions(p: Props): NavigationStackOptions {
        return {
            title: 'Pristupne informacije',
        };
    }
    public render() {
        const {account} = this.props;
        if (!account) return null;
        return (
            <View style={{flex: 1, padding: 20}}>
                {renderTable(account)}
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

const renderTable = (account: Account) => {
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
                value={account.email}
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
});

export default connect(mapStateToProps)(MyAccountAccessInformationScreen);
