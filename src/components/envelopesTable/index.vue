<template>
  <div class="q-pa-md">
    <q-table
      :rows="rows"
      :columns="columns"
      :row-key="row => row.id"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watchEffect} from 'vue';

const formatStatus = (status: string) => {
  switch (status) {
    case '1':
      return {
        label: 'Em construção',
        color: 'yellow',
      };
    case '2':
      return {
        label: 'Aguardando Assinaturas',
        color: 'blue',
      };
    case '3':
      return {
        label: 'Concluído',
        color: 'green',
      };
    case '4':
      return {
        label: 'Arquivado',
        color: 'gray',
      };
    case '5':
      return {
        label: 'Cancelado',
        color: 'red',
      };
    case '6':
      return {
        label: 'Expirado',
        color: 'orange',
      };
    default:
      return {
        label: 'Desconhecido',
        color: 'black',
      };
  }
};


const columns = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    field: row => row.id,
  },
  {
    name: 'descricao',
    required: true,
    label: 'Descrição',
    align: 'left',
    field: row => row.descricao,
  },
  {
    name: 'criadoEm',
    required: true,
    label: 'Criado em',
    align: 'left',
    field: row => row.criadoEm,
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: row => row.status,
    format: (val: string) => ({
      component: 'q-chip',
      props: {
        color: formatStatus(val).color, 
        label: formatStatus(val).label, 
      },
    }),
  }
]

export default defineComponent({
  name: 'EnvelopesTable',
  props: {
    envelopes: {
      type: Array,
      required: true,
    },
  },
  setup: (props) => {
      const rows = ref([]);
    const formatRows = () => {
      return props?.envelopes?.map((envelope) => ({
      id: envelope.id,
      descricao: envelope.descricao,
      criadoEm: envelope.dataHoraCriacao,
      status: envelope.status,
      }));
    }

     watchEffect(() => {
    if (Array.isArray(props.envelopes)) {
      rows.value = formatRows();
    }
  });


    return {
      columns,
      rows
    }
  }

});
</script>

<style lang="scss">
  @import './style.scss';
</style>


