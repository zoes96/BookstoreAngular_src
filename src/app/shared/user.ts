import {AdminOrder} from "./admin-order";
import {UserInfo} from "./user-info";

export class User {
    constructor (
        public user_id : number,
        public orders : AdminOrder[],
        public userInfo : UserInfo[]
    ) {}
}
