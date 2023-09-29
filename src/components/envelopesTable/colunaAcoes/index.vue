<template>
  <td class="text-left botoes">
    <q-btn flat round color="primary" icon="download" @click="downloadDocument">
      <q-tooltip>Fazer download do documento</q-tooltip>
    </q-btn>
    <q-btn flat round color="primary" icon="people">
      <q-tooltip>Signatários</q-tooltip>
    </q-btn>
    <q-btn flat round color="primary" icon="send">
      <q-tooltip>Encaminhar para assinatura</q-tooltip>
    </q-btn>
  </td>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Props } from './types';
import { Envelope } from 'src/services/types';

export default defineComponent({
  name: 'ColunaAcoes',
  props: {
    envelope: {
      type: Object as () => Envelope,
      required: true,
    },
  },
  setup(props: Props) {
    const envelope = ref(props.envelope);

    const downloadDocument = () => {
      console.log(envelope.value);
    };

    return {
      downloadDocument,
    };
  },
});
</script>

<style lang="scss">
  @import './style.scss';
</style>
