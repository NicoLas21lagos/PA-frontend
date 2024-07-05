<template>

  <div class="flex justify-center items-center w-full min-h-screen bg-gray-400">
    <div class="flex flex-col w-1/3 justify-center p-4 rounded-md text-black bg-white">

      <div class="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Bienvenido a <span class="text-[#7747ff]">Ecotech
          App</span></div>
      <div class="text-lg font-semibold mb-4 text-center text-[#1e0e4b]">Iniciar Sesion</div>

      <div class="flex flex-col gap-3 ">
        <div class="block relative">
          <label for="email" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Correo
            Electronico</label>
          <input type="text" id="email" v-model="form.email"
            class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0">

        </div>
        <div class="block relative">
          <label for="password"
            class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Contraseña</label>
          <input type="text" id="password" v-model="form.password"
            class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0">

        </div>

        <button @click="login"
          class="bg-[#7747ff] hover:scale-110 hover:bg-violet-700 transition w-max m-auto px-6 py-3 rounded text-white text-sm font-normal">Enviar</button>

      </div>
      <div class="text-sm text-center mt-[1.6rem]">Aun no tienes una cuenta? <a class="text-sm text-[#7747ff]"
          href="#">¡Regístrate gratis!</a></div>
    </div>
  </div>


</template>

<script>
import { getUsers } from "@/services/service.js";

export default {
  data() {
    return {
      error: "",
      form: {
        email: '',
        password: '',
      },




    };
  },
  methods: {
    async login() {
      try {
        const users = await getUsers();
        const user = users.find((user) => user.email === this.form.email && user.password === this.form.password);
        if (user) {
          sessionStorage.setItem("userId", user.id);
          console.log("Usuario logeado correcamente ", user)
          this.$router.push("/notas");
        } else {
          this.error = "Nombre de usuario o contraseña incorrectos";
        }
      } catch (error) {
        this.error = "Error al cargar los datos de usuario";
      }
    },
  },
};
</script>

<style>
#card {
  background-color: rgb(22, 30, 31);
  border-radius: 25px;
  padding: 20px;
  width: 90%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

#btn {
  margin-top: 1rem;
  position: relative;
  top: -30px;
}

#row {
  position: relative;
  left: 5%;
}
</style>