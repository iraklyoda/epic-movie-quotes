<template>
  <Form v-slot="{ handleSubmit }">
    <Field
      as="textarea"
      rows="1"
      v-model="bodyInput"
      name="body"
      :placeholder="$t('writeAComment')"
      class="ml-3 block w-full rounded-md bg-footerBlue py-2 pl-4 focus:outline-none"
      @keypress.enter.prevent="handleSubmit($event, onSubmit)"
    />
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import axiosInstance from "@/config/axios/index.js";
import { useProfileStore } from "@/stores/profile.js";


const bodyInput = ref("");

function onSubmit(values) {
  const postComment = async () => {
    try {
      const response = await axiosInstance.post(
        import.meta.env.VITE_APP_ROOT_API +
          "/quotes/" +
          props.quoteId +
          "/comments",
        values
      );
      bodyInput.value = "";
    } catch (e) {
      console.log(e);
    }
  };
  postComment();
}

const props = defineProps({
  quoteId: {
    required: true,
  },
  quoteAuthor: {
    required: true,
  },
});
</script>
