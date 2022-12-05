import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/config/axios/index.js";

export const useNotificationsStore = defineStore("notifications", () => {
  const notifications = ref([]);
  const unread = ref(0);
  const getNotifications = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/notifications"
      );
      unread.value = 0;
      notifications.value = response.data;
      notifications.value.forEach((notification) => {
        if(notification.read === 0) {
          unread.value++;
        }
        console.log(unread.value);
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return { notifications, getNotifications, unread };
});
