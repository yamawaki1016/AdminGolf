<template>
  <div class="">
    <div class="register-content-list">
      <div class="register-content-title">・受講者</div>
      <div class="register-content-form">ユーザー選択フォーム</div>
    </div>
    <div class="register-content-list">
      <div class="register-content-title">・レッスン日</div>
      <div class="date-time-set register-content-form">
        <datetime
          class="custom-date-time-picker"
          format="MM/DD/YYYY"
          width="300px"
          v-model="reserveDate"
        ></datetime>
      </div>
    </div>
    <div class="register-content-list">
      <div class="register-content-title">・レッスン場所</div>
      <div class="register-content-form">
        <select name="spot">
          <template v-for="spot in getLestenSpotList" :key="spot.id">
            <option :value="spot.id">{{ spot.name }}</option>
          </template>
        </select>
      </div>
    </div>
    <div class="register-content-list">
      <div class="register-content-title">レッスン内容</div>
      <div class="register-content-form">
        <div>
          <TagList
            :tagList="lestenTagList"
            @click-tag="updateTagAvable($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import datetime from "vuejs-datetimepicker";
import TagList from "@/components/TagList";

const LESTEN_SPOT_LIST = [
  { id: 1, name: "福知山東ゴルフクラブ" },
  { id: 2, name: "西紀ゴルフクラブ" },
  { id: 3, name: "篠山ゴルフクラブ" },
  { id: 0, name: "その他" },
];
const LESTEN_TAG_LIST = [
  { name: "パター", id: 1, isAvable: false },
  { name: "アプローチ", id: 2, isAvable: false },
  { name: "ドライバー", id: 3, isAvable: false },
  { name: "ユーティリティ", id: 4, isAvable: false },
  { name: "サンドウェッジ", id: 5, isAvable: false },
  { name: "ゴルフ理論", id: 6, isAvable: false },
];

export default {
  name: "LestenRegistration",
  data() {
    return {
      reserveDate: null,
      lestenTagList: LESTEN_TAG_LIST,
    };
  },
  components: { datetime, TagList },
  created() {
    this.reserveDate = new Date();
  },
  computed: {
    convertDateFormat() {
      const momentDate = dayjs(this.reserveDate).format("YYYY-MM-DD HH:mm");
      return momentDate;
    },
    getLestenSpotList() {
      return LESTEN_SPOT_LIST;
    },
  },
  watch: {},
  methods: {
    /**
     * レッスンタグの有効無効を切り替える
     * @param {boolean} id 有効/無効
     */
    updateTagAvable(id) {
      this.lestenTagList.map((tag) => {
        if (tag.id == id) {
          tag.isAvable = !tag.isAvable;
        }
        return tag;
      });
    },
  },
};
</script>
<style scoped>
.register-content-list {
  display: table;
  width: 100%;
}
.register-content-title {
  width: 40%;
  display: table-cell;
  /* text-align: center; */
  vertical-align: middle;
}
.register-content-form {
  width: 60%;
  display: table-cell;
  /* text-align: center; */
  vertical-align: middle;
}
.date-time-set {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.custom-date-time-picker >>> .calender-div {
  position: static;
}
</style>
