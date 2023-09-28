<template>
  <q-card class="my-card card-container">
    <q-card-section class="card-section">
      <div class="card-header">
        <div class="container-title">
          <p class="card-title">Repositório 1</p>
          <p class="create-at">Criado em: 28/09/2023 09:41</p>
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
import {
  defineComponent,
} from 'vue';

 

export default defineComponent({
  name: 'CardRepositorio',
});
</script>

<style lang="scss">
  @import './style.scss';
</style>


