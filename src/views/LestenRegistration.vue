<template>
  <div class="lesten-registration">
    <div class="lesten-registration-title">レッスン登録画面</div>
    <div class="lesten-registration-contents">
      <table class="form-table">
        <tbody>
          <!-- 受講者 -->
          <tr>
            <th class="middle">受講者</th>
            <td class="middle">
              <span
                v-if="!isSelectedCostomer"
                class="select-botton"
                @click="openSelectCostomerModal()"
                >選択
              </span>
              <span class="ml-8">
                {{ showSelectCostomer }}
              </span>
            </td>
          </tr>
          <!-- 日時 -->
          <tr>
            <th class="middle">日時</th>
            <td class="middle date-time-form">
              <datetime
                format="YYYY/MM/DD"
                width="300px"
                @input="selectDateTime.date = $event"
              ></datetime>
              <div>
                <TheSelectBox
                  :selectBoxList="getSelectHourMinuteList.HOUR"
                  :boxWidth="'100px'"
                  @change-select-value="selectDateTime.hour = $event.name"
                />
                <TheSelectBox
                  :selectBoxList="getSelectHourMinuteList.MINUTE"
                  :boxWidth="'100px'"
                  @change-select-value="selectDateTime.minute = $event.name"
                />
              </div>
            </td>
          </tr>
          <!-- レッスン場所 -->
          <tr>
            <th class="middle">レッスン場所</th>
            <td class="middle">
              <TheSelectBox
                :selectBoxList="getLestenSpotList"
                :boxWidth="'300px'"
                @change-select-value="selectLestenInfo.spot = $event"
              />
            </td>
          </tr>
          <!-- レッスン内容 -->
          <tr>
            <th class="middle">レッスン内容</th>
            <td class="middle">
              <TagList
                :tagList="lestenTagList"
                @click-tag="updateTagAvable($event)"
              />
            </td>
          </tr>
          <!-- 補足情報 -->
          <tr>
            <th class="middle">補足情報</th>
            <td class="middle">
              <textarea
                name="content"
                cols="30"
                rows="10"
                placeholder="追記で記載があれば入力"
                v-model="selectLestenInfo.otherInfo"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="lesten-registration-footer flex-center">
      <div class="footer-botton">
        <BoxBotton text="戻る" @click-box-botton="clickBackBotton()" />
      </div>
      <div class="footer-botton">
        <BoxBotton text="予約" @click-box-botton="reserveLesten()" />
      </div>
    </div>
    <!-- 受講者選択ポップアップ -->
    <Modal v-if="modal.selectCostomer">
      <template v-slot:header>
        <div class="bold mb-16 border-b">受講者選択</div>
      </template>
      <template v-slot:body>
        <div class="flex-left wrap">
          <template v-for="costomer in costomerList" :key="costomer.userId">
            <span class="costomer-card" @click="setCostomerName(costomer)">
              {{ costomer.firstName + costomer.lastName }}
            </span>
          </template>
        </div>
      </template>
      <template v-slot:footer>
        <div class="mt-16 border-t" />
        <div @click="closeSelectCostomerModal()">閉じる</div>
      </template>
    </Modal>
  </div>
</template>
<script>
import dayjs from "dayjs";
import datetime from "vuejs-datetimepicker";
import deepcopy from "deepcopy";
import TagList from "@/components/TagList";
import Modal from "@/components/Modal.vue";
import TheSelectBox from "@/components/base/TheSelectBox";
import BoxBotton from "@/components/base/BoxBotton";

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
const SELECT_HOUR_MINUTE_LIST = {
  HOUR: [
    { id: 0, name: "0" },
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
    { id: 6, name: "6" },
    { id: 7, name: "7" },
    { id: 8, name: "8" },
    { id: 9, name: "9" },
    { id: 10, name: "10" },
    { id: 11, name: "11" },
    { id: 12, name: "12" },
    { id: 13, name: "13" },
    { id: 14, name: "14" },
    { id: 15, name: "15" },
    { id: 16, name: "16" },
    { id: 17, name: "17" },
    { id: 18, name: "18" },
    { id: 19, name: "19" },
    { id: 20, name: "20" },
    { id: 21, name: "21" },
    { id: 22, name: "22" },
    { id: 23, name: "23" },
  ],
  MINUTE: [
    { id: 0, name: "00" },
    { id: 1, name: "15" },
    { id: 2, name: "30" },
    { id: 3, name: "45" },
  ],
};
const DEFAULT_LESTEN_INFO = {
  costomer: {
    userId: null,
    fullName: null,
  },
  reserveDate: null,
  spot: null,
  lestenTags: [],
  otherInfo: "",
};

