import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/config/axios/index.js";

export const useNotificationsStore = defineStore("notifications", () => {
  const notifications = ref([]);
  const unread = ref(0);
  const newNotification = ref(false);
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
          newNotification.value = true;
          setTimeout(() => {
            newNotification.value = false;
          }, 4000);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  return { notifications, getNotifications, newNotification, unread };
});
