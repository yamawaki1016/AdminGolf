<template>
  <div class="side-bar-contents">
    <div class="bold">管理者メニュー</div>
    <div class="bar-contents" @click="gotoTop()">トップ画面</div>
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
        <div class="bar-contents" @click="gotoLestenRegistration()">
          レッスン新規作成
        </div>
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
          break;
        case "/dayReserve":
          break;
        case "/userInfo":
          break;
        case "/costomerRegistration":
          break;
        case "/costomerList":
          break;
        default:
      }
    },
  },
  methods: {
    gotoTop() {
      this.clearStoreData();
      this.$router.push("/");
    },
    gotoDayReserve() {
      this.clearStoreData();
      this.$router.push("/dayReserve");
    },
    gotoUserInfo() {
      this.clearStoreData();
      this.$router.push("/userInfo");
    },
    gotoCostomerRegistration() {
      this.clearStoreData();
      this.$router.push("/costomerRegistration");
    },
    gotoCostomerList() {
      this.clearStoreData();
      this.$router.push("/costomerList");
    },
    gotoLestenRegistration() {
      this.clearStoreData();
      this.$router.push("/lestenRegistration");
    },
    clearStoreData() {
      console.log("clar");
      this.$store.commit("clearSelectedCostomerInfo");
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
.bar-contents:hover {
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}
</style>
