<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="logo-container">
          <img src="../../assets/img/logo-avmb.png" alt="Minha Figura">
        </q-toolbar-title>
        <div>
          {{ usuario?.nome }}
          <q-icon name="account_circle" size="sm" class="iconeUsuario" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import useNotify from '../../composables/useNotify';
import { defineComponent, ref, onMounted, provide } from 'vue';
import { getUsuarioId, getDadosUsuario } from '../../services/usuario';
import { Usuario } from '../../services/types';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const { notifySuccess, notifyError } = useNotify();

    const usuarioId = ref('');
    const usuario = ref<Usuario | null>(null);
    provide('usuarioId', usuarioId);

    const fetchUsuarioData = async () => {
      try {
        const idResponse = await getUsuarioId();
        usuarioId.value = idResponse.data.Usuario.id;

        const dadosResponse = await getDadosUsuario({ idUsuario: usuarioId.value });
        usuario.value = dadosResponse.data;

        notifySuccess(`Bem-vindo(a) ${usuario?.value?.nome}`);
      } catch (error) {
        notifyError('Erro ao buscar usuário');
      }
    };

    onMounted(() => {
      fetchUsuarioData();
    });

    return {
      usuario,
      usuarioId
    }
  }
});
</script>

<style lang="scss">
  @import './style.scss';
</style>
