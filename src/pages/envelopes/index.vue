<template>
  <q-page>
    <div class="loading" v-if="loadingEnvelopes" >
       <q-spinner 
          color="primary"
          size="3em"
          :thickness="2" 
        />
    </div>
     <div v-else>
      <div class="col-12 title-container">
        <p class="title">ENVELOPES</p>
        <q-btn color="primary" icon="add" label="Novo envelope" @click="toggleModalEnvelopeForm"/>
      </div>
      <div class="col-12">
       <EnvelopesTable :envelopes="envelopes" />
      </div>
    </div>
    <EnvelopeForm  ref="openModalEnvelopeForm" :repositorio="repositorio"/>
  </q-page>
</template>


<script lang="ts">
import useNotify from 'src/composables/useNotify';
import { getEnvelopes } from 'src/services/envelope';
import {getRepositorio} from 'src/services/repositorio';
import { defineComponent, ref, watchEffect} from 'vue';
import { useRoute } from 'vue-router';
import EnvelopesTable from 'src/components/envelopesTable/index.vue';
import EnvelopeForm from 'src/components/envelopeForm/index.vue';
import { Envelope } from 'src/services/types';

export default defineComponent({
  name: 'EnvelopesList',
   components: {
    EnvelopesTable,
    EnvelopeForm, 
  },
   setup () {
    const {notifyError} = useNotify();
    const route = useRoute();

    const loadingEnvelopes = ref(true);
    const envelopes = ref<Envelope[]>([]);
    const repositorio = ref();
    const openModalEnvelopeForm = ref();

    const repositorioId =  route.params.repositorioId;

    const toggleModalEnvelopeForm = () => {
      openModalEnvelopeForm.value.open();
    }

    const fetchEnvelopesData = async () => {
      try {
        const {data} = await getEnvelopes({idRepositorio: repositorioId as string});
        envelopes.value = data.data.response;
 

      } catch (error) {
        notifyError('Erro ao buscar usuário');
      } finally {
        loadingEnvelopes.value = false;
      }
    };

      const fetchRepositorioData = async () => {
      try {
        const {data} = await getRepositorio({idRepositorio: repositorioId as string});
        repositorio.value = data.data.response;
 

      } catch (error) {
        notifyError('Erro ao buscar repositório');
      } finally {
        loadingEnvelopes.value = false;
      }
    };

   watchEffect(() => {
    if (repositorioId) {
      fetchRepositorioData();
      fetchEnvelopesData();
    }
  });


    return {
      loadingEnvelopes,
      envelopes,
      repositorio,
      toggleModalEnvelopeForm,
      openModalEnvelopeForm
    }
  }
  }
);
</script>


<style lang="scss">
  @import './styles.scss';
</style>


