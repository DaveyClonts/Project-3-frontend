export default class Note {
    constructor(note, date = new Date().toISOString().split("T")[0]) {
        this.note = note;
        this.date = date;
    }
}
