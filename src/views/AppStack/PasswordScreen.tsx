import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Table, Rows} from 'react-native-table-component';
import {TextInput} from 'react-native-gesture-handler';
import FONTS from '../../res/fonts';
import SHADOWS from '../../res/shadows';
import CustomButton from '../../components/CustomButton';
import COLORS from '../../res/colors';
import DismissKeyboard from '../../components/DismissKeyboard';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import service from '../../service';
import {NavigationStackProp} from 'react-navigation-stack';
import ErrorModal, {
    CURRENT_PASSWORD_IS_NOT_CORRECT,
    PASSWORDS_NOT_MATCHING,
} from '../AuthStack/components/ErrorModal';

interface Props {
    navigation: NavigationStackProp;
    token: string;
    organisationId: number;
    password: string;
}

interface State {
    currentPassword: string;
    newPassword: string;
    repeatedPassword: string;
    error: Error;
}

class PasswordScreen extends Component<Props, State> {
    state: State = {
        currentPassword: '',
        newPassword: '',
        repeatedPassword: '',
        error: null,
    };
    public handleSavePress = () => {
        const {token, organisationId} = this.props;
        if (this.state.currentPassword !== this.props.password) {
            this.setState({error: new Error(CURRENT_PASSWORD_IS_NOT_CORRECT)});
            return;
        }
        if (this.state.newPassword !== this.state.repeatedPassword) {
            this.setState({error: new Error(PASSWORDS_NOT_MATCHING)});
            return;
        }
        service
            .changePassword(token, organisationId, this.state.newPassword)
            .then(res => {
                if (res) {
                    this.props.navigation.navigate('MyAccount');
                }
            })
            .catch(e => this.setState({error: new Error(e.message)}));
    };
    public render() {
        const {currentPassword, repeatedPassword, newPassword} = this.state;
        const rowData = [
            [
                'Trenutna lozinka',
                <View style={{marginLeft: 10, width: '90%', marginBottom: 26}}>
                    <TextInput
                        value={currentPassword}
                        onChangeText={t => this.setState({currentPassword: t})}
                        autoCapitalize="none"
                        secureTextEntry
                        style={style.textInputStyle}
                    />
                </View>,
            ],
            [
                'Nova Lozinka',
                <View style={{marginLeft: 10, width: '90%', marginBottom: 26}}>
                    <TextInput
                        value={newPassword}
                        onChangeText={t => this.setState({newPassword: t})}
                        autoCapitalize="none"
                        secureTextEntry
                        style={style.textInputStyle}
                    />
                </View>,
            ],
            [
                'Potvrda Lozinke',
                <View style={{marginLeft: 10, width: '90%', marginBottom: 26}}>
                    <TextInput
                        value={repeatedPassword}
                        onChangeText={t => this.setState({repeatedPassword: t})}
                        autoCapitalize="none"
                        secureTextEntry
                        style={style.textInputStyle}
                    />
                </View>,
            ],
        ];

        return (
            <DismissKeyboard>
                <View style={{flex: 1, backgroundColor: 'white', padding: 20}}>
                    <ErrorModal
                        onOkPress={() => this.setState({error: undefined})}
                        error={this.state.error}
                    />
                    <Table>
                        <Rows
                            textStyle={{textAlign: 'center', marginBottom: 26}}
                            data={rowData}
                        />
                    </Table>
                    <View style={{marginTop: 20}}>
                        <CustomButton
                            type="success"
                            label={
                                <Text
                                    style={{
                                        fontFamily: FONTS.bold,
                                        fontSize: 14,
                                        color: COLORS.darkGrey,
                                    }}>
                                    Spremi Lozinku
                                </Text>
                            }
                            onPress={this.handleSavePress}
                        />
                    </View>
                </View>
            </DismissKeyboard>
        );
    }
}

const style = StyleSheet.create({
    textInputStyle: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        padding: 0,
        paddingHorizontal: 4,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
    },
});

const mapStateToProps = (state: AppState) => ({
    token: state.user.token,
    organisationId: state.user.organisations[0].id,
    password: state.user.password,
});

export default connect(mapStateToProps)(PasswordScreen);
