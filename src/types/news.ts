import moment, {Moment} from 'moment';

export class NewsReply {
    data: News[];
    constructor(news: News[]) {
        this.data = news;
    }

    public static fromJSON(maybe: any): NewsReply {
        const news = maybe.map(item => News.fromJSON(item));
        return new NewsReply(news);
    }
}

export class NewsByIdReply {
    data: NewsById;
    constructor(news: NewsById) {
        this.data = news;
    }

    public static fromJSON(maybe: any): NewsByIdReply {
        const news = NewsById.fromJSON(maybe[0]);
        return new NewsByIdReply(news);
    }
}

export class NewsById {
    authorName: string;
    createdOn: Moment;
    description: string;
    id: string;
    idKey: string;
    image: string;
    name: string;
    notification: string;
    organisationId: string;
    ourteamCategoryColor: string;
    ourteamCategoryId: string;
    ourteamCategoryName: string;
    viewed: string;

    constructor(
        authorName: string,
        createdOn: Moment,
        description: string,
        id: string,
        idKey: string,
        image: string,
        name: string,
        notification: string,
        organisationId: string,
        ourteamCategoryColor: string,
        ourteamCategoryId: string,
        ourteamCategoryName: string,
        viewed: string,
    ) {
        this.authorName = authorName;
        this.createdOn = createdOn;
        this.description = description;
        this.id = id;
        this.idKey = idKey;
        this.image = image;
        this.name = name;
        this.notification = notification;
        this.organisationId = organisationId;
        this.ourteamCategoryColor = ourteamCategoryColor;
        this.ourteamCategoryId = ourteamCategoryId;
        this.ourteamCategoryName = ourteamCategoryName;
        this.viewed = viewed;
    }

    static fromJSON(maybe: any): NewsById {
        let createdOn: Moment;
        if (typeof maybe.author_name !== 'string') {
            throw new Error('author_name is not string');
        }
        createdOn = moment(maybe.created_on);
        if (!createdOn.isValid()) {
            throw new Error('created_on is not valid date');
        }
        if (typeof maybe.description !== 'string') {
            throw new Error('description is not string');
        }
        if (typeof maybe.id !== 'string') {
            throw new Error('id is not string');
        }
        // if(typeof maybe.image !== 'string') {
        //     throw new Error('image is not string')
        // }
        if (typeof maybe.name !== 'string') {
            throw new Error('name is not string');
        }
        if (typeof maybe.organisation_id !== 'string') {
            throw new Error('organisation_id is not string');
        }
        // if (typeof maybe.ourteam_category_color !== 'string') {
        //     throw new Error('ourteam_category_color is not string');
        // }
        // if (typeof maybe.ourteam_category_id !== 'string') {
        //     throw new Error('ourteam_category_id is not string');
        // }
        // if (typeof maybe.ourteam_category_name !== 'string') {
        //     throw new Error('ourteam_category_name is not string');
        // }
        if (typeof maybe.viewed !== 'string') {
            throw new Error('viewed is not string');
        }
        return new NewsById(
            maybe.author_name,
            createdOn,
            maybe.description,
            maybe.id,
            maybe.id_key,
            maybe.image,
            maybe.name,
            maybe.notification,
            maybe.organisation_id,
            maybe.ourteam_category_color,
            maybe.ourteam_category_id,
            maybe.ourteam_category_name,
            maybe.viewed,
        );
    }

    public toJSON() {
        return {
            author_name: this.authorName,
            created_on: this.createdOn.toISOString(),
            description: this.description,
            id: this.id,
            image: this.image,
            name: this.name,
            organisation_id: this.organisationId,
            ourteam_category_color: this.ourteamCategoryColor,
            ourteam_category_id: this.ourteamCategoryId,
            ourteam_category_name: this.ourteamCategoryName,
            viewed: this.viewed,
        };
    }
}

export class News {
    authorName: string;
    createdOn: Moment;
    description: string;
    id: string;
    image: string;
    name: string;
    organisationId: string;
    ourteamCategoryColor: string;
    ourteamCategoryId: string;
    ourteamCategoryName: string;
    viewed: string;

    constructor(
        authorName: string,
        createdOn: Moment,
        description: string,
        id: string,
        image: string,
        name: string,
        organisationId: string,
        ourteamCategoryColor: string,
        ourteamCategoryId: string,
        ourteamCategoryName: string,
        viewed: string,
    ) {
        this.authorName = authorName;
        this.createdOn = createdOn;
        this.description = description;
        this.id = id;
        this.image = image;
        this.name = name;
        this.organisationId = organisationId;
        this.ourteamCategoryColor = ourteamCategoryColor;
        this.ourteamCategoryId = ourteamCategoryId;
        this.ourteamCategoryName = ourteamCategoryName;
        this.viewed = viewed;
    }

    static fromJSON(maybe: any): News {
        let createdOn: Moment;
        if (typeof maybe.author_name !== 'string') {
            throw new Error('author_name is not string');
        }
        createdOn = moment(maybe.created_on);
        if (!createdOn.isValid()) {
            throw new Error('created_on is not valid date');
        }
        if (typeof maybe.description !== 'string') {
            throw new Error('description is not string');
        }
        if (typeof maybe.id !== 'string') {
            throw new Error('id is not string');
        }
        // if(typeof maybe.image !== 'string') {
        //     throw new Error('image is not string')
        // }
        if (typeof maybe.name !== 'string') {
            throw new Error('name is not string');
        }
        if (typeof maybe.organisation_id !== 'string') {
            throw new Error('organisation_id is not string');
        }
        // if (typeof maybe.ourteam_category_color !== 'string') {
        //     throw new Error('ourteam_category_color is not string');
        // }
        // if (typeof maybe.ourteam_category_id !== 'string') {
        //     throw new Error('ourteam_category_id is not string');
        // }
        // if (typeof maybe.ourteam_category_name !== 'string') {
        //     throw new Error('ourteam_category_name is not string');
        // }
        if (typeof maybe.viewed !== 'string') {
            throw new Error('viewed is not string');
        }
        return new News(
            maybe.author_name,
            createdOn,
            maybe.description,
            maybe.id,
            maybe.image,
            maybe.name,
            maybe.organisation_id,
            maybe.ourteam_category_color,
            maybe.ourteam_category_id,
            maybe.ourteam_category_name,
            maybe.viewed,
        );
    }

    public toJSON() {
        return {
            author_name: this.authorName,
            created_on: this.createdOn.toISOString(),
            description: this.description,
            id: this.id,
            image: this.image,
            name: this.name,
            organisation_id: this.organisationId,
            ourteam_category_color: this.ourteamCategoryColor,
            ourteam_category_id: this.ourteamCategoryId,
            ourteam_category_name: this.ourteamCategoryName,
            viewed: this.viewed,
        };
    }
}
