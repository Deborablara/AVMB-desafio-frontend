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
        <q-btn color="primary" icon="add" label="Novo envelope"/>
      </div>
      <div class="col-12">
       <EnvelopesTable :envelopes="envelopes" />
      </div>
    </div>
    
  </q-page>
</template>


<script lang="ts">
import useNotify from 'src/composables/useNotify';
import { getEnvelopes } from 'src/services/envelope';
import { defineComponent, ref, watchEffect} from 'vue';
import { useRoute } from 'vue-router';
import EnvelopesTable from 'src/components/envelopesTable/index.vue';
import { Envelope } from 'src/services/types';

export default defineComponent({
  name: 'EnvelopesList',
   components: {
    EnvelopesTable, 
  },
   setup () {
    const {notifyError} = useNotify();
    const route = useRoute();

    const loadingEnvelopes = ref(true);
    const envelopes = ref<Envelope[]>([]);

    const repositorioId =  route.params.repositorioId;

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

   watchEffect(() => {
    if (repositorioId) {
      fetchEnvelopesData();
    }
  });


    return {
      loadingEnvelopes,
      envelopes
    }
  }
  }
);
</script>


<style lang="scss">
  @import './styles.scss';
</style>


