<template>
  <q-card class="my-card card-container">
    <q-card-section class="card-section">
      <div class="card-header">
        <div class="container-title">
          <p class="card-title">{{ repositorio.nome }}</p>
          <p class="create-at">{{criadoEm}}</p>
        </div>
      </div>
      <div class="button-container">
        <q-btn 
          color="primary"
          label="Ver envelopes" 
          class="button"
          icon="mail"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { format } from 'date-fns';
import {defineComponent} from 'vue';

 

export default defineComponent({
  name: 'CardRepositorio',
  props: {
    repositorio: {
      type: Object,
      required: true,
    },
  },
  setup: (props) => {
    const formatarDataCriacao = new Date(props.repositorio.dataHoraCriacao);
    const criadoEm = format(formatarDataCriacao, 'dd/MM/yyyy HH:mm');

    return {
      criadoEm,
    }
  }

});
</script>

<style lang="scss">
  @import './style.scss';
</style>


