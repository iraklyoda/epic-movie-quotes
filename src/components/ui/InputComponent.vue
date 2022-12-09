<template>
  <div class="my-4 flex flex-col lg:gap-1">
    <label :for="name" class="text-white"
      >{{ label }}
      <span class="text-RustyRed">{{ required ? "*" : "" }}</span></label
    >
    <div class="relative">
      <slot></slot>
      <Field
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue ? modelValue : value"
        :name="name"
        :rules="rules"
        class="w-full rounded-md bg-lightGrey px-2.5 py-1 placeholder-niceGrey focus:outline-none focus:ring-4 focus:ring-lightGrey focus:ring-opacity-30 lg:py-2"
        :class="{
          'ring-1 ring-niceRed': errors,
          'ring-2 ring-validGreen': !errors && focused,
        }"
        :type="type"
        :id="name"
        :placeholder="placeholder"
        @blur="focused = true"
      />
      <div>
        <invalid-icon
          v-if="errors"
          class="absolute top-1 right-2 lg:top-2.5"
          :class="{ 'right-7': isPassword }"
        ></invalid-icon>
        <valid-icon
          v-if="!errors && focused"
          class="absolute top-2 right-2 lg:top-3"
          :class="{ 'right-7': isPassword }"
        ></valid-icon>
      </div>
    </div>
    <ErrorMessage :name="name" class="mt-1 text-xs text-red-300 lg:text-base" />
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from "vee-validate";
import { toRef, computed, ref } from "vue";
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
const focused = ref(false);

const props = defineProps({
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
  value: {
    type: String,
    default: "",
  },
  errors: {
    required: false,
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
  modelValue: {
    required: false,
  },
});

const isPassword = computed(() => {
  if (props.name === "password" || props.name === "confirmation") {
    return true;
  } else {
    return false;
  }
});

const name = toRef(props, "name");
</script>
