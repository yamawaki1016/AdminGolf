<template>
  <div class="costomer-list">
    <div class="costomer-list-title">顧客一覧画面</div>
    <div class="costomer-content">
      <div v-if="noCostomerListFlg">顧客が１件も登録されていません</div>
      <div v-else class="flex flex-column">
        <div class="w-100 flex-center mb-16 border-b">
          <div class="list-colum">顧客ID</div>
          <div class="list-colum">氏名（姓）</div>
          <div class="list-colum">氏名（名）</div>
          <div class="list-colum">性別</div>
          <div class="list-colum">顧客ステータス</div>
        </div>
        <div
          class="w-100 flex-center costomer-info"
          v-for="costomerInfo in costomerList"
          :key="costomerInfo.userId"
        >
          <div class="list-colum costomer-info-colum">
            {{ costomerInfo.userId }}
          </div>
          <div class="list-colum costomer-info-colum">
            {{ costomerInfo.firstName }}
          </div>
          <div class="list-colum costomer-info-colum">
            {{ costomerInfo.lastName }}
          </div>
          <div class="list-colum costomer-info-colum">
            {{ costomerInfo.gender }}
          </div>
          <div class="list-colum costomer-info-colum">
            {{ costomerInfo.status }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CostomerList",
  data() {
    return {
      noCostomerListFlg: true,
      costomerList: [],
    };
  },
  created() {
    const getCostomerListSuccess = (costomerList) => {
      this.costomerList = costomerList;
      this.noCostomerListFlg = false;
    };
    const getCostomerListError = () => {
      this.noCostomerListFlg = true;
    };
    /**
     * 最新の顧客リストを取得
     */
    this.$store.dispatch("getCostomerList", {
      success: getCostomerListSuccess,
      error: getCostomerListError,
    });
  },
  computed: {},
  methods: {},
};
</script>
<style scoped>
.costomer-list {
  margin: 32px 64px;
}
.costomer-list-title {
  font-size: 32px;
}
.costomer-content {
  font-size: 20px;
  margin: 32px;
}
.list-colum {
  width: 20%;
}
.costomer-info {
  transition: all 0.3s ease 0s;
}
.costomer-info:hover {
  font-weight: bold;
}
.costomer-info-colum {
  padding: 8px 0;
}
</style>
