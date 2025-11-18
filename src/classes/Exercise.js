export const ExerciseType = {
    CARDIO: "Cardio",
    WEIGHTS: "Weights",
};

export default class Exercise {
    /**
     * @param {string} name 
     * @param {ExerciseType} type 
     * @param {string} description 
     */
    constructor(name, type, description) {
        this.name = name;
        this.type = type;
        this.description = description;
    }
}
