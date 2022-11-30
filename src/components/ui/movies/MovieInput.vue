<template>
  <div class="relative">
    <Field
      :name="name"
      class="bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"
      rules="required|min:5"
      @blur="focused = true"
      :id="id"
      :placeholder="placeholder"
      :class="{
        'border-niceRed': errors,
        'border-green-500': !errors && focused,
      }"
    />
    <span class="text-niceGrey absolute right-3 top-2" v-if="lang">
      {{
      lang
    }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Field } from "vee-validate";
const focused = ref(false);

const props = defineProps({
  name: {
    required: true,
  },
  lang: {
    required: false,
  },
  placeholder: {
    required: false,
  },
  id: {
    required: true,
  },
  rules: {
    required: false,
  },
  errors: {
    required: false,
  },
  currentValue: {
    required: false,
  },
});
</script>
