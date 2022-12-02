<template>
  <Form v-slot="{ handleSubmit }">
    <Field
      as="textarea"
      rows="1"
      v-model="bodyInput"
      name="body"
      :placeholder="$t('writeAComment')"
      class="block ml-3 pl-4 py-2 w-full bg-footerBlue rounded-md"
      @keypress.enter.prevent="handleSubmit($event, onSubmit)"
    />
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import axiosInstance from "@/config/axios/index.js";

const bodyInput = ref("");

function onSubmit(values) {
  console.log(values);
  axiosInstance
    .post(
      import.meta.env.VITE_APP_ROOT_API +
        "/quotes/" +
        props.quoteId +
        "/comments",
      values
    )
    .then(function (response) {
      console.log(response);
      bodyInput.value = "";
    })
    .catch(function (error) {
      console.log(error);
    });
}

const props = defineProps({
  quoteId: {
    required: true,
  },
});
</script>
