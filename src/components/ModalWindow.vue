<template>
  <div v-if="modal.showModal" class="modal-overlay flex justify-end border border-slate- dark:border-surat-300">
    <!-- Modal -->
      <div v-show="modal.showModal"
        class="h-full container z-20 bg-white dark:bg-surat-300 flex flex-col relative shadow-2xl dark:shadow-sm">
        <!-- Modal body -->
        <component v-model="noteContent" :is="modal.isDarkTheme ? TextEditorDark : TextEditorLight" />
        <!-- ./Modal body -->

        <!-- Modal footer -->
        <div class="p-3 flex justify-end bg-white dark:bg-surat-300">
          <button @click="closeModal"
            class="bg-blue-400 hover:bg-blue-500 dark:bg-surat-500 dark:hover:bg-surat-900 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out mr-2">Close
          </button>
          <button @click="deleteNote" v-if="modal.isForEdit"
            class="bg-red-400 hover:bg-red-500 dark:bg-surat-500 dark:hover:bg-surat-900 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out mr-2">
            Delete Note</button>
          <button @click="addNote" v-if="!modal.isForEdit"
            class="bg-green-400 hover:bg-green-500 dark:bg-surat-500 dark:hover:bg-surat-900 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out mr-2">
            Add Note</button>
          <button @click="downloadToPdf" v-if="modal.isForEdit" :class="{
          'bg-green-400 hover:bg-green-500 dark:bg-surat-500 dark:hover:bg-surat-900 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out mr-2': !loading && !errorFlag,
          'cursor-not-allowed bg-green-400 dark:bg-surat-500 px-4 py-2 rounded-md text-white mr-2': loading,
          'cursor-not-allowed bg-red-400  px-4 py-2 rounded-md text-white mr-2': errorFlag
           }" :disabled="loading">
            <span v-if="!loading && !errorFlag">Download to PDF</span>
            <span v-else-if="loading">
              Downloading...
            </span>
            <span v-else>
              Error
            </span>
          </button>
          <button @click="editNote" v-if="modal.isForEdit"
            class="bg-green-400 hover:bg-green-500 dark:bg-surat-500 dark:hover:bg-surat-900 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out mr-2">
            Save Note</button>
        </div>
        <!-- ./Modal footer -->
      </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive} from 'vue';
import TextEditorLight from '@/components/TextEditorLight.vue';
import TextEditorDark from '@/components/TextEditorDark.vue';
import type { Note } from '../types/note';
import type { Modal } from '../types/modalType';
import type { ConvertToPdfRequest, ConvertToPdfResponse } from '../types/convertToPdfType';
import { convertHtmlToPdf } from '@/services/convertHtmlToPdf'
import { v4 as uuidv4 } from 'uuid';

const { modal } = defineProps<{ modal: Modal }>();
const modalVal = reactive<Modal>(modal);
const noteContent = ref<string>(modal.note.content);
const loading = ref(false);
const errorFlag = ref(false);


const emit = defineEmits(['closeModal', 'handleNote']);
const addNote = () => {
  const newNote: Note = {
    id: generateUniqueId(),
    date: new Date(),
    name: '',
    content: noteContent.value as string,
  };

  emit('handleNote', newNote, 'add');
  closeModal();
}

const editNote = () => {
  modalVal.note.date = new Date();
  modalVal.note.content = noteContent.value;
  emit('handleNote', modalVal.note, 'edit');
  closeModal();
}

const deleteNote = () => {
  emit('handleNote', modalVal.note, 'delete');
  closeModal();
}

const closeModal = () => {
  modalVal.showModal = false;
  emit('closeModal', modalVal);
  noteContent.value = '';
};

const downloadToPdf = async () => {
  loading.value = true; 

  const convertToPdfRequest: ConvertToPdfRequest = {
    htmlContent: noteContent.value,
    fileName: `${generateUniqueId()}.pdf`
  };

  try {
    const response: ConvertToPdfResponse = await convertHtmlToPdf(convertToPdfRequest);

    if (!response.error.isError) {
      const pdfUrl = URL.createObjectURL(response.file);

      const downloadLink = document.createElement('a');
      downloadLink.href = pdfUrl;
      downloadLink.download = convertToPdfRequest.fileName;

      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(pdfUrl);
    } else {
      errorFlag.value = true;
      console.error('Error converting HTML to PDF:', response.error.errorMessage);
    }
  } catch (error) {
    errorFlag.value = true;
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};

function generateUniqueId() {
  return uuidv4();
}


</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 830px;
  z-index: 99;
}

.container {
  width: 830px;
}
</style>