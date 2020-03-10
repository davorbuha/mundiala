class Credentials {
    private email: string;
    private password: string;
    private token: string;
    private notifications: boolean;

    constructor(
        email: string,
        password: string,
        token: string,
        notifications: boolean,
    ) {
        this.email = email;
        this.password = password;
        this.token = token;
        this.notifications = notifications;
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
        if (typeof maybe.notifications !== 'boolean') {
            throw new Error('notifications is not boolean');
        }

        return new Credentials(
            maybe.email,
            maybe.password,
            maybe.token,
            maybe.notifications,
        );
    }

    public toJSON() {
        return {
            email: this.email,
            password: this.password,
            token: this.token,
            notifications: this.notifications,
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

    public getNotifications() {
        return this.notifications;
    }
    public setNotifications(b: boolean) {
        this.notifications = b;
    }
}

export default Credentials;
