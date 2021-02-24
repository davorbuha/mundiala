import {Moment} from 'moment';
import Organization from './organization';
import moment from 'moment';
import Banner from './banner';

export interface PushTopicName {
    name: string;
    value: string;
}

class LoginReply {
    organisations: Organization[];
    token: string;
    tokenValidTill: Moment;
    pushTopics: string[];
    banners: Banner[];
    profilType: string;
    pushTopicNames: PushTopicName[];
    rpn: PushTopicName[];

    constructor(
        organitazions: Organization[],
        token: string,
        tokenValidTill: Moment,
        pushTopics: string[],
        banners: Banner[],
        profilType: string,
        pushTopicNames: PushTopicName[],
        rpn: PushTopicName[],
    ) {
        this.organisations = organitazions;
        this.token = token;
        this.tokenValidTill = tokenValidTill;
        this.pushTopics = pushTopics;
        this.banners = banners;
        this.profilType = profilType;
        this.pushTopicNames = pushTopicNames;
        this.rpn = rpn;
    }

    static fromJSON(maybe): LoginReply {
        let organisations;
        organisations = Object.keys(maybe.organisations).map((key) => {
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
        let rpn: PushTopicName[] = [];
        if (maybe.push_receive_from) {
            rpn = Object.keys(maybe.push_receive_from).map((key) => ({
                name: maybe.push_receive_from[key],
                value: key,
            }));
        }

        let ptn: PushTopicName[] = [];
        if (maybe.push_send_to) {
            ptn = Object.keys(maybe.push_send_to).map((key) => ({
                name: maybe.push_send_to[key],
                value: key,
            }));
        }

        return new LoginReply(
            organisations,
            maybe.token,
            tokenValidTill,
            maybe.push_topics,
            banners,
            maybe.profile_type,
            ptn,
            rpn,
        );
    }
}

export default LoginReply;
