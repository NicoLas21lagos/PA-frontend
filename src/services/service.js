import axios from "axios";

const API_URL = "http://localhost:8081/v1/api";

// Users

//GET

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos", error);
    alert("Ocurrio un error al obtener los datos del usuario");
  }
};


// Notas


// POST
export const createNoteForUser = async (newNote) => {
  try {
    await axios.post(`${API_URL}/notas`, newNote);
  } catch (error) {
    console.error("Error al crear la nota", error);
    alert("Ocurrio un error al registrar la nota");
  }
};

// DELETE
export const deleteNoteById = async (noteId) => {
  try {
    await axios.delete(`${API_URL}/notas/${noteId}`);
  } catch (error) {
    console.error("Error al eliminar la nota", error);
    alert("Ocurrio un error al eliminar la nota");
  }
};

export const getNotasUsuario = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/notas/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos', error);
    alert('Ocurrio un error al obtener los datos');
  }
};
