import Training from './training';

class PresenceMonth {
    month: string;
    presentCount: number;
    presentPercentage: string;
    sumCount: number;
    trainings: Training[];

    constructor(
        month: string,
        presentCount: number,
        presentPercentage: string,
        sumCount: number,
        trainings: Training[],
    ) {
        this.month = month;
        this.presentCount = presentCount;
        this.presentPercentage = presentPercentage;
        this.sumCount = sumCount;
        this.trainings = trainings;
    }

    public static fromJSON(m: any): PresenceMonth {
        return new PresenceMonth(
            m.month,
            m.present_cnt,
            m.present_precentage,
            m.sum_cnt,
            m.trainings.map(Training.fromJSON),
        );
    }
}

export default PresenceMonth;
