<template>
  <div v-if="props.modelValue" class="modal-overlay">
    <div class="flex items-center justify-center absolute h-screen top-0 left-0"></div>
    <transition name="custom" enter-active-class="animate__animated animate__bounceInDown"
      leave-active-class="animate__animated animate__bounceOutUp">
      <!-- Modal -->
      <div v-if="props.modelValue"
        class="w-11/12 lg:w-full max-w-3xl z-20 mx-auto bg-white flex flex-col relative self-center shadow-2xl rounded-md ">

        <!-- Modal body -->
        <TextEditor></TextEditor>
        <!-- ./Modal body -->

        <!-- Modal footer -->
        <div class="p-6 flex justify-end">
          <button @click="emits('update:modelValue', false)"
            class="bg-green-400 hover:bg-green-500 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out">Close
            Modal</button>
        </div>
        <!-- ./Modal footer -->
      </div>
      <!-- ./Modal -->
    </transition>

    <transition name="custom" enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <!-- Overlay -->
      <div v-if="props.modelValue"
        class="bg-gray-700 bg-opacity-50 fixed bottom-0 left-0 w-full h-full transition duration-500 ease-in-out transfom z-10">
      </div>
      <!-- ./Overlay -->
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import TextEditor from '@/components/TextEditor.vue';
const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  overflow-y: auto;
  /* Enable vertical scrolling */
}
</style>