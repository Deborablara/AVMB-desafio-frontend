<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section>
        <p color="primary">
          Tem certeza que deseja encaminhar o <b>{{ envelope.descricao }}</b> para assinatura?
        </p>
      </q-card-section>
      <q-card-section>
        <div class="buttonsContainer">
          <q-btn color="primary" outline label="Não, cancelar" class="cancelarButton" @click="close" />
          <q-btn color="primary" label="Sim, encaminhar" @click="encaminharParaAssinatura" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { encaminharEnvelopeParaAssinatura } from 'src/services/envelope';
import { defineComponent, ref } from 'vue';
import useNotify from 'src/composables/useNotify';
import { Envelope } from 'src/services/types';

const { notifySuccess, notifyError } = useNotify();

export default defineComponent({
  name: 'ModalEncaminharParaAssinatura',
  props: {
    envelope: {
      type: Object as () => Envelope,
      required: true,
    },
     fetchEnvelopesData: {
      type: Function as () => void,
      required: true,
    },
  },
  setup(props, context) {
    const show = ref(false);

    function open() {
      show.value = true;
    }

    function close() {
      show.value = false;
    }

    const encaminharParaAssinatura = async () => {
      try {
        await encaminharEnvelopeParaAssinatura({ id: props.envelope.id });
        notifySuccess('Envelope encaminhado para assinatura com sucesso!');
        props.fetchEnvelopesData();
        close();
      } catch (error: any) {
        notifyError(`${error.response.data.error}`);
        close();
      }
    }

    context.expose({ open, close });

    return {
      show,
      open,
      close,
      encaminharParaAssinatura,
    }
  },
});
</script>

<style lang="scss">
  @import './style.scss';
</style>
