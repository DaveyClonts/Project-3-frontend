const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
});

export default class Workout {
    constructor(name, date, id = null, coachID = null, athleteID = null) {
        this.name = name;
        this.title = this.title;
        this.date = dateFormatter.format(new Date(date));
        this.id = id;
        this.value = id;
        this.coachID = coachID;
        this.athleteID = athleteID;
    }
}
