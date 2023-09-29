<template>
  <q-page>
    <div class="loading" v-if="loadingRepos" >
       <q-spinner 
          color="primary"
          size="3em"
          :thickness="2" 
        />
    </div>
     <div v-else>
      <div class="col-12 title-container">
        <p class="title">MEUS REPOSITÓRIOS</p>
      </div>
      <div class="cards-container">
        <CardRepositorio
          v-for="repositorio in repositorios"
          :key="repositorio.id"
          :repositorio="repositorio"
          class="card"
        />
      </div>
    </div>
    
  </q-page>
</template>


<script lang="ts">
import useNotify from 'src/composables/useNotify';
import { getReposUsuario } from 'src/services/usuario';
import { defineComponent, inject,  ref, watchEffect} from 'vue';
import CardRepositorio from '../../components/cardRepositorio/index.vue';

export default defineComponent({
  name: 'IndexPage',
   components: {
    CardRepositorio, 
  },
   setup () {
    const usuarioId = inject('usuarioId');
    const loadingRepos = ref(true);
    const repositorios = ref([]);
    const {notifyError} = useNotify();

    const fetchRepoitoriosData = async () => {
      try {
        const response = await getReposUsuario({idProprietario: usuarioId.value as string});
        repositorios.value = response.data.response;

      } catch (error) {
        notifyError('Erro ao buscar usuário');
      } finally {
        loadingRepos.value = false;
      }
    };


   watchEffect(() => {
    if (usuarioId.value) {
      fetchRepoitoriosData();
    }
  });


    return {
      loadingRepos,
      repositorios,
    }
  }
  }
);
</script>


<style lang="scss">
  @import './styles.scss';
</style>


