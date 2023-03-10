<template>
  <div
    class="flex items-center gap-4 rounded-md border-[1px] border-borderGrey px-4 py-4 lg:gap-6"
  >
    <div>
      <img
        :src="profilePicture"
        alt="profile picture"
        class="h-10 w-10 rounded-full object-cover object-center lg:h-14 lg:w-14"
      />
    </div>
    <div class="flex w-full justify-between">
      <div>
        <p class="text-lg">{{ notification.sender.username }}</p>
        <div
          v-if="notification.type === 'comment'"
          class="flex items-center gap-3"
        >
          <ChatIcon class="w-5" />
          <p class="text-xs text-lightGrey lg:text-sm">
            {{ $t("commentedOnYourQuote") }}
          </p>
        </div>
        <div v-else class="flex items-center gap-3">
          <HeartIcon class="w-5" />
          <p class="text-xs text-lightGrey lg:text-sm">
            {{ $t("likedYourQuote") }}
          </p>
        </div>
      </div>
      <div>
        <p class="text-sm text-lightGrey">
          {{ timeAgo(notification.created_at) }}
        </p>
        <p v-if="notification.read === 0" class="text-center text-validGreen">
          {{ $t("new") }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import HeartIcon from "@/components/icons/HeartIcon.vue";
import i18n from "@/config/i18n";
import { computed, ref } from "vue";
const root = ref(import.meta.env.VITE_APP_ROOT);

function timeAgo(time) {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  let time_formats = [];
  if (i18n.global.locale.value === "en") {
    time_formats = [
      [60, "seconds", 1], // 60
      [120, "1 minute ago", "1 minute from now"], // 60*2
      [3600, "minutes", 60], // 60*60, 60
      [7200, "1 hour ago", "1 hour from now"], // 60*60*2
      [86400, "hours", 3600], // 60*60*24, 60*60
      [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
      [604800, "days", 86400], // 60*60*24*7, 60*60*24
      [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
      [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
      [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
      [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    ];
  } else {
    time_formats = [
      [60, "???????????????", 1], // 60
      [120, "1 ??????????????? ?????????", "1 minute from now"], // 60*2
      [3600, "???????????????", 60], // 60*60, 60
      [7200, "1 ?????????????????? ?????????", "1 hour from now"], // 60*60*2
      [86400, "??????????????????", 3600], // 60*60*24, 60*60
      [172800, "???????????????", "Tomorrow"], // 60*60*24*2
      [604800, "????????????", 86400], // 60*60*24*7, 60*60*24
      [1209600, "???????????? ??????????????????", "Next week"], // 60*60*24*7*4*2
      [2419200, "?????????????????????", 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, "???????????? ????????????", "Next month"], // 60*60*24*7*4*2
      [29030400, "????????????", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, "??????????????????", "Next year"], // 60*60*24*7*4*12*2
      [2903040000, "????????????", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    ];
  }
  let seconds = (+new Date() - time) / 1000,
    token = i18n.global.locale.value === "en" ? "ago" : "?????????",
    list_choice = 1;

  if (seconds == 0) {
    return "Just now";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "from now";
    list_choice = 2;
  }
  let i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return time;
}

let aDay = 24 * 60 * 60 * 1000;

const props = defineProps({
  notification: {
    required: true,
  },
});

const profilePicture = computed(() => {
  if (props.notification.sender.profile_picture.includes("https")) {
    return props.notification.sender.profile_picture;
  } else {
    return root.value + props.notification.sender.profile_picture;
  }
});
</script>
