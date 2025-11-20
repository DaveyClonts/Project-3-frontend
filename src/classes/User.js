export default class User {
    constructor(firstName, lastName, token, id = -1) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
    }

    getFullName() {
        const fullName = this.firstName + " " + this.lastName;
        return fullName;
    }
}