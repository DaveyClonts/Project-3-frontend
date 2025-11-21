export default class Note {
    constructor(note, goalID, date = Date.now(), id = null) {
        this.id = id;
        this.note = note;
        this.date = date;
        this.goalID = goalID
    }
}
