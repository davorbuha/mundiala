import React from 'react';
import {View, ScrollView} from 'react-native';
import service from '../../service';
import Organization from '../../types/organization';
import DropDownPicker from 'react-native-dropdown-picker';
import Billing from '../../types/billing';
import {AppState} from '../../store';
import {connect} from 'react-redux';
import BillingRow from '../../components/BillingRow';
import BarcodeModal from '../../components/BarcodeModal';
import EmailSentModal from '../../components/EmailSentModal';
import COLORS from '../../res/colors';
import moment from 'moment';

interface Props {
    token: string;
    organisations: Organization[];
}

interface DropdownElement {
    value: number;
    label: string;
}

function BillingScreen(props: Props) {
    const [seasons, setSeasons] = React.useState<DropdownElement[]>([
        {label: 'Prikaži sve', value: -1},
    ]);
    const [barcode, setBarcode] = React.useState<string | undefined>();
    const [emailSentModal, setEmailSentModal] = React.useState(false);
    const [activeBill, setActiveBill] = React.useState<string>();
    const [choosenSeason, setChoosenSeason] = React.useState<number>(-1);
    const [billing, setBilling] = React.useState<Billing[]>([]);
    React.useEffect(() => {
        service
            .getSeasons(props.token, props.organisations[0].id)
            .then(res =>
                setSeasons([
                    ...seasons,
                    ...res.map(item => ({value: item.id, label: item.name})),
                ]),
            )
            .catch();
    }, []);
    React.useEffect(() => {
        if (choosenSeason === -1) {
            Promise.all(
                seasons
                    .filter(item => item.value !== -1)
                    .map(s =>
                        service.getBilling(
                            props.token,
                            props.organisations[0].id,
                            s.value,
                        ),
                    ),
            ).then(all => {
                setBilling(
                    all
                        .flat()
                        .sort(
                            (a: Billing, b: Billing) =>
                                (moment(a.paymentTill).format(
                                    'YYYYMMDD',
                                ) as any) -
                                (moment(b.paymentTill).format(
                                    'YYYYMMDD',
                                ) as any),
                        ),
                );
            });
        } else {
            service
                .getBilling(
                    props.token,
                    props.organisations[0].id,
                    choosenSeason,
                )
                .then(bill =>
                    setBilling(
                        bill.sort(
                            (a: Billing, b: Billing) =>
                                (moment(a.paymentTill).format(
                                    'YYYYMMDD',
                                ) as any) -
                                (moment(b.paymentTill).format(
                                    'YYYYMMDD',
                                ) as any),
                        ),
                    ),
                );
        }
    }, [choosenSeason, seasons, props.token, props.organisations]);
    return (
        <View style={{flex: 1}}>
            <BarcodeModal
                barcode={barcode}
                hide={() => setBarcode(undefined)}
            />
            <EmailSentModal
                close={() => setEmailSentModal(false)}
                visible={emailSentModal}
            />
            <DropDownPicker
                items={seasons}
                defaultValue={choosenSeason}
                containerStyle={{height: 40}}
                style={{
                    backgroundColor: COLORS.lightGrey,
                    borderBottomColor: COLORS.lightGrey,
                    borderBottomWidth: 1,
                }}
                dropDownStyle={{
                    backgroundColor: '#f2f2f2',
                    borderBottomColor: COLORS.lightGrey,
                    borderBottomWidth: 1,
                }}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                onChangeItem={item => setChoosenSeason(item.value)}
            />
            <ScrollView>
                {billing.map((item, i) => (
                    <BillingRow
                        showEmailSentModal={() => setEmailSentModal(true)}
                        showBarcode={(link: string) => setBarcode(link)}
                        setActiveBill={setActiveBill}
                        key={`${i}BillingRow`}
                        item={item}
                        activeBill={activeBill}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const mapStateToProps = (state: AppState) => ({
    token: state.user.token,
    organisations: state.user.organisations,
});

export default connect(mapStateToProps)(BillingScreen);
