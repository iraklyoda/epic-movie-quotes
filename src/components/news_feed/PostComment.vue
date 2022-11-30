<template>
  <Form @submit="onSubmit">
    <Field
      name="body"
      :placeholder="$t('writeAComment')"
      class="block ml-3 pl-4 py-2 w-full bg-footerBlue rounded-md"
    />
  </Form>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import axiosInstance from "@/config/axios";
function onSubmit(values) {
  console.log(values);
  axiosInstance
    .post(
      import.meta.env.VITE_APP_ROOT_API + "/quotes/" + props.quoteId + "/comments",
      values,
    )
    .then(function (response) {
      console.log(response);
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
