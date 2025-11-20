import ExerciseType from "./ExerciseType";

export default class Exercise {
    /**
     * @param {string} name 
     * @param {ExerciseType} type 
     * @param {string} description 
     */
    constructor(name, type, description, id = null) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.id = id;
    }
}
