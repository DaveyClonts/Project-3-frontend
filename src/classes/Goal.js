export default class Goal{
    constructor(name, description, date, goalID = null, notes = null){
        this.goalID = goalID;
        this.name = name;
        this.description = description;
        this.date = date;
        this.notes = notes;
    }
}