<template>
  <div>
    <div @click="gotoAdminDayReserve()">当日の予約</div>
    <div @click="gotoAdmin()">ユーザー情報</div>
  </div>
</template>
<script>
export default {
  name: "Top",
  components: {},
  data() {
    return {};
  },
  methods: {
    gotoAdmin() {
      this.$router.push("UserInfo");
    },
    gotoAdminDayReserve() {
      this.$router.push("DayReserve");
    },
  },
};
</script>
