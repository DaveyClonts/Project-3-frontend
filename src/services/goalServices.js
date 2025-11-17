import apiClient from "./services.js";
import Goal from "../classes/Goal.js";

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
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  },

  /**
   * @returns {Promise<Goal>}
   */
  async getAll() {
    console.log("Retrieving");
    await apiClient
      .get(API_ROOT)
      .then((response) => {
        console.log("Got");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  },
};
