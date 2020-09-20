class Training {
    color: string;
    date: string;
    display: string;
    status: string;

    constructor(color: string, date: string, display: string, status: string) {
        this.color = color;
        this.date = date;
        this.display = display;
        this.status = status;
    }

    public static fromJSON(m: any): Training {
        return new Training(m.color, m.date, m.display, m.status);
    }
}

export default Training;
