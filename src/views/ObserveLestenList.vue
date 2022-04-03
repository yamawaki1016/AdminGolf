<template>
  <div class="">
    <div class="header-info">
      <div class="flex-center">
        <div class="w-20">
          <BoxBotton text="戻る" @click-box-botton="clickBackBotton()" />
        </div>
        <div class="user-info w-60">
          <span id="user-name">
            {{ costomerInfo.firstName + costomerInfo.lastName }}
          </span>
          <span id="user-name-text"> さんのレッスン予約 </span>
        </div>
        <div class="w-20">
          <BoxBotton
            text="レッスン予約"
            @click-box-botton="clickReserveBotton()"
          />
        </div>
      </div>
    </div>
    <div class="search">
      <div class="search-conditions">
        <div class="search-conditions-content">
          <div class="search-conditions-title">日付</div>
          <div>
            <input type="text" maxlength="20" />
          </div>
        </div>
      </div>
    </div>
    <div class="lesten-content">
      <div v-if="isObserveLesten">レッスン予約が１件も登録されていません</div>
      <div v-else class="flex flex-column">
        <div class="w-100 flex-center mb-16 border-b">
          <div class="list-colum">日付</div>
          <div class="list-colum">時刻</div>
          <div class="list-colum">場所</div>
          <div class="list-colum">内容</div>
          <div class="list-colum">予約登録日</div>
          <div class="list-colum">実施状況</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BoxBotton from "@/components/base/BoxBotton.vue";
export default {
  name: "ObserveLestenList",
  data() {
    return {
      costomerInfo: this.$store.state.selectedCostomerInfo,
      lestenList: [],
      clearFlg: true,
    };
  },
  components: { BoxBotton },
  created() {},
  computed: {
    isObserveLesten() {
      return this.lestenList.length > 0 ? true : false;
    },
  },
  methods: {
    /**
     * レッスン予約画面に遷移
     */
    clickReserveBotton() {
      this.clearFlg = false;
      this.$router.push({
        name: "LestenRegistration",
        params: {
          fromPath: this.$route.fullPath,
        },
      });
    },
    /**
     * 顧客一覧画面に遷移
     */
    clickBackBotton() {
      this.$router.push("/costomerList");
    },
  },
  unmounted() {
    if (this.clearFlg) {
      // メモリ解放
      this.$store.commit("clearSelectedCostomerInfo");
    }
  },
};
</script>
<style scoped>
.user-info #user-name {
  font-size: 24px;
  font-weight: bold;
}
.header-info {
  margin: 24px;
}
.search {
  background-color: rgb(221, 221, 221);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.45);
  margin: 0 32px;
  padding: 16px;
  text-align: left;
  border-radius: 20px;
}
.search-conditions-content {
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
}
.search-conditions-title {
  width: 160px;
}
.lesten-content {
  font-size: 20px;
  margin: 32px;
}
.list-colum {
  width: 20%;
}
</style>
