import {Moment} from 'moment';
import Organization from './organization';
import moment from 'moment';
import Banner from './banner';
class LoginReply {
    organisations: Organization[];
    token: string;
    tokenValidTill: Moment;
    pushTopics: string[];
    banners: Banner[];

    constructor(
        organitazions: Organization[],
        token: string,
        tokenValidTill: Moment,
        pushTopics: string[],
        banners: Banner[],
    ) {
        this.organisations = organitazions;
        this.token = token;
        this.tokenValidTill = tokenValidTill;
        this.pushTopics = pushTopics;
        this.banners = banners;
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
        let banners: Banner[] = [];
        if (Array.isArray(maybe.banners)) {
            banners = maybe.banners.map(Banner.fromJSON);
        }

        return new LoginReply(
            organisations,
            maybe.token,
            tokenValidTill,
            maybe.push_topics,
            banners,
        );
    }
}

export default LoginReply;
