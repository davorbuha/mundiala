import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Animated,
} from 'react-native';
import Billing from '../types/billing';
import RenderStatus from './RenderStatus';
import FONTS from '../res/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../res/colors';
import moment from 'moment';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../loadingReducer/actions';
import CustomButton from '../components/CustomButton';

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
    const height = React.useRef(new Animated.Value(46));
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (activeBill === item.month) {
            Animated.timing(height.current, {
                toValue: 420,
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
    }, [activeBill, item]);
    return (
        <Animated.View style={{...style.container, height: height.current}}>
            <TouchableHighlight
                style={{
                    height: 46,
                    justifyContent: 'center',
                }}
                underlayColor={COLORS.lightGrey}
                onPress={() => {
                    if (activeBill === item.month) {
                        setActiveBill(undefined);
                    } else {
                        setActiveBill(item.month);
                    }
                }}>
                <View style={style.rowWrapper}>
                    <Text style={{fontFamily: FONTS.regular}}>
                        {item.month}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <RenderStatus status={item.status} />
                            <MaterialIcons
                                size={18}
                                style={{marginLeft: 6}}
                                name={
                                    activeBill === item.month
                                        ? 'expand-less'
                                        : 'expand-more'
                                }
                            />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
            {activeBill === item.month ? (
                <Animated.View
                    style={{
                        paddingHorizontal: 16,
                        opacity: height.current.interpolate({
                            inputRange: [46, 420],
                            outputRange: [0, 1],
                        }),
                    }}>
                    <View style={style.expanded}>
                        <View>
                            <Text style={style.strong}>PRIMATELJ:</Text>
                            {item.to.split(', ').map((s, i, arr) => (
                                <Text
                                    key={`${i}PRIMATELJ`}
                                    style={style.regular}>
                                    {s}
                                    {i + 1 !== arr.length ? ', ' : null}
                                </Text>
                            ))}
                            <Text style={style.strong}>IBAN:</Text>
                            <Text style={style.regular}>{item.iban}</Text>
                            <Text style={style.strong}>
                                MODEL I POZIV NA BROJ:
                            </Text>
                            <Text style={style.regular}>
                                {item.paymentModel + ' ' + item.paymentCode}
                            </Text>
                            <Text style={style.strong}>OPIS PLAĆANJA:</Text>
                            <Text style={style.regular}>
                                {item.description}
                            </Text>
                            <Text style={style.strong}>STATUS:</Text>
                            <Text style={style.regular}>
                                {item.status === 'payed'
                                    ? 'Plaćeno'
                                    : item.status === 'not_payed'
                                    ? 'Nije plaćeno'
                                    : 'Nije dospjeloo'}
                            </Text>
                        </View>
                        <View>
                            <Text style={style.strong}>IZNOS PLAĆANJA:</Text>
                            <Text style={style.regular}>{item.price}</Text>
                            <Text style={style.strong}>
                                DOSPIJEĆE PLAĆANJA:
                            </Text>
                            <Text style={style.regular}>
                                {moment(item.paymentTill).format('DD.MM.YYYY')}
                            </Text>
                            {item.paidOn ? (
                                <>
                                    <Text style={style.strong}>
                                        DATUM PLAĆANJA:
                                    </Text>
                                    <Text style={style.regular}>
                                        {moment(item.paidOn).format(
                                            'DD.MM.YYYY',
                                        )}
                                    </Text>
                                </>
                            ) : null}
                            {/* {item.status === 'payed' ? <><Text style={style.strong}>DOSPIJEĆE PLAĆANJA</Text>
                            <Text style={style.regular}>
                                {moment(item.).format('DD.MM.YYYY')}
                            </Text></>} */}
                        </View>
                    </View>
                    <CustomButton
                        type="standard"
                        label={
                            <Text style={style.button}>PRIKAŽI 2D BARCODE</Text>
                        }
                        onPress={() => showBarcode(item.barcode)}
                    />
                    <View style={{marginVertical: 12}}>
                        <CustomButton
                            type="standard"
                            label={
                                <Text style={style.button}>
                                    POŠALJI UPLATNICU NA MAIL
                                </Text>
                            }
                            onPress={() => {
                                dispatch(startLoading('email'));
                                Axios.request({url: item.sendEmail})
                                    .then(() => {
                                        dispatch(stopLoading('email'));
                                        setTimeout(
                                            () => showEmailSentModal(),
                                            1000,
                                        );
                                    })
                                    .catch(() => {});
                            }}
                        />
                    </View>
                </Animated.View>
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
    strong: {
        marginTop: 10,
        lineHeight: 18,
        fontSize: 14,
        fontFamily: FONTS.bold,
    },
    button: {
        color: COLORS.white,
        lineHeight: 20,
        fontSize: 14,
        fontFamily: FONTS.bold,
    },
    regular: {
        lineHeight: 18,
        fontSize: 14,
        fontFamily: FONTS.regular,
    },
    expanded: {
        marginBottom: 10,
        flexDirection: 'row',
    },
});

export default BillingRow;
