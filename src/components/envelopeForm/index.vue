<template>
  <q-dialog v-model="show">
    <q-card class="cardContainer">
      <q-card-section>
        <p color="primary" class="modalTitle">{{ currentStepTitle }}</p>
      </q-card-section>
      <q-card-section class="inputsContainer">
          <template v-if="currentStep === 'input'">
            <q-input v-model="form.descricao" label="Descrição" :dense="dense" />
            <q-input
             v-model="form.repositorioNome"
              label="Repositório destino"
               :dense="dense" 
               class="input"
               disable
                />
              <div class="buttonsContainer input">
                <q-btn color="primary" outline label="Cancelar" class="cancelarButton" @click="close"/> 
                <q-btn color="primary" label="Avançar" @click="advanceToUpload" />
              </div>
          </template>
          <template v-else-if="currentStep === 'upload'">
            <input type="file" name="file" multiple ref="files" />
            <div class="buttonsContainer input">
              <q-btn color="primary" outline label="Cancelar" class="cancelarButton" @click="close"/> 
              <q-btn color="primary" label="Salvar" @click="handleSubmit($refs.files)" />
            </div>
          </template>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script lang="ts">
import { ref, defineComponent, inject } from 'vue';
import useNotify from 'src/composables/useNotify';
import { Envelope } from 'src/services/types';
import { uploadArquivo } from 'src/services/envelope';

const { notifySuccess, notifyError } = useNotify();
    const repositorio = inject('repositorio');

    console.log(repositorio);


export default defineComponent({
  name: 'EnvelopeForm',
  props: {
    envelope: {
      type: Object as () => Envelope,
      required: true,
    },
    repositorio: {
      type: Object as () => any,
      required: true,
    }
  },
  setup(props, context) {
    const show = ref(false);
    const dense = ref(false);
    const currentStep = ref('input'); 
    const currentStepTitle = ref('Novo envelope');

    const formDefaultValues = {
      descricao: '',
      repositorioId: props.repositorio.id,
      repositorioNome: props.repositorio.nome,
      file: null,
    };
    const form = ref(formDefaultValues);

  

    const resetForm = () => {
      currentStep.value = 'input';
      currentStepTitle.value = 'Novo envelope';
      form.value = formDefaultValues;
    };

    const open = () => {
      show.value = true;
    };

    const close = () => {
      resetForm();
      show.value = false;
    };

    const advanceToUpload = () => {
      currentStep.value = 'upload';
      currentStepTitle.value = 'Upload do documento';
    };

    const  handleSubmit = async (filesInput: any) => {
      const dataForm = new FormData();
      for (const file of filesInput.files) {
        dataForm.append('file', file);
      }

      try {
        const  res = await uploadArquivo(dataForm);
        notifySuccess(`${res.data}`);
      } catch (error){
        console.log(error);
      }



    };

    context.expose({ open, close });

    return {
      show,
      dense,
      currentStep,
      currentStepTitle,
      form,
      open,
      close,
      advanceToUpload,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss">
@import './style.scss';
</style>
