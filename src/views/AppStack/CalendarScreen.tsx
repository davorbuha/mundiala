import React, {Component} from 'react';
import {Text, View, ScrollView, Dimensions, StyleSheet} from 'react-native';
import {getNavigationOptionsWithAction} from '../../router/navigationHelpers';
import LogoTitle from './components/LogoTitle';
import COLORS from '../../res/colors';
import NavBarItem from '../../components/NavBarItem';
import {NavigationStackOptions} from 'react-navigation-stack';
import service from '../../service';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import {Calendar as CalendarType} from '../../types/calendar';
import {Table, Row, Rows} from 'react-native-table-component';
import FONTS from '../../res/fonts';
import {LocaleConfig} from 'react-native-calendars';

const {width} = Dimensions.get('screen');

LocaleConfig.locales['hr'] = {
    monthNames: [
        'Siječanj',
        'Veljača',
        'Ožujak',
        'Travanj',
        'Svibanj',
        'Lipanj',
        'Srpanj',
        'Kolovoz',
        'Rujan',
        'Listopad',
        'Studeni',
        'Prosinac',
    ],
    monthNamesShort: [
        'Sij.',
        'Velj.',
        'Ožu.',
        'Trav.',
        'Svi.',
        'Lip.',
        'Srp.',
        'Kol.',
        'Ruj.',
        'Lis.',
        'Stu.',
        'Pros.',
    ],
    dayNames: [
        'Ponedjeljak',
        'Utorak',
        'Srijeda',
        'Četvrtak',
        'Petak',
        'Subota',
        'Nedjelja',
    ],
    dayNamesShort: ['P', 'U', 'S', 'Č', 'P', 'S', 'N'],
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

const tableHead = ['', 'DATUM', 'DOGAĐAJ'];

const renderSelectedDates = (dates: CalendarType[]) => {
    if (dates.length === 0) return null;
    const rowData = dates.map(item => [
        <View
            style={{
                ...style.marker,
                backgroundColor: item.color ? item.color : COLORS.primary,
            }}
        />,
        item.date.format('YYYY.MM.DD'),
        item.title,
    ]);
    return (
        <View style={style.container}>
            <Table>
                <Row
                    widthArr={[10, width * 0.33 - 5, width * 0.66 - 5]}
                    textStyle={style.titleText}
                    data={tableHead}
                />
                <Rows
                    widthArr={[10, width * 0.33 - 5, width * 0.66 - 5]}
                    textStyle={style.bodyText}
                    data={rowData}
                />
            </Table>
        </View>
    );
};

class CalendarScreen extends Component<Props, State> {
    state: State = {
        calendarDates: [],
        selectedDates: [],
    };
    onMonthChange = date => {
        service
            .getCalendar(
                this.props.token,
                this.props.organisationId,
                moment(date.dateString).subtract(31, 'days'),
                moment(date.dateString).add(31, 'days'),
            )
            .then(res => {
                this.setState({calendarDates: res.data});
            });
    };

    componentDidMount() {
        const {token, organisationId} = this.props;
        service
            .getCalendar(
                token,
                organisationId,
                moment().subtract(2, 'months'),
                moment(),
            )
            .then(res => {
                this.setState({calendarDates: res.data});
                this.forceUpdate();
            })
            .catch(e => console.log(e));
    }
    public render() {
        const markedDates = prepareMarkedDates(this.state.calendarDates);
        return (
            <View style={{flex: 1, backgroundColor: COLORS.white}}>
                <Calendar
                    hideExtraDays={true}
                    theme={theme}
                    markingType="multi-dot"
                    onMonthChange={this.onMonthChange}
                    onDayPress={this.handleDayPress}
                    onDayLongPress={this.handleDayPress}
                    markedDates={markedDates}
                />
                {renderSelectedDates(this.state.selectedDates)}
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
    todayTextColor: '#00adf5',
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
    textDayFontSize: 18,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
};

const mapStateToProps = (state: AppState) => ({
    token: state.user.token,
    organisationId: state.user.organisations[0].id,
});

const style = StyleSheet.create({
    container: {marginTop: 20},
    marker: {
        marginLeft: 10,
        width: 10,
        height: 40,
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
});

export default connect(mapStateToProps)(CalendarScreen);
