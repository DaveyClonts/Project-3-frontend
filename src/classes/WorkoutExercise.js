export default class WorkoutExercise {
    constructor(workoutID, exerciseID, fromDatabase = false) {
        this.workoutID = workoutID;
        this.exerciseID = exerciseID;
        this.fromDatabase = fromDatabase;
    }

    static WeightExercise(workoutID, exerciseID, reps, sets, weight, fromDatabase = false) {
        let workoutExercise = new WorkoutExercise(workoutID, exerciseID, fromDatabase);
        workoutExercise.reps = reps;
        workoutExercise.sets = sets;
        workoutExercise.weight = weight;

        return workoutExercise;
    }

    static CardioExercise(workoutID, exerciseID, miles, time, fromDatabase = false) {
        let workoutExercise = new WorkoutExercise(workoutID, exerciseID, fromDatabase);
        workoutExercise.miles = miles;
        workoutExercise.time = time;

        return workoutExercise;
    }
}