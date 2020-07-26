import React, {Component, useState, useEffect} from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    StyleSheet,
    Platform,
    TouchableHighlight,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../res/colors';
import service from '../../service';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import moment from 'moment';
import {Calendar, LocaleConfig} from '../../../libs/react-native-calendars';
import {Calendar as CalendarType} from '../../types/calendar';
import {Table, Row} from 'react-native-table-component';
import FONTS from '../../res/fonts';

const {width} = Dimensions.get('screen');

LocaleConfig.locales['hr'] = {
    monthNames: [
        'siječanj',
        'veljača',
        'ožujak',
        'travanj',
        'svibanj',
        'lipanj',
        'srpanj',
        'kolovoz',
        'rujan',
        'listopad',
        'studeni',
        'prosinac',
    ],
    monthNamesShort: [
        'sij.',
        'velj.',
        'ožu.',
        'trav.',
        'svi.',
        'lip.',
        'srp.',
        'kol.',
        'ruj.',
        'lis.',
        'stu.',
        'pros.',
    ],
    dayNames: [
        'Nedjelja',
        'Ponedjeljak',
        'Utorak',
        'Srijeda',
        'Četvrtak',
        'Petak',
        'Subota',
    ],
    dayNamesShort: ['N', 'P', 'U', 'S', 'Č', 'P', 'S'],
};

LocaleConfig.defaultLocale = 'hr';

interface Props {
    token: string;
    organisationId: number;
    navigation: any;
}

interface State {
    calendarDates: CalendarType[];
    selectedDates: CalendarType[];
    fetched: boolean;
}

const prepareMarkedDates = (events: CalendarType[]) => {
    const markedDates = {};
    events.forEach(
        (item: CalendarType) =>
            (markedDates[item.date.format('YYYY-MM-DD')] = {
                dots: [
                    {
                        key: item.ts.toISOString() + item.title + item.id,
                        color: item.color ? item.color : COLORS.primary,
                    },
                    ...(markedDates[item.date.format('YYYY-MM-DD')]
                        ? markedDates[item.date.format('YYYY-MM-DD')].dots
                        : []),
                ],
                marked: true,
            }),
    );
    return markedDates;
};

const tableHead = ['', 'DATUM', 'DOGAĐAJ', ''];

interface RenderSelectedDatesProps {
    dates: CalendarType[];
}

const RenderSelectedDates = ({dates}: RenderSelectedDatesProps) => {
    useEffect(() => {
        setSelectedDate(undefined);
    }, [dates]);
    const [selectedDate, setSelectedDate] = useState<number | undefined>();
    if (dates.length === 0) return null;
    const rowData = dates.map((item, i) => [
        <View
            style={{
                width: 8,
                height: i === selectedDate ? 130 : 52,
                backgroundColor: item.color ? item.color : COLORS.primary,
            }}
        />,
        <View
            style={{
                width: '100%',
                paddingLeft: 30,
            }}>
            <Text style={style.bodyTextBoldWithoutCenter}>
                {item.date.format('DD.MM.YYYY')}
            </Text>
            <Text style={style.bodyTextWithoutCenter}>
                {item.ts.format('HH:mm')}
            </Text>
        </View>,
        i === selectedDate ? (
            <View style={{alignSelf: 'center'}}>
                <Text style={style.bodyTextWithoutCenter}>{item.title}</Text>
                <Text style={style.bodyTextWithoutCenter}>
                    Vrsta aktivnosti: {item.activityTypeName}
                </Text>
                <Text style={style.bodyTextWithoutCenter}>
                    Kategorija: {item.categoryName}
                </Text>
                <Text style={style.bodyTextWithoutCenter}>
                    Lokacija: {item.location}
                </Text>
                <Text style={style.bodyTextWithoutCenter}>
                    Detalji: {item.description}
                </Text>
            </View>
        ) : (
            item.title
        ),
        i === selectedDate ? (
            <MaterialIcons
                style={{marginRight: 0, alignSelf: 'flex-start'}}
                color={'#00000'}
                size={20}
                name={'expand-less'}
            />
        ) : (
            <MaterialIcons
                style={{marginRight: 0, alignSelf: 'flex-start'}}
                color={'#00000'}
                size={20}
                name={'expand-more'}
            />
        ),
    ]);
    return (
        <View style={{flex: 1, marginLeft: 10, paddingTop: 8}}>
            <Table>
                <Row
                    widthArr={[10, width * 0.33 - 20, width * 0.66 - 20, 30]}
                    textStyle={style.titleText}
                    data={tableHead}
                />
            </Table>
            <ScrollView contentContainerStyle={style.container}>
                <Table>
                    {rowData.map((item, i) => (
                        <TouchableHighlight
                            onPress={() => {
                                if (i === selectedDate) {
                                    setSelectedDate(undefined);
                                } else {
                                    setSelectedDate(i);
                                }
                            }}
                            key={'row' + i}
                            underlayColor={COLORS.lightGrey}>
                            <Row
                                style={{
                                    borderTopColor: '#e5e6e9',
                                    borderTopWidth: 1,
                                }}
                                widthArr={[
                                    10,
                                    width * 0.33 - 20,
                                    width * 0.66 - 20,
                                    30,
                                ]}
                                textStyle={style.bodyText}
                                data={item}
                            />
                        </TouchableHighlight>
                    ))}
                </Table>
            </ScrollView>
        </View>
    );
};

