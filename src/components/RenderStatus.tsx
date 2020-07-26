import React from 'react';
import {Text} from 'react-native';
import FONTS from '../res/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../res/colors';

interface Props {
    status: string;
}

function RenderStatus(props: Props) {
    switch (props.status) {
        case 'payed':
            return (
                <FontAwesome
                    name={'check-circle'}
                    size={22}
                    color={COLORS.success}
                />
            );
        case 'not_payed':
            return (
                <FontAwesome
                    size={20}
                    color={'#be0000'}
                    name="exclamation-triangle"
                />
            );
        case 'waiting':
            return (
                <FontAwesome size={20} color={COLORS.darkGrey} name="clock-o" />
            );
        default:
            return null;
    }
}

export default RenderStatus;
