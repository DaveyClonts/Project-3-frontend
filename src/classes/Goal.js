export default class Goal{
    constructor(name, description, date, goalID = null){
        this.goalID = goalID;
        this.name = name;
        this.description = description;
        this.date = date;
    }
}