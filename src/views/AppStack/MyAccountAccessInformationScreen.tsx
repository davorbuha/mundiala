import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from 'react-native';
import {NavigationStackOptions} from 'react-navigation-stack';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import Account from '../../types/account';
import {Table, Rows} from 'react-native-table-component';
import FONTS from '../../res/fonts';
import COLORS from '../../res/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface Props {
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
                <TouchableOpacity
                    onPress={() =>
                        this.setState(state => ({
                            showChangePasswordModal: !state.showChangePasswordModal,
                        }))
                    }
                    style={{backgroundColor: 'red', width: '100%', height: 40}}>
                    <Text>Lozinka</Text>
                </TouchableOpacity>
                {renderModal(this.state.showChangePasswordModal)}
            </View>
        );
    }
}

const renderModal = (showModal: boolean) => {
    return (
        <Modal transparent visible={showModal}>
            <TouchableOpacity
                style={{flex: 1}}
                activeOpacity={1}></TouchableOpacity>
        </Modal>
    );
};

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
        width: '100%',
        backgroundColor: COLORS.lightGrey,
        borderRadius: 4,
    },
});

const mapStateToProps = (state: AppState) => ({
    account: state.user.account,
});

export default connect(mapStateToProps)(MyAccountAccessInformationScreen);
