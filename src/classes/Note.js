export default class Note {
    constructor(note, date = new Date().toISOString().split("T")[0], noteID = null) {
        this.noteID = noteID
        this.note = note;
        this.date = date;
    }
}
