export default class User {
    constructor(firstName, lastName, role, token, id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.token = token;
    }

    getFullName() {
        const fullName = this.firstName + " " + this.lastName;
        return fullName;
    }

    isAthlete() {
        return this.role === "Athlete";
    }

    isCoach() {
        return this.role === "Coach";
    }

    isAdmin() {
        return this.role === "Admin";
    }
}
