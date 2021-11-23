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
        <div class="bar-contents" @click="gotoUserInfo()">顧客情報新規登録</div>
        <div class="bar-contents">顧客一覧</div>
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
  computed: {},
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
}
.bar-block {
  margin-top: 16px;
}
.bar-contents-list {
  margin-left: 16px;
}
</style>