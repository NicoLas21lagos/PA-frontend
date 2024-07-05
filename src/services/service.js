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

export const getUserByID = async (userID) => {
  try {
      const response = await axios.get(`${API_URL}/users/${userID}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
  }
};


export const postCreateUser = async (user) => {

  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error('There was an error creating the user!', error);
    throw error;
  }
}

export const updateUser = async (userId, userUpdates) => {
  try {
      const response = await axios.put(`${API_URL}/users/${userId}/update`, userUpdates);
      return response.data;
  } catch (error) {
      console.error('Error updating user:', error);
      throw error;
  }
};


// Notas


// faltaria un post de notas
export const createNota = async (nota) => {
  try {
    const response = await axios.post(`${API_URL}/notas`, nota);
    return response.data;
  } catch (error) {
    console.error("Error al crear la nota", error);
    throw new Error("Error al crear la nota");
  }
};

//UPDATE

export const updateNota = async (notaId, notaActualizada) => {
  try {
    const response = await axios.put(`${API_URL}/notas/${notaId}`, notaActualizada);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la nota", error);
    throw new Error("Error al actualizar la nota");
  }
}

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

export const getNotasPublicas = async () => {
  try {
    const response = await axios.get(`${API_URL}/notas/publicas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las notas públicas:', error);
    throw new Error('Error al obtener las notas públicas');
  }
};



//local storage
export const userIdLogeado = () => {
  const userId = sessionStorage.getItem("userId");
  return userId;
};

