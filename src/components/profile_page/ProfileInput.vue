<template>
  <div class="relative mt-4">
    <label :for="name">{{ label }}</label>
    <Field
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue ? modelValue : value"
      :type="type"
      :name="name"
      class="text-lg lg:mt-2 lg:w-full lg:rounded-md lg:bg-lightGrey lg:py-2 lg:pl-4 lg:text-black"
      :rules="rules"
      @blur="focused = true"
      :id="id"
      :placeholder="placeholder"
    />
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
    default: "",
  },
  label: {
    required: false,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>
