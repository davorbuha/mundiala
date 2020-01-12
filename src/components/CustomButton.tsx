import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

interface Props {
    title: string;
    onPress: () => void;
}

function CustomButton(p: Props) {
    return (
        <TouchableOpacity onPress={p.onPress}>
            <Text>{p.title}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton;
