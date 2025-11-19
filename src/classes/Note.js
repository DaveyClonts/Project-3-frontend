export default class Note {
    constructor(note, goalID, date = new Date().toISOString().replace("T", " ").substring(0, 16), id = null) {
        this.id = id;
        this.note = note;
        this.date = date;
        this.goalID = goalID
    }
}
