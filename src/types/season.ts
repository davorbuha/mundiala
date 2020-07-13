class Season {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public static fromJSON(maybe: any): Season {
        return new Season(maybe.id, maybe.name);
    }
}

export default Season;
