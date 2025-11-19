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
      return apiClient.post(API_ROOT, note);
    } catch (error) {
      console.error("Error creating note:", error);
      return null;
    }
  },

  /**
   * @returns {Promise<Note>}
   */
  async getAll(id) {
    try {
        console.log("Retrieving notes for goal", id);
        const response = await apiClient.get(`${API_ROOT}/${id}`);
        console.log("Got notes:", response.data);
        return response.data.map((noteObject) => {
            const { note, date, goalID,  id } = noteObject; 
            const formattedDate = new Date(date).toISOString().replace("T", " ").replace("Z", "").split(".")[0].slice(0, 16); ;
            return new Note(note, goalID, formattedDate, id);
        });
    } catch (err) {
        console.error("Error fetching notes:", err);
        return [];
    }
},
}