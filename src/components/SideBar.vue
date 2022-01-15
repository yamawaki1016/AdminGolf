<template>
  <div class="side-bar-contents">
    <div class="bold">管理者メニュー</div>
    <div @click="gotoTop()">トップ画面</div>
    <div class="bar-block">
      <div class="bar-title">予約</div>
      <div class="bar-contents-list">
        <div class="bar-contents" @click="gotoDayReserve()">
          当日のレッスン予約
        </div>
        <div class="bar-contents">今週のレッスン予約</div>
      </div>
    </div>
    <div class="bar-block">
      <div class="bar-title">顧客</div>
      <div class="bar-contents-list">
        <div class="bar-contents" @click="gotoCostomerRegistration()">
          顧客情報新規登録
        </div>
        <div class="bar-contents" @click="gotoCostomerList()">顧客一覧</div>
      </div>
    </div>
    <div class="bar-block">
      <div class="bar-title">レッスン</div>
      <div class="bar-contents-list">
        <div class="bar-contents">レッスン新規作成</div>
        <div class="bar-contents">レッスン一覧</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  components: {},
  created() {},
  computed: {},
  watch: {
    $route: function () {
      // 画面によって選択モードを切り替え
      switch (this.$route.path) {
        case "/":
          console.log("Top画面");
          break;
        case "/dayReserve":
          console.log("当日予約画面");
          break;
        case "/userInfo":
          console.log("ユーザー画面");
          break;
        case "/costomerRegistration":
          console.log("顧客登録画面");
          break;
        case "/costomerList":
          console.log("顧客一覧画面");
          break;
        default:
          console.log("その他");
      }
    },
  },
  methods: {
    gotoTop() {
      this.$router.push("/");
    },
    gotoDayReserve() {
      this.$router.push("/dayReserve");
    },
    gotoUserInfo() {
      this.$router.push("/userInfo");
    },
    gotoCostomerRegistration() {
      this.$router.push("/costomerRegistration");
    },
    gotoCostomerList() {
      this.$router.push("/costomerList");
    },
  },
};
</script>
<style scoped>
.side-bar-contents {
  position: fixed;
  background-color: rgb(202, 202, 202);
  text-align: left;
  padding-top: 24px;
  padding-left: 24px;
  box-shadow: 0px 4px 5px 0 rgb(0 0 0 / 30%);
}
.bar-block {
  margin-top: 16px;
}
.bar-contents-list {
  margin-left: 16px;
}
</style>
