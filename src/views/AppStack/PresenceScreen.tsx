/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {ScrollView, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';
import PresenceMonthRow from '../../components/PresenceMonthRow';
import TotalPresence from '../../components/TotalPresence';
import COLORS from '../../res/colors';
import service from '../../service';
import {AppState} from '../../store';
import Organization from '../../types/organization';
import Presence from '../../types/presence';
import PresenceMonth from '../../types/presenceMonth';

interface Props {
    token: string;
    organisations: Organization[];
}

interface DropdownElement {
    value: number;
    label: string;
}

function PresenceScreen(props: Props) {
    const [presence, setPresence] = React.useState<Presence>();
    const [pickerOpen, setPickerOpen] = React.useState(false);
    const [choosenSeason, setChoosenSeason] = React.useState<number>(-1);
    const [activePresence, setActivePresence] = React.useState<
        string | undefined
    >();
    const [seasons, setSeasons] = React.useState<DropdownElement[]>([
        {label: 'Sve sezone', value: -1},
    ]);
    // React.useEffect(() => {
    //     console.log(presence);
    // }, [presence]);

    React.useEffect(() => {
        service
            .getSeasons(props.token, props.organisations[0].id)
            .then((res) =>
                setSeasons([
                    ...seasons,
                    ...res.map((item) => ({
                        value: item.id,
                        label: item.name,
                    })),
                ]),
            )
            .catch();
    }, []);

    React.useEffect(() => {
        if (choosenSeason === -1) {
            Promise.all(
                seasons
                    .filter((item) => item.value !== -1)
                    .map((s) =>
                        service.getPresence(
                            props.token,
                            props.organisations[0].id,
                            s.value,
                        ),
                    ),
            ).then((all) => {
                const months = all
                    .map((p) => p.months)
                    .flat()
                    .sort(
                        (a: PresenceMonth, b: PresenceMonth) =>
                            moment(b.month, 'MM/YYYY').format('YYYYMMDD') -
                            moment(a.month, 'MM/YYYY').format('YYYYMMDD'),
                    );
                const presentCount = all.reduce((acc, c) => {
                    return acc + c.presentCount;
                }, 0);
                const sumCount = all.reduce((acc, c) => acc + c.sumCount, 0);
                const presentPercentage = (presentCount / sumCount) * 100;
                setPresence(
                    new Presence(
                        months,
                        presentCount,
                        presentPercentage.toFixed(0).toString(),
                        sumCount,
                    ),
                );
            });
        } else {
            service
                .getPresence(
                    props.token,
                    props.organisations[0].id,
                    choosenSeason,
                )
                .then(setPresence).catch;
        }
    }, [choosenSeason, seasons, props.token, props.organisations]);

    return (
        <View style={{flex: 1}}>
            <DropDownPicker
                onOpen={() => setPickerOpen(true)}
                onClose={() => setPickerOpen(false)}
                items={seasons}
                defaultValue={choosenSeason}
                containerStyle={{height: 40, width: '100%'}}
                style={{
                    backgroundColor: COLORS.lightGrey,
                    borderBottomColor: COLORS.lightGrey,
                    borderBottomWidth: 1,
                }}
                dropDownMaxHeight={140}
                dropDownStyle={{
                    minHeight: 140,
                    backgroundColor: '#E8E8E8',
                    borderBottomColor: COLORS.lightGrey,
                    borderBottomWidth: 1,
                }}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                onChangeItem={(item) => setChoosenSeason(item.value)}
            />
            {pickerOpen && <View style={{height: 140}} />}
            {presence ? (
                <>
                    <View
                        style={{
                            height: 100,
                            width: '100%',
                            justifyContent: 'center',
                            paddingHorizontal: 16,
                            backgroundColor: '#f2f2f2',
                        }}>
                        {presence ? (
                            <TotalPresence presence={presence} />
                        ) : null}
                    </View>
                    <ScrollView>
                        {presence.months.map((item, i) => (
                            <PresenceMonthRow
                                key={`presenceMonthRow${i}`}
                                activePresence={activePresence}
                                setActivePresence={setActivePresence}
                                month={item}
                            />
                        ))}
                    </ScrollView>
                </>
            ) : null}
        </View>
    );
}

const mapStateToProps = (state: AppState) => ({
    token: state.user.token,
    organisations: state.user.organisations,
});

export default connect(mapStateToProps)(PresenceScreen);
