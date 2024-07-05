<template>



<router-link class="mt-2 flex justify-center  bg-[#7747ff] hover:bg-violet-700 transition font-semibold rounded-lg text-base p-2 text-center   text-white" to="/notas">Volver Notas </router-link>

    <div class="flex items-center justify-center min-h-screen w-screen bg-gray-200 ">

        <div class="flex items-center justify-center min-h-screen w-screen bg-gray-200 ">
        <div class="flow-root rounded-lg border border-black py-3 shadow-lg w-5/12">
            <dl class="-my-4 divide-y divide-white text-sm">
                <div v-for="(value, key) in userData" :key="key" class="grid grid-cols-1 gap-7 p-3 even:bg-gray-50 sm:grid-cols-3 ">
                    <dt class="font-medium text-gray-900">{{ getLabel(key) }} </dt>
                    <dd class="text-gray-700 ">{{ value }}</dd>                       
                    <button @click="editarCampo(key)" class="ml-10 bg-[#7747ff] hover:bg-violet-700 transition text-white font-bold py-2 px-4 rounded">
                        Editar
                    </button>
                    
                </div>
                
            </dl>
        </div>
    </div>

    </div>


</template>

<script>
import { getUserByID,userIdLogeado } from '@/services/service.js';

export default {
    data() {
        return {
            pressNoEditar: true,
            userData: {
                username: '',
                name: '',
                lastname: '',
                email: '',
                password: '',
            },
        };
    },
    async created() {
        try {
            console.log("USER ID LOGEADO ES -> ",userIdLogeado());
            const userID = userIdLogeado();
            const userData = await getUserByID(userID);
            this.userData = {
                username: userData.username,
                name: userData.name,
                lastname: userData.lastname,
                email: userData.email,
                password: userData.password, 
            };
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            alert("Error en cargar el usuario")
        }
    },
    methods:{
        getLabel(key) {
            switch (key) {
                case 'username':
                    return 'Nombre de usuario';
                case 'name':
                    return 'Nombre';
                case 'lastname':
                    return 'Apellido';
                case 'email':
                    return 'Correo electrónico';
                case 'password':
                    return 'Contraseña';
                default:
                    return key; // Manejar otros campos según necesidad
            }
        },
        editarCampo(key) {
            console.log(`Editar ${key}`);
            // Aquí puedes implementar la lógica para editar el campo específico
            // Por ejemplo, mostrar un modal o navegar a una página de edición
        }
    }

}
</script>

<style></style>