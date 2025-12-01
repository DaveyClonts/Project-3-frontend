export default class Goal{
    constructor( name, description, date, userID, id = null){
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.userID = userID;
    }
}