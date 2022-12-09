<template>
  <!--  Search Mobile  -->
  <aside
    v-if="pageStore.searchFeedOpen"
    class="absolute top-0 left-0 z-40 h-2/5 w-screen bg-searchBlue"
  >
    <nav class="ml-6 mt-6 flex items-center gap-6">
      <LeftArrowIcon class="scale-150" @click="pageStore.changeFeedSearch" />
      <div>
        <Form @submit="mobileFeedSubmit">
          <Field
            :placeholder="$t('search')"
            name="search"
            class="h-8 bg-transparent pl-2 focus:outline-none"
            v-model="searchValue"
          />
        </Form>
      </div>
    </nav>
    <div class="mt-3 w-full border-b-2 border-fadeGrey"></div>
    <div class="ml-16 mt-2 text-niceGrey">
      <p>Enter @ to search movies</p>
      <p class="mt-4">Enter # to search quotes</p>
    </div>
  </aside>
  <main>
    <!--        Posts        -->
    <div class="relative lg:ml-12 lg:pl-[15%]">
      <div class="items-center justify-center lg:flex">
        <RouterView class="z-20 lg:top-24" />
        <div class="flex gap-2 lg:w-[64rem]">
          <section
            class="relative flex flex-none gap-3 bg-footerBlue py-5 lg:mt-6 lg:-mb-2 lg:rounded-lg lg:bg-headerBlue lg:py-2"
            :class="{
              'lg:w-4/5': !searchMode,
              'pr-2 transition-width lg:w-3/12': searchMode,
            }"
          >
            <write-icon class="ml-9 w-5 lg:ml-3"></write-icon>
            <router-link :to="{ name: 'AddQuote' }">
              <p>{{ $t("writeNewQuote") }}</p>
            </router-link>
          </section>
          <section
            @click="searchMode = true"
            class="mt-7 ml-2 hidden cursor-pointer items-center gap-3 lg:flex"
            :class="{
              '': !searchMode,
              'duration-400  w-full transition-transform transition-all lg:bg-transparent':
                searchMode,
            }"
          >
            <search-icon></search-icon>
            <p class="text" v-if="!searchMode">{{ $t("searchBy") }}</p>
            <Form v-if="searchMode" class="flex-1" @submit="onSubmit">
              <Field
                v-model="searchValue"
                name="search"
                placeholder="Enter @ to search movies, Enter # to search quotes"
                class="w-full bg-transparent py-1 pl-2"
              />
            </Form>
          </section>
        </div>
      </div>
      <post-component
        v-for="(post, index) in quotesStore.quotes"
        v-bind:key="index"
        :quote-author="post.user_id"
        :quote="post.quote"
        :user="post.movie.user"
        :movie="post.movie.title"
        :index="index"
        :quoteId="post.id"
        :image="post.thumbnail"
        :comments="post.comments"
        :likes="post.likes"
      ></post-component>
    </div>
  </main>
</template>

<script setup>
import PostComponent from "@/components/news_feed/PostComponent.vue";
import { RouterView } from "vue-router";
import { useAllQuotesStore } from "@/stores/allQuotes.js";
import { usePageStore } from "@/stores/page.js";
import { onBeforeMount, ref, watchEffect, watch } from "vue";
import { Form, Field } from "vee-validate";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon.vue";

const searchMode = ref(false);
const quotesStore = useAllQuotesStore();
const pageStore = usePageStore();

const searchValue = ref("");

const hitBottom = ref(false);

function scroll() {
  window.onscroll = () => {
    let bottomOfWindow =
      Math.floor(
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) + window.innerHeight
      ) === Math.floor(document.documentElement.offsetHeight);
    if (bottomOfWindow) {
      hitBottom.value = true;
      console.log("hit");
    }
  };
}
scroll();

function mobileFeedSubmit() {
  pageStore.changeFeedSearch();
}

let timeOut = setTimeout(() => {
  console.log(searchValue.value);
}, 500);

watch(searchValue, () => {
  if (searchValue.value !== "") {
    if (timeOut) {
      clearTimeout(timeOut);
      timeOut = null;
    }
    timeOut = setTimeout(() => {
      quotesStore.searchedQuotes = [];
      quotesStore.searchQuotes({
        search: searchValue.value,
      });
      console.log(searchValue.value);
    }, 500);
    quotesStore.searchedQuotes = [];
  } else {
    setTimeout(() => {
      quotesStore.quotes = [];
      quotesStore.currentPage = 1;
      quotesStore.getQuotes();
    }, 500);
  }
});

watch(hitBottom, () => {
  if (hitBottom.value === true) {
    if (searchValue.value === "") {
      quotesStore.currentPage++;
      quotesStore.getQuotes(quotesStore.currentPage);
      hitBottom.value = false;
    } else {
      console.log(quotesStore.currentPage);
      quotesStore.currentPage++;
      quotesStore.searchQuotes({
        search: searchValue.value,
      });
      hitBottom.value = false;
      console.log(quotesStore.searchedQuotes);
    }
  }
});

function onSubmit(values) {
  quotesStore.searchQuotes(values);
}

window.Echo.channel("add-like").listen(".new-like", () => {
  quotesStore.getNumberQuotes();
});

window.Echo.channel("add-comment").listen(".new-comment", () => {
  quotesStore.getNumberQuotes();
});

const change = ref(null);

onBeforeMount(() => {
  quotesStore.getQuotes(1);
});
</script>
