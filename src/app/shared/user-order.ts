import {OrderPosition} from "./order-position";
import {State} from "./state";

export class UserOrder {
    constructor (
        public id : number,
        public nettoPrice : string,
        public bruttoPrice : string,
        public created_at : string,
        public updated_at : string,
        public user_id : number,
        public firstName : string,
        public lastName : string,
        public email : string,
        public adress_id : number,
        public street : string,
        public postcode : string,
        public city : string,
        public name : string,
        public states : State[],
        public order_positions : OrderPosition[],
    ) {}
}
