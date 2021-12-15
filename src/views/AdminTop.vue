<template>
  <div class="admin-top">
    <div class="topTimer">{{ currentTime }}</div>
    <div class="debug">
      <div @click="degugSetCostomer()">デバッグ用顧客データ登録</div>
    </div>
    <div class="reservation mb-16">
      <SquareBlock
        class="mr-8"
        id="today"
        @click="gotoDayReserve()"
        :colorType="1"
      >
        <template v-slot:body> 本日の予約 </template>
      </SquareBlock>
      <SquareBlock class="ml-8" id="weekly" :colorType="1">
        <template v-slot:body> 今週の予約 </template>
      </SquareBlock>
    </div>
    <div class="flex mg-16">
      <div class="customer mb-16 mr-8">
        <SquareBlock
          class="mr-8 w-50"
          id="addCustomer"
          @click="gotoCostomerRegistration()"
        >
          <template v-slot:body> 顧客新規登録 </template>
        </SquareBlock>
        <SquareBlock
          class="ml-8 w-50"
          id="customerList"
          @click="gotoCostomerList()"
        >
          <template v-slot:body> 顧客一覧 </template>
        </SquareBlock>
      </div>
      <div class="lesten mb-16 ml-8">
        <SquareBlock class="mr-8 w-50" id="addLesten" :colorType="1">
          <template v-slot:body> レッスン新規登録 </template>
        </SquareBlock>
        <SquareBlock class="ml-8 w-50" id="lestenList" :colorType="1">
          <template v-slot:body> レッスン一覧 </template>
        </SquareBlock>
      </div>
    </div>
  </div>
</template>
<script>
import SquareBlock from "@/components/SquareBlock.vue";
import util from "@/mixin/util.js";
export default {
  name: "AdminTop",
  components: { SquareBlock },
  data() {
    return {
      currentTime: "",
    };
  },
  mixins: [util],
  created: function () {
    this.currentTime = this.formatDate(new Date());
  },
  mounted: function () {
    setInterval(this.getcurrentTime, 1000);
  },
  methods: {
    degugSetCostomer() {
      this.$store.dispatch("debugSetCostomer");
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
    getcurrentTime() {
      this.currentTime = this.formatDate(new Date());
    },
    /**
     * Date -> yyyy/mm/dd hh:mmに変換
     * @param {*} date
     */
    formatDate(value) {
      var year = this.zeroPadding(value.getFullYear(), 4);
      var month = this.zeroPadding(value.getMonth(), 2);
      var day = this.zeroPadding(value.getDate(), 2);
      let week = value.getDay();
      return (
        year +
        "/" +
        month +
        "/" +
        day +
        " (" +
        this.changeDayNumToWeek(week) +
        ")"
      );
    },
  },
};
</script>
<style scoped>
.admin-top {
  height: 100%;
  margin: 32px 32px 32px 32px;
}
.topTimer {
  font-size: 32px;
}
.reservation {
  display: flex;
  margin: 16px;
}
.reservation #today {
  width: 50%;
}
.reservation #weekly {
  width: 50%;
}
.customer {
  width: 50%;
  display: flex;
}
.lesten {
  width: 50%;
  display: flex;
}
</style>
