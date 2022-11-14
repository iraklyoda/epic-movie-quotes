<template>
  <div class="flex flex-col my-4 lg:gap-1">
    <label :for="name" class="text-white"
      >{{ label }}
      <span class="text-RustyRed">{{ required ? "*" : "" }}</span></label
    >
    <div class="relative">
      <slot></slot>
      <Field v-slot="{ field, meta }" :name="name" :rules="rules">
        <div>
          <input
            v-bind="field"
            @input="$emit('update:modelValue', $event.target.value)"
            class="bg-lightGrey placeholder-niceGrey w-full px-2.5 py-1 rounded-md lg:py-2 focus:outline-none focus:ring-4 focus:ring-lightGrey focus:ring-opacity-30"
            :class="{
              'ring-1 ring-niceRed': !meta.valid && meta.touched,
              'ring-2 ring-validGreen': meta.valid && meta.touched,
            }"
            :type="type"
            :id="name"
            :placeholder="placeholder"
          />
          <invalid-icon
            v-if="!meta.valid && meta.touched"
            class="absolute top-1 right-2 lg:top-2.5"
            :class="{ 'right-7': isPassword }"
          ></invalid-icon>
          <valid-icon
            v-if="meta.valid && meta.touched"
            class="absolute top-2 right-2 lg:top-3"
            :class="{ 'right-7': isPassword }"
          ></valid-icon>
        </div>
      </Field>
    </div>
    <ErrorMessage :name="name" class="text-red-300 text-xs mt-1 lg:text-base" />
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from "vee-validate";
import { toRef, computed } from "vue";

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

const isPassword = computed(() => {
  if (props.name === "password" || props.name === "confirmation") {
    return true;
  } else {
    return false;
  }
});

const name = toRef(props, "name");

defineEmits(["update:modelValue"]);
</script>
