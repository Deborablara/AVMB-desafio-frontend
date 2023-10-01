<template>
  <q-dialog v-model="show">
    <q-card class="cardContainer">
      <q-card-section>
        <p color="primary" class="modalTitle">{{ currentStepTitle }}</p>
      </q-card-section>
      <q-card-section class="inputsContainer">
          <template v-if="currentStep === 'input'">
            <q-input
              v-model="form.descricao" 
              label="Descrição"
              :dense="dense" 
              :rules="[val => (val && val !== '') || 'Insira a descrição do envelope']"
            />
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
                  <q-btn
                   @click="handleSubmit($refs.files)"
                    :loading="loadingSubmit"
                    label="Salvar"
                    color="primary"
                  >
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
                  </q-btn>
            </div>
          </template>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script lang="ts">
import { ref, defineComponent } from 'vue';
import useNotify from 'src/composables/useNotify';
import { Envelope, FormEnvelopeData, Repositorio } from 'src/services/types';
import { novoEnvelope, uploadArquivo } from 'src/services/envelope';

const { notifySuccess, notifyError } = useNotify();


type formDefaultValues = {
    descricao: string;
    repositorioId: string;
    repositorioNome: string | undefined;
}



export default defineComponent({
  name: 'EnvelopeForm',
  props: {
    envelope: {
      type: Object as () => Envelope,
      required: true,
    },
    repositorio: {
      type: Object as () => Repositorio,
      required: true,
    },
    fetchEnvelopesData: {
      type:  Function as  () => void,
      required: true,
    }
  },
  setup(props, context) {
    const show = ref(false);
    const dense = ref(false);
    const currentStep = ref('input'); 
    const currentStepTitle = ref('Novo envelope');
    const dadosDocumento = ref({
      conteudo: '',
      mimeType: '',
      nomeArquivo: '',
    });
    const loadingSubmit = ref(false);


    const formDefaultValues: formDefaultValues = {
      descricao: '',
      repositorioId: props.repositorio.id,
      repositorioNome: props.repositorio.nome,
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
      if (form.value.descricao && form.value.descricao !== '') {
        currentStep.value = 'upload';
        currentStepTitle.value = 'Upload do documento';
      } else {
        notifyError('Por favor, preencha a descrição antes de avançar.');
      }
    };


    const  handleSubmit = async (filesInput: any) => {
      if (filesInput && filesInput.files.length > 0) {
        const dataForm = new FormData();

        for (const file of filesInput.files) {
          dataForm.append('file', file);
        }

        try {
          loadingSubmit.value = true;

          const res = await uploadArquivo(dataForm);
          dadosDocumento.value = res.data.fileInfo;

          if(res.data.fileInfo) {
            const formatedValues: FormEnvelopeData = {
                     Envelope: {
                       descricao: form.value.descricao,
                      Repositorio: {
                        id: form.value.repositorioId
                      },
                      listaDocumentos: {
                        Documento: [
                          {
                            conteudo: res.data.fileInfo.conteudo,
                            mimeType: res.data.fileInfo.mimeType,
                            nomeArquivo: res.data.fileInfo.nomeArquivo
                          }
                        ]
                      }
                     }
                    };
                    
            await novoEnvelope(formatedValues);
          }

          notifySuccess('Envelope criado com sucesso!');
          props.fetchEnvelopesData();
          close();
        } catch (error) {
          notifyError('Falha ao criar envelope, entre em contato com o suporte')
        } finally {
          loadingSubmit.value = false;
        }
      } else {
        notifyError('Selecione pelo menos um documento antes de salvar.');
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
      loadingSubmit
    };
  },
});
</script>

<style lang="scss">
@import './style.scss';
</style>
