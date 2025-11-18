export default class Goal{
    constructor( name, description, date, userID, goalID = null){
        this.goalID = goalID;
        this.name = name;
        this.description = description;
        this.date = date;
        this.userID = userID;
    }
}