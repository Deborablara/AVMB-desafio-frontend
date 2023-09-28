<template>
  <q-page>
    <div class="col-12 title-container">
      <p class="title">MEUS REPOSITÓRIOS</p>
    </div>
    <RepositoriosComponent></RepositoriosComponent>
  </q-page>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import RepositoriosComponent from '../../components/repositorios/Repositorios.vue';

export default defineComponent({
  name: 'IndexPage',
   components: {
    RepositoriosComponent, 
  }
  }
);
</script>


<style lang="scss">
  @import './styles.scss';
</style>


