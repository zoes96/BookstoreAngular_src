export class OrderPosition {
    constructor (
        public amount : number,
        public book_id : number,
        public currentNettoCopy : number
    ) {}
}
