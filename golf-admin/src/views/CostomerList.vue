<template>
  <div class="costomer-list">
    <div class="costomer-list-title">顧客一覧画面</div>
    <div class="costomer-content">
      <div v-if="isNoCostomerListFlg">顧客が１件も登録されていません</div>
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
          @click="selectCostomer(costomerInfo)"
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
    <!-- 顧客詳細表示ポップアップ -->
    <Modal v-if="modalSelectedCostomerFlg">
      <template v-slot:header>
        <div class="bold mb-16 border-b">登録確認</div>
      </template>
      <template v-slot:body>
        <div class="selectedCostomerInfo">
          <!-- ユーザーID -->
          <div class="form-row" id="first-name">
            <div class="form-cell">顧客ID</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.userId }}
            </div>
          </div>
          <!-- 氏名（姓）（最大20文字） -->
          <div class="form-row" id="first-name">
            <div class="form-cell">氏名（姓）</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.firstName ?? "未入力" }}
            </div>
          </div>
          <!-- 氏名（名）（最大20文字） -->
          <div class="form-row" id="last-name">
            <div class="form-cell">氏名（名）</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.lastName ?? "未入力" }}
            </div>
          </div>
          <!-- 年齢（0~100） -->
          <div class="form-row" id="age">
            <div class="form-cell">年齢</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.age ?? "未入力" }}
            </div>
          </div>
          <!-- 性別 -->
          <div class="form-row" id="gender">
            <div class="form-cell">性別</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.gender ?? "未入力" }}
            </div>
          </div>
          <!-- 電話番号（最大11文字） -->
          <div class="form-row" id="phone-number">
            <div class="form-cell">電話番号</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.phoneNumber ?? "未入力" }}
            </div>
          </div>
          <!-- メールアドレス（最大50文字） -->
          <div class="form-row" id="email">
            <div class="form-cell">メールアドレス</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.email ?? "未入力" }}
            </div>
          </div>
          <!-- 顧客ステータス -->
          <div class="form-row" id="status">
            <div class="form-cell">顧客ステータス</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.status ?? "未入力" }}
            </div>
          </div>
          <!-- 保護者情報（ジュニア選択時のみ） -->
          <div class="form-row" id="parents-first-name">
            <div class="form-cell">保護者氏名（姓）</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.parentsFirstName ?? "未入力" }}
            </div>
          </div>
          <div class="form-row" id="parents-last-name">
            <div class="form-cell">保護者氏名（名）</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.parentsLastName ?? "未入力" }}
            </div>
          </div>
          <!-- スコア -->
          <div class="form-row" id="score">
            <div class="form-cell">平均スコア</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.score ?? "未入力" }}
            </div>
          </div>
          <!-- その他 -->
          <div class="form-row" id="other-info">
            <div class="form-cell">その他</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.otherInfo ?? "未入力" }}
            </div>
          </div>
          <!-- 作成日 -->
          <div class="form-row" id="other-info">
            <div class="form-cell">登録日付</div>
            <div class="form-cell">
              {{ dateFormat(selectedCostomerInfo.createAt) }}
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="border-t mb-16">上記内容で登録しますか？</div>
        <div class="table mg-auto mt-32">
          <SquareBotton
            class="cancel-botton"
            title="キャンセル"
            @click-btn="cancelBtn()"
          />
          <SquareBotton
            class="delete-botton"
            title="削除"
            @click-btn="deleteCostomer()"
          />
          <SquareBotton
            class="update-botton"
            title="更新"
            @click-btn="updateCostomer()"
          />
        </div>
      </template>
    </Modal>
    <Modal v-if="modalCanceledFlg">
      <template v-slot:header>
        <div class="bold mb-16 border-b">キャンセル完了</div>
      </template>
      <template v-slot:body>
        <div class="selectedCostomerInfo">削除しました。</div>
      </template>
      <template v-slot:footer>
        <div class="border-t mb-16"></div>
        <div class="table mg-auto mt-32">
          <SquareBotton
            class="cancel-ok-botton"
            title="OK"
            @click-btn="concelOkBtn()"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import SquareBotton from "@/components/SquareBotton.vue";
import Modal from "@/components/Modal.vue";
import moment from "moment";
export default {
  name: "CostomerList",
  data() {
    return {
      noCostomerListFlg: true,
      modalSelectedCostomerFlg: false,
      modalCanceledFlg: false,
      costomerList: [],
      selectedCostomerInfo: null,
    };
  },
  components: { Modal, SquareBotton },
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
  computed: {
    /**
     * 顧客の登録件数が0かどうかを返却
     */
    isNoCostomerListFlg() {
      return this.costomerList.length > 0 ? false : true;
    },
  },
  methods: {
    selectCostomer(info) {
      this.selectedCostomerInfo = info;
      this.modalSelectedCostomerFlg = true;
    },
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    cancelBtn() {
      this.modalSelectedCostomerFlg = false;
    },
    deleteCostomer() {
      const success = () => {
        const getSuccess = (costomerList) => {
          this.modalSelectedCostomerFlg = false;
          this.modalCanceledFlg = true;
          this.costomerList = costomerList;
        };
        const getError = () => {
          console.log("getError");
        };
        this.$store.dispatch("getCostomerList", {
          success: getSuccess,
          error: getError,
        });
      };
      const error = () => {
        console.log("error");
      };

      this.$store.dispatch("deleteCostomer", {
        success: success,
        error: error,
        costomerInfo: this.selectedCostomerInfo,
      });
    },
    updateCostomer() {
      this.modalSelectedCostomerFlg = false;
    },
    concelOkBtn() {
      this.modalCanceledFlg = false;
    },
  },
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
.selectedCostomerInfo {
  margin: 0 auto 16px;
  display: table;
}
.form-row {
  display: table-row;
  margin-bottom: 8px;
  height: 10px;
}
.form-cell {
  display: table-cell;
}
</style>
