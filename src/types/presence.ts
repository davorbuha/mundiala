import PresenceMonth from './presenceMonth';

class Presence {
    months: PresenceMonth[];
    presentCount: number;
    presentPercentage: string;
    sumCount: number;
    constructor(
        months: PresenceMonth[],
        presentCount: number,
        prsentPercentage: string,
        sumCount: number,
    ) {
        this.months = months;
        this.presentCount = presentCount;
        this.presentPercentage = prsentPercentage;
        this.sumCount = sumCount;
    }
    public static fromJSON(m: any): Presence {
        return new Presence(
            m.months.map(PresenceMonth.fromJSON),
            m.present_cnt,
            m.present_precentage,
            m.sum_cnt,
        );
    }
    public toJSON() {}
}

export default Presence;
