<template>
  <div class="relative mt-4">
    <Field
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue ? modelValue : value"
      :as="type"
      :rows="rows"
      :name="name"
      class="w-full rounded border-1 bg-transparent px-2.5 pr-6 py-1.5 placeholder-white outline-none lg:py-2"
      :rules="rules"
      @blur="focused = true"
      :id="id"
      :placeholder="placeholder"
      :class="{
        'border-niceGrey': !errors,
        'placeholder-lightGrey placeholder:italic': isQuote,
        'border-niceRed': errors,
        'border-green-500': !errors && focused,
      }"
    />
    <span class="absolute right-3 top-2 text-niceGrey" v-if="lang">
      {{ lang }}</span
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Field } from "vee-validate";
const focused = ref(false);

defineProps({
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
  type: {
    required: false,
    default: "input",
  },
  rows: {
    required: false,
  },
  isQuote: {
    required: false,
    default: "",
  },
  modelValue: {
    required: false,
  },
  value: {
    required: false,
  },
});

defineEmits(["update:modelValue"]);
</script>
