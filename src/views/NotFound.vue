<template>
  <main class="fixed h-screen w-screen bg-darkBlue">
    <img
      src="@/assets/images/errors/ghost.svg"
      alt="Page Not Found"
      class="mx-auto mt-64"
    />
    <img src="@/assets/images/errors/ghost_eclipse.svg" class="mx-auto mt-6" />
    <h1 class="mt-8 text-center text-3xl font-bold text-white">
      {{ $t("whoops") }}
    </h1>
    <p class="mt-4 text-center text-lg text-white">
      {{ $t("weCantSeePage") }}
    </p>
    <router-link
      :to="{ name: 'Landing' }"
      class="mx-auto mt-4 block w-40 rounded-md bg-niceRed py-2 text-center text-white"
      >{{ $t("returnHome") }}</router-link
    >
  </main>
</template>
