export default class Goal{
    constructor(goalID = null, name, description, date){
        this.goalID = goalID;
        this.name = name;
        this.description = description;
        this.date = date;
    }
}