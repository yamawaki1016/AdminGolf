<template>
  <div class="lesten-registration">
    <div class="lesten-registration-title">レッスン登録画面</div>
    <div class="lesten-registration-contents">
      <table class="form-table">
        <tbody>
          <tr>
            <th class="middle">受講者</th>
            <td class="middle">
              <span class="select-botton" @click="openSelectCostomerModal()"
                >選択
              </span>
              <span class="ml-8">
                {{ showSelectCostomer }}
              </span>
            </td>
          </tr>
          <tr>
            <th class="middle">日時</th>
            <td class="middle">
              <datetime
                class="custom-date-time-picker"
                format="YYYY/MM/DD"
                width="300px"
                v-model="reserveDate"
              ></datetime>
            </td>
          </tr>
          <tr>
            <th class="middle">レッスン場所</th>
            <td class="middle">
              <TheSelectBox
                :selectBoxList="getLestenSpotList"
                :boxWidth="'300px'"
                @change-select-value="hoge($event)"
              />
            </td>
          </tr>
          <tr>
            <th class="middle">レッスン内容</th>
            <td class="middle">
              <TagList
                :tagList="lestenTagList"
                @click-tag="updateTagAvable($event)"
              />
            </td>
          </tr>
          <tr>
            <th class="middle">備考</th>
            <td class="middle">
              <textarea
                name="content"
                cols="30"
                rows="10"
                placeholder="追記で記載があれば入力"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
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
import TagList from "@/components/TagList";
import Modal from "@/components/Modal.vue";
import TheSelectBox from "@/components/base/TheSelectBox";

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
      selectCostomer: null,
      costomerList: [],
      modal: {
        selectCostomer: false,
      },
    };
  },
  components: { Modal, datetime, TagList, TheSelectBox },
  created() {
    this.reserveDate = new Date();
    this.$store.commit("loadingFlg", true);
    const vm = this;
    const success = (costomerList) => {
      vm.$store.commit("loadingFlg", false);
      vm.costomerList = costomerList;
      console.log(costomerList);
      // 登録完了しましたポップアップ
    };
    this.$store.dispatch("getCostomerList", {
      success: success,
      error: success,
    });
  },
  computed: {
    convertDateFormat() {
      const momentDate = dayjs(this.reserveDate).format("YYYY-MM-DD HH:mm");
      return momentDate;
    },
    getLestenSpotList() {
      return LESTEN_SPOT_LIST;
    },
    showSelectCostomer() {
      return this.selectCostomer != null
        ? this.selectCostomer.firstName + this.selectCostomer.lastName
        : "未選択";
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
    setCostomerName(selectCostomer) {
      this.selectCostomer = selectCostomer;
      this.modal.selectCostomer = false;
    },
    openSelectCostomerModal() {
      this.modal.selectCostomer = true;
    },
    closeSelectCostomerModal() {
      this.modal.selectCostomer = false;
    },
  },
};
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
</style>
