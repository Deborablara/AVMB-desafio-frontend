<template>
  <q-dialog v-model="show">
    <q-card class="cardContainer">
      <q-card-section>
        <p class="modalTitle">Signatários do Envelope</p>
      </q-card-section>
      <q-card-section class="loading" v-if="loading">
        <q-spinner
          color="primary"
          size="3em"
          :thickness="2"
        />
      </q-card-section>
      <q-card-section>
        <div v-if="signatarios?.length > 0">
          <ul>
            <li v-for="(signatario, index) in signatarios" :key="index">
              {{ signatario.ConfigAssinatura.nomeSignatario }} - {{ signatario.ConfigAssinatura.emailSignatario }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Ainda não há signatários para este envelope.</p>
        </div>
      </q-card-section>
      <q-card-actions class="buttonsContainer">
        <q-btn @click="close" label="Cancelar" color="primary" outline />
        <q-btn @click="toggleAdicionarSignatario" label="Adicionar Signatário" icon="add" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showAdicionarSignatario">
    <q-card class="cardContainer">
      <q-card-section>
        <p class="modalTitle">Adicionar Signatário</p>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="signatario.nome"
          label="Nome do Signatário"
          :rules="[val => (val && val !== '') || 'Nome do signatário é obrigatório']"
        />
        <q-input
          v-model="signatario.email"
          label="Email do Signatário"
          :rules="[val => (val && val !== '') || 'Email do signatário é obrigatório']"
          class="input"
          type="email"
        />
      </q-card-section>
      <q-card-actions class="buttonsContainer">
        <q-btn @click="closeAdicionarSignatario" label="Cancelar" color="primary" outline />
        <q-btn @click="adicionarNovoSignatario" label="Salvar" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref, defineComponent, watchEffect } from 'vue';
import useNotify from 'src/composables/useNotify';
import { Envelope } from 'src/services/types';
import { buscarSignatarios, adicionarSignatario } from 'src/services/envelope';

const { notifySuccess, notifyError } = useNotify();

export default defineComponent({
  name: 'SignatariosModal',
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
    const loading = ref(false);
    const signatarios = ref();
    const showAdicionarSignatario = ref(false);
    const signatario = ref({
      nome: '',
      email: ''
    });

    const openModal = () => {
      show.value = true;
    };

    const close = () => {
      show.value = false;
    };

    const toggleAdicionarSignatario = () => {
      showAdicionarSignatario.value = true;
      close();
    };

    const closeAdicionarSignatario = () => {
      showAdicionarSignatario.value = false;
    };

    const fetchSignatariosData = async () => {
      loading.value = true;
      try {
        const { data } = await buscarSignatarios({ idEnvelope: props.envelope.id as string });
        signatarios.value = data.data.response;
      } catch (error) {
        notifyError('Erro ao buscar envelope');
      } finally {
        loading.value = false;
      }
    };

    const adicionarNovoSignatario = async () => {
      if (!signatario.value.nome || !signatario.value.email) {
        notifyError('Preencha os campos');
      } else {
        const data = {
          SignatarioEnvelope: {
            Envelope: {
              id: props.envelope.id,
            },
            ConfigAssinatura: {
              emailSignatario: signatario.value.email,
              nomeSignatario: signatario.value.nome
            }
          }
        };

        try {
          await adicionarSignatario(data);
          props.fetchEnvelopesData();
          closeAdicionarSignatario();
          notifySuccess('Signatário adicionado com sucesso!');
        } catch (error) {
          notifyError('Falha ao adicionar signatario, entre em contato com o suporte');
        }
      }
    };

    watchEffect(() => {
      if (props.envelope.id && show.value) {
        fetchSignatariosData();
      }
    });

    context.expose({ openModal, close });

    return {
      show,
      openModal,
      close,
      signatarios,
      loading,
      toggleAdicionarSignatario,
      closeAdicionarSignatario,
      adicionarNovoSignatario,
      showAdicionarSignatario,
      signatario,
    };
  },
});
</script>

<style lang="scss">
@import './style.scss';
</style>
