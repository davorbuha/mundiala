class Banner {
    action: string;
    banner: string;
    constructor(action: string, banner: string) {
        this.action = action;
        this.banner = banner;
    }

    public static fromJSON(maybe): Banner {
        return new Banner(maybe.action, maybe.banner);
    }
}

export default Banner;
