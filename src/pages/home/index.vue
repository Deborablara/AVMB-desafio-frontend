<template>
  <q-page>
     <div class="col-12 title-container">
      <p class="title">MEUS REPOSITÓRIOS</p>
    </div>
      <div class="cards-container">
        <CardRepositorio class="card" />
        <CardRepositorio class="card" />
        <CardRepositorio class="card" />
        <CardRepositorio class="card" />
        <CardRepositorio class="card" />
        <CardRepositorio class="card" />
        <CardRepositorio class="card" />
        <CardRepositorio class="card" />
        <CardRepositorio class="card" />
      </div>
  </q-page>
</template>


<script lang="ts">
import { defineComponent} from 'vue';
import CardRepositorio from '../../components/cardRepositorio/index.vue';

export default defineComponent({
  name: 'IndexPage',
   components: {
    CardRepositorio, 
  },
  data() {
    return {
      cards: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
      ],
    };
  },
  }
);
</script>


<style lang="scss">
  @import './styles.scss';
</style>


