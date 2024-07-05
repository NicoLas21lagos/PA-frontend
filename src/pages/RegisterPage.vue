<template>
    <div class="bg-gray-300">
        <div
            class="flex flex-col items-center justify-center min-h-screen w-screen px-6 py-8 mx-auto lg:py-0 shadow-2xl">
            <div class="w-5/12 bg-white rounded-lg shadow border md:mt-0  xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <p class="text-xl font-bold items-center text-[#6d37ff] md:text-2xl">
                        Crear cuenta
                    </p>
                    <div>
                        <label class="block mb-2 text-sm font-semibold text-[#5d3cb8]">Nombre de usuario</label>
                        <input placeholder="Ingrese nombre.." v-model="form.username"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            id="username" type="text">
                    </div>
                    <div class="flex space-x-4">
                        <div class="w-1/2">
                            <label class="block mb-2 text-sm font-semibold text-[#5d3cb8]">Nombre</label>
                            <input placeholder="Ingrese nombre.." v-model="form.name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                id="username" type="text">
                        </div>
                        <div class="w-1/2">
                            <label class="block mb-2 text-sm font-semibold text-[#5d3cb8]">Apellido</label>
                            <input placeholder="Ingrese apellido..." v-model="form.lastname"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                id="lastname" type="text">
                        </div>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-semibold text-[#5d3cb8]">Correo Electronico</label>
                        <input placeholder="Correo electronico..." v-model="form.email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            id="correoElectronico" type="text">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-semibold text-[#5d3cb8]">Contraseña</label>
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            placeholder="••••••••" id="password" type="password" v-model="form.password">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-semibold text-[#5d3cb8]">Confirmar Contraseña</label>
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            placeholder="••••••••" id="confirmPassword" type="password" v-model="repeatPassword">
                    </div>

                    <div>

                        <button
                            class="w-full bg-[#7747ff] hover:bg-violet-700 transition font-semibold rounded-lg text-base p-2 text-center   text-white"
                            type="submit" @click="verificarDatos">
                            Crear cuenta
                        </button>
                    </div>
                    <router-link
                        class="flex justify-center items-center bg-red-500 p-2 rounded-lg text-white hover:bg-red-700 transition font-semibold text-base"
                        to="/">Iniciar Sesion</router-link>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { postCreateUser } from "@/services/service.js";
export default {
    data() {
        return {
            error: '',
            repeatPassword: '',
            form: {
                username: '',
                name: '',
                lastname: '',
                email: '',
                role: 'USER',
                password: '',

            },
        }
    },
    methods: {


        verificarDatos() {

            console.log("valida ", this.validarFormulario())
            if (this.validarFormulario()) {
                this.crearUsuario();
            }

        },
        validarFormulario() {
            return this.validarEmail(this.form.email) &&
                this.validarContraseña(this.form.password, this.repeatPassword) &&
                this.validarCamposNoVacios();
        },

        validarEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            console.log(email.length)
            if (regex.test(email)) {
                return email.length > 4 && regex.test(email);
            } else {
                alert("Correo electronico invalido");
            }
        },

        validarContraseña(password, repeatPassword) {
            const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;
            if (password === repeatPassword && regex.test(password)) {
                return regex.test(password);
            } else {
                alert("Contraseña invalida (minimo 8 caracteres, 1 letra mayuscula, 1 Caracter especial)")
            }
        },
        validarCamposNoVacios() {
            return this.form.username &&
                this.form.name &&
                this.form.lastname &&
                this.form.email &&
                this.form.password &&
                this.repeatPassword;
        },
        async crearUsuario() {
            try {
                const newUser = await postCreateUser(this.form);
                console.log('Usuario creado:', newUser);
                this.$router.push("/");
            } catch (error) {
                alert("Error al crear el usuario")
            }
        },
    }

}


</script>

<style></style>