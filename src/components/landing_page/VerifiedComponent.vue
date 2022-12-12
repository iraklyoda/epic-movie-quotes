<template>
  <dialog-component>
    <div class="h-0.5"></div>
    <div
      class="mx-auto mt-20 h-96 w-5/6 rounded-xl bg-blueGradient py-4 lg:h-auto lg:bg-none lg:pb-12"
    >
      <email-sent class="mx-auto mt-20 lg:mt-0"></email-sent>
      <div class="text-center">
        <h2 class="mt-4 text-2xl font-medium text-white lg:mt-12 lg:text-3xl">
          {{ $t("thankYou") }}!
        </h2>
        <p class="mx-auto mt-5 w-5/6 text-white">
          {{ $t("accountActivated") }}
        </p>
      </div>
      <router-link :to="{name: 'Login'}"
        class="mx-auto mt-6 block w-48 text-center rounded-md bg-niceRed py-1.5 text-white lg:p-2"
      >
        {{ $t("logIn") }}
      </router-link>
    </div>
  </dialog-component>
</template>