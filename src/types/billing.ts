import {Moment} from 'moment';

// {
// "to":"Invictum j.d.o.o, Make Kuntari\u0107a 44, 34000 Po\u017eega", "iban":"HR854125965214",
// "description":"\u010clanarina za 07\/2019 Petar Peri\u0107", "payment_till":"2019-07-05",
// "price":"150,00",
// "currency":"HRK",
// "payment_from":"Petar Peri\u0107",
// "payment_model":"HR00",
// "payment_code":"0001-07-2019",
//"barcode": "http:\/\/localhost\/_invictum_projects\/mundiala\/public \/pdf417\/barcode.php?price=150%2C00&sender_name=Petar+Peri%C4%87&s ender_address=&sender_city=&recipient_name=Invictum+j.d.o.o&recipie nt_address=Make+Kuntari%C4%87a+44&recipient_city=34000+Po%C5%BEega& recipient_iban=HR854125965214&recipient_callout_number=0001-07- 2019&description=%C4%8Clanarina+za+07%2F2019+Petar+Peri%C4%87"}
// }

class Billing {
    sendEmail: string;
    month: string;
    title: string;
    status: string;
    to: string;
    iban: string;
    description: string;
    paymentTill: Moment;
    price: string;
    currency: string;
    paymentFrom: string;
    paymentModel: string;
    paymentCode: string;
    barcode: string;
    paidOn: string;

    constructor(
        title: string,
        status: string,
        month: string,
        sendEmail: string,
        to: string,
        iban: string,
        description: string,
        paymentTill: Moment,
        price: string,
        currency: string,
        paymentFrom: string,
        paymentModel: string,
        paymentCode: string,
        barcode: string,
        paidOn: string,
    ) {
        this.title = title;
        this.status = status;
        this.month = month;
        this.sendEmail = sendEmail;
        this.to = to;
        this.iban = iban;
        this.description = description;
        this.paymentTill = paymentTill;
        this.price = price;
        this.currency = currency;
        this.paymentFrom = paymentFrom;
        this.paymentModel = paymentModel;
        this.paymentCode = paymentCode;
        this.barcode = barcode;
        this.paidOn = paidOn;
    }

    public static fromJSON(maybe: any): Billing {
        return new Billing(
            maybe.title,
            maybe.status,
            maybe.month,
            maybe.send_email,
            maybe.payment_data.to,
            maybe.payment_data.iban,
            maybe.payment_data.description,
            maybe.payment_data.payment_till,
            maybe.payment_data.price,
            maybe.payment_data.currency,
            maybe.payment_data.payment_from,
            maybe.payment_data.payment_model,
            maybe.payment_data.payment_code,
            maybe.payment_data.barcode,
            maybe.payment_data.paid_on,
        );
    }
}

export default Billing;
