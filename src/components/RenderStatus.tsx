import React from 'react';
import {Text} from 'react-native';
import FONTS from '../res/fonts';

interface Props {
    status: string;
}

function RenderStatus(props: Props) {
    switch (props.status) {
        case 'payed':
            return (
                <Text style={{fontFamily: FONTS.regular, color: '#009900'}}>
                    Plaćeno
                </Text>
            );
        case 'not_payed':
            return (
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        color: '#990000',
                    }}>
                    Dug
                </Text>
            );
        case 'waiting':
            return (
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        color: '#FF7F00',
                    }}>
                    Nije dospijelo
                </Text>
            );
        default:
            return null;
    }
}

export default RenderStatus;
