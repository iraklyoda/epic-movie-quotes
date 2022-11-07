<template>
  <div class="flex flex-col my-4 lg:gap-1">
    <label :for="name" class="text-white"
      >{{ label }}
      <span class="text-RustyRed">{{ required ? "*" : "" }}</span></label
    >
    <div class="relative">
      <slot></slot>
      <Field
        @input="$emit('update:modelValue', $event.target.value)"
        class="bg-lightGrey placeholder-niceGrey w-full px-2.5 py-1 rounded-md lg:py-2"
        :type="type"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :rules="rules"
      />
    </div>
    <ErrorMessage :name="name" class="text-red-300" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  visibility: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["update:modelValue"]);
</script>
