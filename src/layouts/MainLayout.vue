<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Menu
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import useNotify from '../composables/useNotify';
import { defineComponent, ref, onMounted } from 'vue';
import { getUsuarioId, getDadosUsuario } from '../services/usuario';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    route: {name: 'home'}
  },

];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const {notifySuccess, notifyError} = useNotify();
    const leftDrawerOpen = ref(false)
    const usuarioId = ref(null);
    const usuario = ref(null);

    const fetchUsuarioData = async () => {
      try {
        const idResponse = await getUsuarioId();
        usuarioId.value = idResponse.data.Usuario.id;

        const dadosResponse = await getDadosUsuario({ idUsuario: usuarioId.value });
        usuario.value = dadosResponse.data;

        notifySuccess(`Bem-vindo(a) ${usuario.value.nome}`);

      } catch (error) {
        notifyError('Erro ao buscar usuário');
      }
    };

    onMounted(() => {
      fetchUsuarioData(); 
    });


    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
