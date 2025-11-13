import apiClient from "./services.js";
import Goal from "../classes/Goal.js";

const STATUS_OK = 200;
const API_ROOT = "/goal/";

export default {
    /**
     *
     * @param {Goal} goal
     */
    create(goal) {
        try {
            return apiClient.post(API_ROOT, goal);
        } catch (error) {
            console.error("Error creating course:", error);
            return null;
        }
    },

    /**
     * 
     * @param {Goal[]} goals 
     */
    createAll(goals) {
        try {
            return apiClient.post(`${API_ROOT}all`, goals);
        } catch (error) {
            console.error("Error creating multiple goals!");
            return null;
        }
    },

    /**
     * @returns {Promise<Goal>}
     */
    async getAll() {
        const response = await apiClient.get(API_ROOT);
        return response.data.map((goalObject) => {
            const {
                name,
                description,
                dueDate,
            } = goalObject;

            return new Goal(
                name,
                description,
                dueDate
            );
        });
    },

    /**
     *
     * @param {Goal} goal
     * @returns {Promise<Goal>}
     */
    update(goalID, goal) {
        return apiClient.put(`${API_ROOT}${courseNumber}`, course);
    },

    /**
     *
     * @param {string} courseNumber
     * @returns {Promise<Course | null>}
     */
    async find(courseNum) {
        try {
            const response = await apiClient.get(`${API_ROOT}${courseNum}`);

            const {
                courseNumber,
                name,
                department,
                description,
                level,
                hours,
            } = response.data;

            console.log(response.data);

            return new Course(
                courseNumber,
                name,
                department,
                description,
                level,
                hours
            );
        } catch (error) {
            console.error(
                `Could not find course with courseNumber: ${courseNum}`
            );
            return null;
        }
    },

    /**
     *
     * @param {string} courseNumber
     */
    delete(courseNumber) {
        return apiClient.delete(`${API_ROOT}${courseNumber}`);
    },

    /**
     *
     * @returns {Promise<AxiosResponse>}
     */
    deleteAll() {
        return apiClient.delete(API_ROOT);
    },
};