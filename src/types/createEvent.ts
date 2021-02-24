// {"method":"create-event", "token":"{token_iz_login_metode}", "organisation_id":{id_iz_
// login_metode_iz_organisations_objekta, "category_id":"{id_kategorije}", "date":"2019-08-01",
// "time":"15:00", "seasson_id":"{id_iz_seassons_metode}", "event_type":"event ili training",
// "title":"naslov eventa", "description":"opis eventa"}

import {Moment} from 'moment';

class CreateEvent {
    constructor(
        public categoryId: number,
        public date: Moment,
        public eventType: string,
        public title: string,
        public description: string,
    ) {}
    public toJSON() {
        return {
            category_id: this.categoryId,
            date: this.date.format('YYYY-MM-DD'),
            time: this.date.format('HH:mm'),
            event_type: this.eventType,
            title: this.title,
            description: this.description,
        };
    }
}

export default CreateEvent;
