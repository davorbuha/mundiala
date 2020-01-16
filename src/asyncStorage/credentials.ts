class Credentials {
    private email: string;
    private password: string;
    private token: string;

    constructor(email: string, password: string, token: string) {
        this.email = email;
        this.password = password;
        this.token = token;
    }

    public static fromJSON(maybe: any): Credentials {
        if (typeof maybe.email !== 'string') {
            throw new Error('email is not string');
        }
        if (typeof maybe.password !== 'string') {
            throw new Error('password is not string');
        }
        if (typeof maybe.token !== 'string') {
            throw new Error('token is not string');
        }

        return new Credentials(maybe.email, maybe.password, maybe.token);
    }

    public toJSON() {
        return {
            email: this.email,
            password: this.password,
            token: this.token,
        };
    }

    public getEmail() {
        return this.email;
    }

    public getPassword() {
        return this.password;
    }

    public getToken() {
        return this.token;
    }
}

export default Credentials;
