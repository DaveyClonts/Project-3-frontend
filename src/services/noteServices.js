import apiClient from "./services.js";
import Note from "../classes/Note.js";

const API_ROOT = "notes";

export default {
  /**
   *
   * @param {Note} note
   */
  create(note) {
    try {
      console.log("Creating note: ", note);
      return apiClient.post(API_ROOT, note);
    } catch (error) {
      console.error("Error creating note:", error);
      return null;
    }
  },

  /**
   * @returns {Promise<Note>}
   */
  async getAll(goalID) {
    try {
      console.log("Retrieving notes for goal", goalID);
      const response = await apiClient.get(`${API_ROOT}/${goalID}`);
      console.log("Got notes:", response.data);

      return response.data.map((noteObject) => {
        const { note, goalID, date } = noteObject; // match backend
        return new Note(
          note,
          goalID,
          new Date(date).toISOString().replace("T", " ").slice(0, 16)
        );
      });
    } catch (err) {
      console.error("Error fetching notes:", err);
      return [];
    }
  },
};
