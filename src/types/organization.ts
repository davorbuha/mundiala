class Organization {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    static fromJSON(maybe: any): Organization {
        if (typeof maybe.id !== 'number') {
            throw new Error('id is not number');
        }

        if (typeof maybe.name !== 'string') {
            throw new Error('name is not string');
        }

        return new Organization(maybe.id, maybe.name);
    }
}

export default Organization;
