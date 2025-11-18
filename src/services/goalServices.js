import apiClient from "./services.js";
import Goal from "../classes/Goal.js";
import store from "../store/store.js";

const API_ROOT = "goals";

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
  async get(id) {
    console.log("Retrieving");
    await apiClient
      .get(`${API_ROOT}/${id}`)
      .then((response) => {
        console.log("Got");
        console.log(response.body);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  },

  /**
   * @returns {Promise<Goal>}
   */
  async getAll() {
    try {
        const userID = store.getUser().id;
        console.log("Retrieving goals for user", userID);
        const response = await apiClient.get(`${API_ROOT}/${userID}`);
        console.log("Got goals:", response.data);

        return response.data.map((goalObject) => {
            const { name, description, date, userID, goalID } = goalObject; // match backend
            return new Goal(name, description, date, userID, goalID);
        });
    } catch (err) {
        console.error("Error fetching goals:", err);
        return [];
    }
},

/**
   * @returns {Promise<Goal>}
   */
  async delete(goalID) {
    try {
      return apiClient.delete(`${API_ROOT}/${goalID}`);
    } catch (error) {
      console.error("Error creating course:", error);
      return null;
    }
},

/**
   * @returns {Promise<Goal>}
   */
  async update(goal) {
    try {
      return apiClient.put(`${API_ROOT}/${goal.goalID}`, goal);
    } catch (error) {
      console.error("Error creating course:", error);
      return null;
    }
}
};
