import {Moment} from 'moment';
import Organization from './organization';
import moment from 'moment';

class LoginReply {
    organisations: Organization[];
    token: string;
    tokenValidTill: Moment;

    constructor(
        organitazions: Organization[],
        token: string,
        tokenValidTill: Moment,
    ) {
        this.organisations = organitazions;
        this.token = token;
        this.tokenValidTill = tokenValidTill;
    }

    static fromJSON(maybe): LoginReply {
        let organisations;
        organisations = Object.keys(maybe.organisations).map(key => {
            const id = parseInt(key);
            return Organization.fromJSON({
                id: id,
                name: maybe.organisations[key],
            });
        });
        if (typeof maybe.token !== 'string') {
            throw new Error('token is not string');
        }

        const tokenValidTill = moment(maybe.tokenValidTill);
        if (!tokenValidTill.isValid()) {
            throw new Error('token valid till is not valid');
        }

        return new LoginReply(organisations, maybe.token, tokenValidTill);
    }
}

export default LoginReply;