class CalendarScreen extends Component<Props, State> {
    state: State = {
        calendarDates: [],
        selectedDates: [],
        fetched: false,
    };
    onMonthChange = date => {
        //
        service
            .getCalendar(
                this.props.token,
                this.props.organisationId,
                moment(date.dateString).subtract(31, 'days'),
                moment(date.dateString).add(31, 'days'),
            )
            .then(res => {
                this.setState({
                    calendarDates: res.data,
                    selectedDates: res.data
                        .filter(item => {
                            return item.date.get('month') === date.month - 1;
                        })
                        .sort(
                            (a, b) =>
                                (a.date.format('YYYYMMDD') as any) -
                                (b.date.format('YYYYMMDD') as any),
                        ),
                });
            });
    };

    componentDidMount() {
        const {token, organisationId} = this.props;
        service
            .getCalendar(
                token,
                organisationId,
                moment().subtract(1, 'months'),
                moment().add(1, 'months'),
            )
            .then(res => {
                this.setState({
                    calendarDates: res.data,
                    fetched: true,
                    selectedDates: res.data
                        .filter(item => item.date.isSameOrAfter(moment()))
                        .sort(
                            (a, b) =>
                                (a.date.format('YYYYMMDD') as any) -
                                (b.date.format('YYYYMMDD') as any),
                        )
                        .slice(0, 5),
                });
                this.forceUpdate();
            })
            .catch();
    }
    public render() {
        if (!this.state.fetched) return null;
        const markedDates = prepareMarkedDates(this.state.calendarDates);
        return (
            <View style={{flex: 1, backgroundColor: COLORS.white}}>
                <Calendar
                    calendarHeight={{
                        height: Platform.OS === 'ios' ? '40%' : '30%',
                    }}
                    hideExtraDays={true}
                    theme={theme}
                    markingType="multi-dot"
                    onMonthChange={this.onMonthChange}
                    onDayPress={this.handleDayPress}
                    onDayLongPress={this.handleDayPress}
                    markedDates={markedDates}
                />
                <RenderSelectedDates dates={this.state.selectedDates} />
            </View>
        );
    }

    private handleDayPress = (day: any) => {
        const date = moment(day.dateString);
        this.setState({
            selectedDates: this.state.calendarDates.filter(item => {
                return item.date.isSame(date);
            }),
        });
    };
}

const theme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: 'white',
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: COLORS.primary,
    disabledArrowColor: '#d9e1e8',
    monthTextColor: COLORS.primary,
    indicatorColor: COLORS.primary,
    textDayFontFamily: FONTS.regular,
    textMonthFontFamily: FONTS.regular,
    textDayHeaderFontFamily: FONTS.regular,
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 14,
    textMonthFontSize: 14,
    textDayHeaderFontSize: 14,
};

const mapStateToProps = (state: AppState) => ({
    token: state.user.token,
    organisationId: state.user.organisations[0].id,
});

const style = StyleSheet.create({
    container: {
        borderBottomColor: '#e5e6e9',
        borderBottomWidth: 1,
    },
    titleText: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        opacity: 0.6,
        textAlign: 'center',
    },
    bodyText: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        textAlign: 'center',
    },
    bodyTextBoldWithoutCenter: {
        fontFamily: FONTS.bold,
        fontSize: 14,
    },
    bodyTextWithoutCenter: {
        fontFamily: FONTS.regular,
        fontSize: 14,
    },
});

export default connect(mapStateToProps)(CalendarScreen);
