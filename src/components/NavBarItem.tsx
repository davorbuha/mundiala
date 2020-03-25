import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../res/colors';

interface Props {
    iconName: string;
    onPress: () => void;
}

class NavBarItem extends Component<Props> {
    render() {
        const {iconName, onPress} = this.props;
        return (
            <TouchableOpacity
                style={{paddingHorizontal: 20}}
                onPress={() => onPress()}>
                <Icon name={iconName} size={20} color={COLORS.primary} />
            </TouchableOpacity>
        );
    }
}

export default NavBarItem;
