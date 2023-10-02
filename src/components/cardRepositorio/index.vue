<template>
  <q-card class="my-card card-container">
    <q-card-section class="card-section">
      <div class="card-header">
        <div class="container-title">
          <p class="card-title">{{ repositorio.nome }}</p>
          <p class="create-at">{{ criadoEm }}</p>
        </div>
      </div>
      <div class="button-container">
        <q-btn
          color="primary"
          label="Ver envelopes"
          class="button"
          icon="mail"
          @click="verEnvelopes(repositorio.id)"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, provide } from 'vue';
import { formatDate } from 'src/utils/date';

export default defineComponent({
  name: 'CardRepositorio',
  props: {
    repositorio: {
      type: Object,
      required: true,
    },
  },
  setup: (props) => {
    const router = useRouter();

    const criadoEm = formatDate(props.repositorio.dataHoraCriacao);

    const verEnvelopes = (repositorioId: string) => {
      provide('repositorioId', repositorioId);
      router.push(`/envelopes/${repositorioId}`);
    };

    return {
      criadoEm,
      verEnvelopes,
    };
  },
});
</script>

<style lang="scss">
  @import './style.scss';
</style>
