<template>
  <main class="fixed h-screen w-screen bg-darkBlue">
    <div>
      <img
        src="@/assets/images/errors/gandalf_background.svg"
        alt="Page Not Found"
        class="mx-auto mt-64"
      />
      <img src="@/assets/images/errors/gandalf.svg" class="mx-auto -mt-56" />
    </div>
    <h1 class="mt-8 text-center text-3xl font-bold text-white">
      {{ $t("youShallNotPass") }}
    </h1>
    <p class="mt-4 text-center text-lg text-white">
      {{ $t("sorryCantAccess") }}
    </p>
    <router-link
      :to="{ name: 'Landing' }"
      class="mx-auto mt-4 block w-40 rounded-md bg-niceRed py-2 text-center text-white"
      >{{ $t("returnHome") }}</router-link
    >
  </main>
</template>
