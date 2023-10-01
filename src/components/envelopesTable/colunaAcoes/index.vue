<template>
  <td class="text-left botoes">
    <q-btn
     flat 
     round 
     color="primary"
      icon="download" 
       @click="fetchDocumento"
       :disable="disableDownloadDocumento"
       :loading="loadingDownload"
       >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
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
import useNotify from 'src/composables/useNotify';
import ModalEncaminharParaAssinatura from '../../modalEncaminharParaAssinatura/index.vue';
import { downloadDocumento } from 'src/utils/downloadDocumento';

const {notifyError} = useNotify();

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
    const loadingDownload = ref(false);
    const disableEncaminhaParaAssinatura = ref(props.envelope.status !== '1');
    const disableDownloadDocumento = ref(props.envelope.status !== '3')

    const toggleModalEncaminharParaAssinatura = () => {
      openModalEncaminharAssinatura.value.open();
    }


    const fetchDocumento = async () => {
      loadingDownload.value = true;
      try {
        await downloadDocumento(envelope.value);
 

      } catch (error) {
        notifyError('Erro ao fazer download do documento');
      } finally {
        loadingDownload.value = false;
      }
    };


    return {
      openModalEncaminharAssinatura,
      toggleModalEncaminharParaAssinatura,
      disableEncaminhaParaAssinatura,
      disableDownloadDocumento,
      loadingDownload,
      fetchDocumento,
    };
  },
});
</script>

<style lang="scss">
  @import './style.scss';
</style>
