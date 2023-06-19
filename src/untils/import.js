import { defineAsyncComponent } from "vue";

export function registerGlobalComponents(app) {
  app.component(
    "auth-layout",
    defineAsyncComponent(() => import("@/layout/AuthLayout.vue"))
  );

  app.component(
    "default-layout",
    defineAsyncComponent(() => import("@/layout/DefaultLayout.vue"))
  );
}

export function formatCurrency(n) {
  if (n === 0) {
    return `0${""}`;
  }
  if (!n) {
    return "";
  }
  const c = Math.round(n)
    .toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return c;
}

export function getNewdate() {
  let d = new Date();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let dayofweek = d.getDay();

  const checkDay = (day) => {
    const dayName = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return dayName[day];
  };

  const checkMonth = (month) => {
    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthName[month];
  };

  return checkDay(dayofweek) + " " + day + " " + checkMonth(month);
}
