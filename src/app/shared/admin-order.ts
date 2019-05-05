import {State} from "./state";
import {OrderPosition} from "./order-position";

export class AdminOrder {
    constructor (
        public id : number,
        public nettoPrice : string,
        public bruttoPrice : string,
        public created_at : string,
        public updated_at : string,
        public user_id : number,
        public states : State[],
        public order_positions : OrderPosition[],
    ) {}
}
