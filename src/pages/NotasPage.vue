<template>
  <div class="container">
    <h2 class="my-4">Notas del Usuario</h2>
    <form @submit.prevent="crearNota">
      <div class="mb-3">
        <label for="titulo" class="form-label">Título:</label>
        <input
          type="text"
          v-model="nuevaNota.titulo"
          class="form-control"
          id="titulo"
          required
        />
      </div>
      <div class="mb-3">
        <label for="contenido" class="form-label">Contenido:</label>
        <textarea
          v-model="nuevaNota.contenido"
          class="form-control"
          id="contenido"
          rows="3"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Crear Nota</button>
    </form>

    <hr />
    <div v-if="notas.length === 0" class="alert alert-info">
      No hay notas disponibles.
    </div>
    <div v-else>
      <div v-for="nota in notas" :key="nota.id" class="card my-2">
        <div class="card-body">
          <h5 class="card-title">{{ nota.titulo }}</h5>
          <p class="card-text">{{ nota.contenido }}</p>
          <button @click="eliminarNota(nota.id)" class="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNota, deleteNoteById, getNotasUsuario } from "@/services/service.js";

export default {
  data() {
    return {
      notas: [],
      nuevaNota: {
        titulo: "",
        contenido: "",
      },
    };
  },
  mounted() {
    this.cargarNotasUsuario();
  },
  methods: {
    async cargarNotasUsuario() {
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
          throw new Error("No se encontró el userId en sessionStorage");
        }
        this.notas = await getNotasUsuario(userId);
      } catch (error) {
        console.error("Error al cargar las notas del usuario", error);
        alert("Ocurrió un error al cargar las notas del usuario");
      }
    },
    async crearNota() {
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
          throw new Error("No se encontró el userId en sessionStorage");
        }
        const nuevaNota = {
          titulo: this.nuevaNota.titulo,
          contenido: this.nuevaNota.contenido,
          user: {
            id: userId,
          },
        };
        await createNota(nuevaNota);
        this.nuevaNota.titulo = "";
        this.nuevaNota.contenido = "";
        await this.cargarNotasUsuario();
      } catch (error) {
        console.error("Error al crear la nota", error);
        alert("Ocurrió un error al crear la nota");
      }
    },
    async eliminarNota(notaId) {
      try {
        await deleteNoteById(notaId);
        await this.cargarNotasUsuario();
      } catch (error) {
        console.error("Error al eliminar la nota", error);
        alert("Ocurrió un error al eliminar la nota");
      }
    },
  },
};
</script>

<style></style>
