import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import COLORS from '../res/colors';
import Presence from '../types/presence';
import ProgressCircle from 'react-native-progress-circle';

interface Props {
    presence: Presence;
}

function TotalPresence({presence}: Props) {
    const percentage = React.useMemo(
        () => parseFloat(presence.presentPercentage),
        [presence],
    );
    return (
        <View style={style.container}>
            <ProgressCircle
                percent={percentage}
                radius={38}
                borderWidth={8}
                color={COLORS.success}
                shadowColor="#999"
                bgColor="#fff">
                <Text style={{fontSize: 14}}>
                    {presence.presentPercentage}%
                </Text>
            </ProgressCircle>
            <Text
                style={{color: COLORS.darkGrey, fontSize: 24, marginLeft: 30}}>
                {presence.presentCount}/{presence.sumCount}
            </Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'center',
        flexDirection: 'row',
        color: COLORS.white,
        height: 100,
    },
});

export default TotalPresence;
