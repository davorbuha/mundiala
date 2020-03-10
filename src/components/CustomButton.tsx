import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import COLORS from '../res/colors';
import FONTS from '../res/fonts';

interface Props {
    label: JSX.Element;
    onPress: () => void;
    type: string;
}

function CustomButton(p: Props) {
    return (
        <TouchableOpacity
            style={
                p.type === 'success'
                    ? style.successButton
                    : p.type === 'standard'
                    ? style.standardButton
                    : null
            }
            onPress={p.onPress}>
            {p.label}
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    successButton: {
        width: '100%',
        height: 40,
        backgroundColor: COLORS.success,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    standardButton: {
        width: '100%',
        height: 40,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CustomButton;
