<template>
  <div class="container">
    <h2 class="my-4">Notas del Usuario</h2>
    <form @submit.prevent="crearNota">
      <div class="mb-3">
        <label for="titulo" class="form-label">Título:</label>
        <input type="text" v-model="nuevaNota.titulo" class="form-control" id="titulo" required />
      </div>
      <div class="mb-3">
        <label for="contenido" class="form-label">Contenido:</label>
        <textarea v-model="nuevaNota.contenido" class="form-control" id="contenido" rows="3" required></textarea>
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
          <button @click="abrirModal(nota)" class="btn btn-secondary">Editar</button>
          <button @click="eliminarNota(nota.id)" class="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <div v-if="notaEditando" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Nota</h5>
            <button type="button" class="close" @click="cerrarModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="actualizarNota">
              <div class="mb-3">
                <label for="editTitulo" class="form-label">Título:</label>
                <input type="text" v-model="notaEditando.titulo" class="form-control" id="editTitulo" required />
              </div>
              <div class="mb-3">
                <label for="editContenido" class="form-label">Contenido:</label>
                <textarea v-model="notaEditando.contenido" class="form-control" id="editContenido" rows="3"
                  required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Actualizar Nota</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>




  <router-link
    class="flex justify-center  bg-[#7747ff] hover:bg-violet-700 transition font-semibold rounded-lg text-base p-2 text-center   text-white"
    to="/perfil">Perfil Usuario</router-link>
</template>



<script>
import { createNota, deleteNoteById, getNotasUsuario, updateNota } from "@/services/service.js";

export default {
  data() {
    return {
      notas: [],
      nuevaNota: {
        titulo: "",
        contenido: "",
      },
      notaEditando: null,
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
    abrirModal(nota) {
      this.notaEditando = { ...nota };
    },
    cerrarModal() {
      this.notaEditando = null;
    },
    async actualizarNota() {
      try {
        await updateNota(this.notaEditando.id, this.notaEditando);
        this.cerrarModal();
        await this.cargarNotasUsuario();
      } catch (error) {
        console.error("Error al actualizar la nota", error);
        alert("Ocurrió un error al actualizar la nota");
      }
    },
  },
};
</script>

<style></style>