export default {
  name: "LestenRegistration",
  data() {
    return {
      lestenTagList: LESTEN_TAG_LIST,
      selectCostomer: null,
      selectDateTime: {
        date: null,
        hour: null,
        minute: null,
      },
      costomerList: [],
      selectLestenInfo: DEFAULT_LESTEN_INFO,
      modal: {
        selectCostomer: false,
      },
    };
  },
  components: { Modal, datetime, TagList, TheSelectBox, BoxBotton },
  created() {
    if (this.isSelectedCostomer) {
      // 顧客詳細画面から遷移した場合、保持している顧客情報から必要情報を取得する
      this.selectLestenInfo.costomer.userId = this.selectedCostomer.userId;
      this.selectLestenInfo.costomer.fullName =
        this.selectedCostomer.firstName + this.selectedCostomer.lastName;
    } else {
      // 上記以外の画面から遷移した場合、顧客一覧を取得する
      this.$store.commit("loadingFlg", true);
      const vm = this;
      const success = (costomerList) => {
        vm.$store.commit("loadingFlg", false);
        vm.costomerList = costomerList;
      };
      this.$store.dispatch("getCostomerList", {
        success: success,
        error: success,
      });
    }
  },
  computed: {
    convertDateFormat() {
      const momentDate = dayjs(this.reserveDate).format("YYYY-MM-DD HH:mm");
      return momentDate;
    },
    getLestenSpotList() {
      return LESTEN_SPOT_LIST;
    },
    getSelectHourMinuteList() {
      return SELECT_HOUR_MINUTE_LIST;
    },
    selectedCostomer() {
      return this.$store.state.selectedCostomerInfo;
    },
    isSelectedCostomer() {
      return this.selectedCostomer != null;
    },
    showSelectCostomer() {
      return this.selectLestenInfo.costomer.fullName != null
        ? this.selectLestenInfo.costomer.fullName
        : "未選択";
    },
  },
  watch: {},
  methods: {
    clickBackBotton() {
      const fromPath = this.$route.params.fromPath;
      switch (fromPath) {
        case "/observeLestenList":
          this.$router.push(fromPath);
          break;
        default:
          // 上記以外はメモリを解放しTop画面に遷移
          this.$store.commit("clearSelectedCostomerInfo");
          this.$router.push("/");
      }
    },
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
    /**
     * 選択された顧客情報からidと氏名を取り出してメモリに設定
     * @param {object} selectCostomer 選択された顧客情報
     */
    setCostomerName(selectCostomer) {
      this.selectLestenInfo.costomer.userId = selectCostomer.userId;
      this.selectLestenInfo.costomer.fullName =
        selectCostomer.firstName + selectCostomer.lastName;

      // ポップアップを閉じる
      this.closeSelectCostomerModal();
    },
    /**
     * 受講者選択ポップアップを表示
     */
    openSelectCostomerModal() {
      this.modal.selectCostomer = true;
    },
    /**
     * 受講者選択ポップアップを非表示
     */
    closeSelectCostomerModal() {
      this.modal.selectCostomer = false;
    },
    /**
     * レッスンを予約
     */
    reserveLesten() {
      // 有効なレッスンタグに絞り込み
      const tmpTags = deepcopy(this.lestenTagList);
      this.selectLestenInfo.lestenTags = tmpTags.filter((tag) => {
        return tag.isAvable;
      });
      // 日付情報を設定
      this.selectLestenInfo.reserveDate = setDateTime(
        this.selectDateTime.date,
        this.selectDateTime.hour,
        this.selectDateTime.minute
      );
      console.log(this.selectLestenInfo);
    },
  },
};
/**
 * 日付をdayjs型に変換
 * @param {string} date 日付(YYYY-MM-DD)
 * @param {string} hour 時
 * @param {string} minute 分
 * @returns dayjs型("YYYY-MM-DD HH:mm")
 */
function setDateTime(date, hour, minute) {
  return dayjs(date).hour(hour).minute(minute).format("YYYY-MM-DD HH:mm");
}
</script>
<style scoped>
.lesten-registration {
  margin: 32px;
}
.lesten-registration-title {
  font-size: 32px;
}
.lesten-registration-contents {
  margin-top: 16px;
  text-align: left;
}
.lesten-registration-footer {
  margin: 16px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0px 20px; /* 余白 */
}
.footer-botton {
  width: 300px;
}
table {
  border-collapse: collapse;
}
p {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 60px auto 40px;
}
input[type="submit"],
input[type="text"],
select,
textarea,
button {
  -moz-appearance: none;
  -webkit-appearance: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  outline: none;
  border: none;
}

input[type="text"],
textarea {
  background: #f8f8f8;
  display: block;
  font-size: 16px;
  padding: 12px 15px;
  width: 480px;
  transition: 0.8s;
  border-radius: 0;
}
input[type="text"]:focus,
textarea:focus {
  background: #e9f5fb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
textarea[name="content"] {
  display: inline-block;
  width: 100%;
  height: 200px;
}
input::placeholder,
textarea::placeholder {
  color: #ccc;
}
::-webkit-input-placeholder {
  color: #ccc;
  opacity: 1;
}
::-moz-placeholder {
  color: #ccc;
  opacity: 1;
}
:-ms-input-placeholder {
  color: #ccc;
  opacity: 1;
}
.form-table {
  width: 100%;
}
.form-table th,
.form-table td {
  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  padding: 20px;
}

.form-table th {
  background: #ffecea;
  padding-left: 50px;
  position: relative;
  text-align: left;
  width: 300px;
}
.costomer-card {
  margin: 2px;
  background-color: #80808026;
  width: 200px;
}
.costomer-card:hover {
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.15), 0 0 5px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}
/* 選択ボタン */
.select-botton {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  border: 1px solid;
  border-radius: 20px;
}
.select-botton:hover {
  background-color: silver;
}
.date-time-form {
  display: flex;
  align-items: center;
  gap: 0px 20px; /* 余白 */
}
</style>
