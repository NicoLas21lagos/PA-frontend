<template>
  <div class="page-container">
    <div class="container m-auto">
      <div class="row">
        <div class="col-10 justify-content-center align-items-center bg-custom">
          <div class="col-md-10 p-3">
            <h2 class="text-white mb-3">Notas</h2>
            <h4 v-if="notas.length === 0" class="text-white m-5 text-center">
              No tienes notas por el momento
            </h4>
            <div v-for="nota in notas" :key="nota.id" class="col-md-3 d-inline-flex m-2">
              <div class="card card-custom">
                <div class="card-header text-center" id="titulo-nota">
                  <strong>{{ nota.titulo }}</strong>
                </div>
                <div class="card-body" id="contenido-nota">
                  <p>{{ nota.contenido }}</p>
                </div>
              </div>
            </div>
            <br />
            <div class="col">
              <button
                @click="returnPrevPag"
                class="btn btn-light mt-4 mb-4"
                id="back-button"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import userService from "@/services/service.js";

const router = useRouter();
const userId = sessionStorage.getItem("userId");
const notas = ref([]);

const cargarNotasUsuario = async () => {
  if (userId) {
    try {
      const response = await userService.getNotasUsuario(userId);
      notas.value = response.data;
    } catch (error) {
      console.error("Error al obtener las notas del usuario:", error);
    }
  } else {
    console.error("No se encontró un userId en sessionStorage");
  }
};

onMounted(cargarNotasUsuario);

const returnPrevPag = () => {
  router.back();
};
</script>

<style scoped>
.bg-custom {
  background: linear-gradient(#0084ff, #0ad3fe);
  border-radius: 25px;
  margin: 5% 9%;
}

#titulo-nota {
  background-color: #07155e;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

.card-custom {
  border: 1px solid black;
}

#contenido-nota {
  background-color: rgba(10, 211, 255, 0.3);
}

#back-button {
  color: #07155e;
  border: none;
  font-weight: 700;
  font-size: large;
  float: right;
  padding-left: 20px;
  padding-right: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

#back-button:hover {
  background-color: #07155e;
  color: white;
  border: none;
  font-weight: 700;
  font-size: large;
  float: right;
  padding-left: 20px;
  padding-right: 20px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
