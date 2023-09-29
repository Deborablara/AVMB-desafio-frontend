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
import {defineComponent,  ref, watchEffect} from 'vue';
import {formatStatus} from '../statusChip/index';
import {formatDate} from '../../utils/date';
import {Props} from './types';
import { Envelope } from 'src/services/types';

type EnvelopeRow = {
  id: string,
  descricao: string,
  criadoEm: string,
  status: string
}

const columns = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    field: (row: EnvelopeRow) => row.id,
  },
  {
    name: 'descricao',
    required: true,
    label: 'Descrição',
    align: 'left',
    field: (row: EnvelopeRow) => row.descricao,
  },
  {
    name: 'criadoEm',
    required: true,
    label: 'Criado em',
    align: 'left',
    field: (row: EnvelopeRow)=> formatDate(row.criadoEm),
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field:(row: EnvelopeRow) => row.status,
    format: (val: string) => formatStatus(val),
  }
]

export default defineComponent({
  name: 'EnvelopesTable',
  props: {
    envelopes: {
      type: Array as () => Envelope[],
      required: true,
    },
  },
  setup: (props: Props) => {
    const rows = ref<EnvelopeRow[]>([]);
    const formatRows = () => {
      return props?.envelopes?.map((envelope) => ({
        id: envelope.id,
        descricao: envelope.descricao,
        criadoEm: envelope.dataHoraCriacao,
        status: envelope.status,
      }));
    }


     watchEffect(() => {
    if (Array.isArray(props?.envelopes as Envelope[])) {
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


