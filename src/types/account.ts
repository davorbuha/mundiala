import {Moment} from 'moment';
import moment from 'moment';

class Account {
    public address: string;
    public createdOn: Moment;
    public dateOfBirth: Moment;
    public email: string;
    public email2: string;
    public email3: string;
    public firstName: string;
    public id: string;
    public idKey: string;
    public image: string;
    public lastName: string;
    public nrCode: string;
    public oib: string;
    public organisationId: string;
    public parentName: string;
    public parentTel: string;
    public playPosition: string;
    public registrationDate: Moment;
    public tel: string;

    constructor(
        address: string,
        createdOn: Moment,
        dateOfBirth: Moment,
        email: string,
        email2: string,
        email3: string,
        firstName: string,
        id: string,
        idKey: string,
        image: string,
        lastName: string,
        nrCode: string,
        oib: string,
        organisationId: string,
        parentName: string,
        parentTel: string,
        playPosition: string,
        registrationDate: Moment,
        tel: string,
    ) {
        this.address = address;
        this.createdOn = createdOn;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.email2 = email2;
        this.email3 = email3;
        this.firstName = firstName;
        this.id = id;
        this.idKey = idKey;
        this.image = image;
        this.lastName = lastName;
        this.nrCode = nrCode;
        this.oib = oib;
        this.organisationId = organisationId;
        this.parentName = parentName;
        this.parentTel = parentTel;
        this.playPosition = playPosition;
        this.registrationDate = registrationDate;
        this.tel = tel;
    }

    public static fromJSON(maybe: any): Account {
        const createdOn = moment(
            maybe.created_on.replace('-', '2'),
            'DD.MM.YYYY',
        );
        const dateOfBirth = moment(
            maybe.date_of_birth.replace('-', '2'),
            'DD.MM.YYYY',
        );
        const registrationDate = moment(
            maybe.registration_date.replace('-0', '2'),
            'DD.MM.YYYY',
        );
        return new Account(
            maybe.address,
            createdOn,
            dateOfBirth,
            maybe.email,
            maybe.email2,
            maybe.email3,
            maybe.first_name,
            maybe.id,
            maybe.id_key,
            maybe.image,
            maybe.last_name,
            maybe.nr_code,
            maybe.oib,
            maybe.organisation_id,
            maybe.parent_name,
            maybe.parent_tel,
            maybe.play_position,
            registrationDate,
            maybe.tel,
        );
    }
}

export default Account;
