export default class Workout {
    constructor(name, date, id = null, coachID = null, athleteID = null) {
        this.name = name;
        this.title = this.title;
        this.date = new Date(date).toISOString().replace("T", " ").slice(0, 16);
        this.id = id;
        this.value = id;
        this.coachID = coachID;
        this.athleteID = athleteID;
    }
}