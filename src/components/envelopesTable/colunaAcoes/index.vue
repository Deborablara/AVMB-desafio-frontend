<template>
  <td class="text-left botoes">
    <q-btn flat round color="primary" icon="download"  @click="downloadDocument">
      <q-tooltip>Fazer download do documento</q-tooltip>
    </q-btn>
    <q-btn flat round color="primary" icon="people">
      <q-tooltip>Signatários</q-tooltip>
    </q-btn>
    <q-btn
      flat
        round 
        color="primary"
        :disable="disableEncaminhaParaAssinatura"
        icon="send"
        @click="toggleModalEncaminharParaAssinatura"
    >
      <q-tooltip>Encaminhar para assinatura</q-tooltip>
    </q-btn>
  </td>
    <ModalEncaminharParaAssinatura  ref="openModalEncaminharAssinatura" :envelope="envelope"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Props } from './types';
import { Envelope } from 'src/services/types';
import ModalEncaminharParaAssinatura from '../../modalEncaminharParaAssinatura/index.vue';

export default defineComponent({
  name: 'ColunaAcoes',
  components: {
    ModalEncaminharParaAssinatura,
  },
  props: {
    envelope: {
      type: Object as () => Envelope,
      required: true,
    },
  },
  setup(props: Props) {
    const envelope = ref(props.envelope);
    const openModalEncaminharAssinatura = ref();
    const disableEncaminhaParaAssinatura = ref(props.envelope.status !== '1');

    const toggleModalEncaminharParaAssinatura = () => {
      openModalEncaminharAssinatura.value.open();
    }

    const downloadDocument = () => {
      console.log(envelope.value);
    };

    return {
      downloadDocument,
      openModalEncaminharAssinatura,
      toggleModalEncaminharParaAssinatura,
      disableEncaminhaParaAssinatura,
    };
  },
});
</script>

<style lang="scss">
  @import './style.scss';
</style>
