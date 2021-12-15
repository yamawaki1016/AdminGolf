<template>
  <div class="adminTop">
    <div class="user-info">
      <div class="name">
        <div class="user-info-title">氏名</div>
        <div class="user-info-colum">受講者１</div>
      </div>
      <div class="name">
        <div class="user-info-title">年齢</div>
        <div class="user-info-colum">４０歳</div>
      </div>
      <div class="name">
        <div class="user-info-title">性別</div>
        <div class="user-info-colum">男性</div>
      </div>
      <div class="name">
        <div class="user-info-title">顧客ステータス</div>
        <div class="user-info-colum">メンバー/ビジター/一般</div>
      </div>
      <div class="name">
        <div class="user-info-title">最終レッスン日</div>
        <div class="user-info-colum">2022/01/01</div>
      </div>
      <div class="name">
        <div class="user-info-title">レッスン回数</div>
        <div class="user-info-colum">４回</div>
      </div>
      <div class="name">
        <div class="user-info-title">ユーザーメモ</div>
        <div class="user-info-colum">
          趣味：・・・・・・・
          <br />
          職業：・・・・・・・
        </div>
      </div>
      <div class="name">
        <div class="user-info-title">繋がり</div>
        <div class="user-info-colum">
          ユーザー１
          <br />
          ユーザー２
          <br />
          ユーザー３
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminTop",
  components: {},
  data() {
    return {};
  },
  methods: {
    gotoAdminDayReserve() {
      this.$router.push("DayReserve");
    },
  },
};
</script>
<style scoped>
.adminTop {
  margin: 50px 0;
}
.user-info {
  margin: 50px 50px;
  border-radius: 20px;
  padding: 64px;
  background-color: rgb(201, 201, 201);
  /* color: white; */
  font-weight: bold;
}
.user-info-colum {
  text-align: center;
}
</style>
