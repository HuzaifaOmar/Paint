import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/shapes";

class ShapeService {
  /**
   * Create a new shape
   * @param {Object} shapeRequest - Shape creation request details
   * @returns {Promise} Promise resolving with created shape data
   */
  static async createShape(shapeRequest) {
    console.log("create request", shapeRequest);
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, shapeRequest);
      console.log("create response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating shape:", error);
      throw error;
    }
  }

  /**
   * Update shape during drawing
   * @param {string} shapeId - ID of the shape to update
   * @param {Object} updateRequest - Update request details
   * @returns {Promise} Promise resolving with updated shape data
   */
  static async updateShapeDrawing(shapeId, updateRequest) {
    console.log("update request", shapeId, updateRequest);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/${shapeId}`,
        updateRequest
      );
      console.log("update response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating shape:", error);
      throw error;
    }
  }

  /**
   * Finalize shape after drawing
   * @param {string} shapeId - ID of the shape to finalize
   * @param {Object} finalizeRequest - Finalization request details
   * @returns {Promise} Promise resolving with finalized shape data
   */
  static async finalizeShape(shapeId, finalizeRequest) {
    console.log("finalize request", shapeId, finalizeRequest);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${shapeId}/finalize`,
        finalizeRequest
      );
      console.log("finalize response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error finalizing shape:", error);
      throw error;
    }
  }

  /**
   * Move a shape
   * @param {string} shapeId - ID of the shape to move
   * @param {Object} moveRequest - Move request details
   * @returns {Promise} Promise resolving with moved shape data
   */
  static async moveShape(shapeId, moveRequest) {
    console.log("move request", shapeId, moveRequest);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${shapeId}/move`,
        moveRequest
      );
      console.log("move response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating shape position:", error);
      throw error;
    }
  }

  /**
   * Transform a shape
   * @param {string} shapeId - ID of the shape to transform
   * @param {Object} transformRequest - Transform request details
   * @returns {Promise} Promise resolving with transformed shape data
   */
  static async transformShape(shapeId, transformRequest) {
    console.log("transform request", shapeId, transformRequest);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${shapeId}/transform`,
        transformRequest
      );
      console.log("transform response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error transforming shape:", error);
      throw error;
    }
  }

  /**
   * Erase/Delete a shape
   * @param {string} shapeId - ID of the shape to delete
   * @returns {Promise} Promise resolving with deletion result
   */
  static async eraseShape(shapeId) {
    console.log("delete request", shapeId);
    try {
      await axios.delete(`${API_BASE_URL}/${shapeId}/erase`);
    } catch (error) {
      console.error("Error erasing shape:", error);
      throw error;
    }
  }
}

export default ShapeService;
