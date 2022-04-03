<template>
  <div class="">
    <div class="header-info">
      <div class="flex-center">
        <div class="w-20"><BoxBotton text="戻る" /></div>
        <div class="user-info w-60">
          <span id="user-name">
            {{ costomerInfo.firstName + costomerInfo.lastName }}
          </span>
          <span id="user-name-text"> さんのレッスン予約 </span>
        </div>
        <div class="w-20">
          <BoxBotton
            text="予約"
            @click-box-botton="modalLestenRegistrationFlg = true"
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
    <Modal v-if="modalLestenRegistrationFlg">
      <template v-slot:header>
        <div class="bold mb-16 border-b">レッスン登録</div>
      </template>
      <template v-slot:body>
        <div></div>
      </template>
      <template v-slot:footer>
        <div class="table mg-auto mt-32">
          <SquareBotton
            class="mr-8"
            title="キャンセル"
            @click-btn="modalLestenRegistrationFlg = false"
          />
          <SquareBotton
            class="ml-8"
            title="登録"
            @click-btn="modalLestenRegistrationFlg = false"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import BoxBotton from "@/components/base/BoxBotton.vue";
import SquareBotton from "@/components/SquareBotton.vue";
import Modal from "@/components/Modal.vue";
export default {
  name: "ObserveLestenList",
  data() {
    return {
      costomerInfo: null,
      lestenList: [],
      modalLestenRegistrationFlg: false,
    };
  },
  components: { BoxBotton, Modal, SquareBotton },
  created() {
    const info = this.$store.state.selectedCostomerInfo;
    this.costomerInfo = info;
    console.log(this.isObserveLesten);

    // TODO: 予約一覧をメモリに退避
  },
  computed: {
    isObserveLesten() {
      return this.lestenList.length > 0 ? true : false;
    },
  },
  methods: {},
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
