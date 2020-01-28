import {Moment} from 'moment';
import moment from 'moment';

export class Calendar {
    color: string;
    date: Moment;
    id: string;
    title: string;
    ts: Moment;
    type: string;

    constructor(
        color: string,
        date: Moment,
        id: string,
        title: string,
        ts: Moment,
        type: string,
    ) {
        this.color = color;
        this.date = date;
        this.id = id;
        this.title = title;
        this.ts = ts;
        this.type = type;
    }

    public static fromJSON(maybe: any): Calendar {
        let date: Moment;
        let ts: Moment;
        // if (typeof maybe.color !== 'string') {
        //     throw new Error('color is not a string');
        // }
        date = moment(maybe.date);
        if (!date.isValid()) {
            throw new Error('date is not valid moment');
        }
        if (typeof maybe.id !== 'string') {
            throw new Error('id is not a string');
        }
        if (typeof maybe.title !== 'string') {
            throw new Error('title is not a string');
        }
        ts = moment(maybe.ts);
        if (!date.isValid()) {
            throw new Error('ts is not valid moment');
        }
        if (typeof maybe.type !== 'string') {
            throw new Error('type is not string');
        }
        return new Calendar(
            maybe.color,
            date,
            maybe.id,
            maybe.title,
            ts,
            maybe.type,
        );
    }
}

export class CalendarReply {
    data: Calendar[];
    constructor(data: Calendar[]) {
        this.data = data;
    }
    public static fromJSON(maybe: any): CalendarReply {
        if (!Array.isArray(maybe)) {
            throw new Error('response data is not array');
        }
        const calendars = maybe.map(Calendar.fromJSON);
        return new CalendarReply(calendars);
    }
}
