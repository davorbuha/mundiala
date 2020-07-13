import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Billing from '../types/billing';
import RenderStatus from './RenderStatus';
import FONTS from '../res/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../res/colors';
import moment from 'moment';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../loadingReducer/actions';

interface Props {
    item: Billing;
    activeBill: string;
    setActiveBill: React.Dispatch<React.SetStateAction<string>>;
    showBarcode: (link: string) => void;
    showEmailSentModal: () => void;
}

function BillingRow({
    item,
    setActiveBill,
    activeBill,
    showBarcode,
    showEmailSentModal,
}: Props) {
    const height = React.useRef(new Animated.Value(64));
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (activeBill === item.month) {
            Animated.timing(height.current, {
                toValue: 280,
                duration: 500,
            }).start();
        } else {
            if (height.current !== new Animated.Value(64)) {
                Animated.timing(height.current, {
                    toValue: 64,
                    duration: 500,
                }).start();
            }
        }
    }, [activeBill, item]);
    return (
        <Animated.View style={{...style.container, height: height.current}}>
            <View style={style.rowWrapper}>
                <Text style={{fontFamily: FONTS.regular}}>{item.month}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            if (activeBill === item.month) {
                                setActiveBill(undefined);
                            } else {
                                setActiveBill(item.month);
                            }
                        }}>
                        <RenderStatus status={item.status} />
                        <MaterialIcons
                            size={18}
                            style={{marginLeft: 6}}
                            name={'expand-more'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {activeBill === item.month ? (
                <Animated.View
                    style={{
                        ...style.expanded,
                        opacity: height.current.interpolate({
                            inputRange: [64, 280],
                            outputRange: [0, 1],
                        }),
                    }}>
                    <View>
                        <Text style={style.strong}>PRIMATELJ:</Text>
                        {item.to.split(', ').map((s, i, arr) => (
                            <Text key={`${i}PRIMATELJ`} style={style.regular}>
                                {s}
                                {i + 1 !== arr.length ? ', ' : null}
                            </Text>
                        ))}
                        <Text style={style.strong}>IBAN:</Text>
                        <Text style={style.regular}>{item.iban}</Text>
                        <Text style={style.strong}>MODEL I POZIV NA BROJ:</Text>
                        <Text style={style.regular}>
                            {item.paymentModel + ' ' + item.paymentCode}
                        </Text>
                        <Text style={style.strong}>OPIS PLAĆANJA:</Text>
                        <Text style={style.regular}>{item.description}</Text>
                    </View>
                    <View>
                        <Text style={style.strong}>IZNOS PLAĆANJA</Text>
                        <Text style={style.regular}>{item.price}</Text>
                        <Text style={style.strong}>DOSPIJEĆE PLAĆANJA</Text>
                        <Text style={style.regular}>
                            {moment(item.paymentTill).format('DD.MM.YYYY')}
                        </Text>
                        <TouchableOpacity
                            onPress={() => showBarcode(item.barcode)}>
                            <Text style={style.strong}>BARCODE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(startLoading('email'));
                                Axios.request({url: item.sendEmail}).then(
                                    () => {
                                        dispatch(stopLoading('email'));
                                        setTimeout(
                                            () => showEmailSentModal(),
                                            1000,
                                        );
                                    },
                                );
                            }}>
                            <Text style={style.strong}>
                                POŠALJI UPLATNICU NA EMAIL
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            ) : null}
        </Animated.View>
    );
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        borderBottomColor: COLORS.darkGrey,
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    strong: {
        marginTop: 10,
        lineHeight: 18,
        fontSize: 14,
        fontFamily: FONTS.bold,
    },
    regular: {
        lineHeight: 18,
        fontSize: 14,
        fontFamily: FONTS.regular,
    },
    expanded: {
        flexDirection: 'row',
    },
});

export default BillingRow;
