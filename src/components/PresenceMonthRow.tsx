/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../res/colors';
import FONTS from '../res/fonts';
import PresenceMonth from '../types/presenceMonth';
import {useDimensions} from '@react-native-community/hooks';

interface Props {
    month: PresenceMonth;
    activePresence: string;
    setActivePresence: (s: string) => void;
}

const CELL_WIDTH = 100;

function PresenceMonthRow(props: Props) {
    const {screen} = useDimensions();
    const height = React.useRef(new Animated.Value(46));
    React.useEffect(() => {
        if (props.activePresence === props.month.month) {
            const cellsInRow = Math.floor(screen.width / CELL_WIDTH);
            let numOfRows = Math.floor(
                props.month.trainings.length / cellsInRow,
            );
            if (props.month.trainings.length % cellsInRow !== 0) {
                numOfRows++;
            }
            const toValue = numOfRows * 50 + 46;
            Animated.timing(height.current, {
                toValue: toValue,
                duration: 500,
            }).start();
        } else {
            if (height.current !== new Animated.Value(46)) {
                Animated.timing(height.current, {
                    toValue: 46,
                    duration: 500,
                }).start();
            }
        }
    }, [props.activePresence, props.month]);
    return (
        <Animated.View style={{...style.container, height: height.current}}>
            <TouchableHighlight
                style={{
                    height: 46,
                    justifyContent: 'center',
                }}
                underlayColor={COLORS.lightGrey}
                onPress={() => {
                    if (props.activePresence === props.month.month) {
                        props.setActivePresence(undefined);
                    } else {
                        props.setActivePresence(props.month.month);
                    }
                }}>
                <View style={style.rowWrapper}>
                    <Text style={{fontFamily: FONTS.regular}}>
                        {props.month.month}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: COLORS.primary,
                                height: 36,
                                width: 70,
                            }}>
                            <Text
                                style={{
                                    fontFamily: FONTS.regular,
                                    color: COLORS.white,
                                }}>
                                {props.month.presentPercentage}%
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                marginLeft: 12,
                                width: 40,
                            }}>
                            {props.month.presentCount}/{props.month.sumCount}
                        </Text>
                        <MaterialIcons
                            size={18}
                            style={{marginLeft: 6}}
                            name={
                                props.activePresence === props.month.month
                                    ? 'expand-less'
                                    : 'expand-more'
                            }
                        />
                    </View>
                </View>
            </TouchableHighlight>
            {props.activePresence === props.month.month ? (
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {props.month.trainings.map((item, i) => (
                        <View
                            key={`trainingKey${i}`}
                            style={{
                                marginBottom: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: 10,
                                width: CELL_WIDTH - 20,
                                height: 40,
                                backgroundColor:
                                    item.status === 'present'
                                        ? '#76E954'
                                        : item.status === 'absent'
                                        ? '#DA4444'
                                        : '#FF7F00',
                            }}>
                            <Text
                                style={{
                                    fontFamily: FONTS.regular,
                                }}>
                                {moment(item.date).format('DD.MM.')}
                            </Text>
                        </View>
                    ))}
                </View>
            ) : null}
        </Animated.View>
    );
}

const style = StyleSheet.create({
    container: {
        borderBottomColor: COLORS.lightGrey,
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
    rowWrapper: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default PresenceMonthRow;
