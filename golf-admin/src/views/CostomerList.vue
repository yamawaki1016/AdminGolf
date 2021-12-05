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
        <div class="border-t mb-16" />
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
            @click-btn="enterUpdateCostomer()"
          />
        </div>
      </template>
    </Modal>
    <!-- 顧客情報更新入力ポップアップ -->
    <Modal v-if="modalUpdateCostomerFlg">
      <template v-slot:header>
        <div class="bold mb-16 border-b">顧客情報更新入力</div>
      </template>
      <template v-slot:body>
        <div class="selectedCostomerInfo">
          <!-- 氏名（姓）（最大20文字） -->
          <div class="form-row" id="first-name">
            <form class="form-cell">ユーザーID</form>
            <input
              class="form-cell"
              type="text"
              maxlength="20"
              readonly
              v-model="updatedCostomerInfo.userId"
            />
          </div>
          <!-- 氏名（姓）（最大20文字） -->
          <div class="form-row" id="first-name">
            <form class="form-cell">氏名（姓）</form>
            <input
              class="form-cell"
              type="text"
              maxlength="20"
              placeholder="必須"
              v-model="updatedCostomerInfo.firstName"
            />
          </div>
          <!-- 氏名（名）（最大20文字） -->
          <div class="form-row" id="last-name">
            <form class="form-cell">氏名（名）</form>
            <input
              class="form-cell"
              type="text"
              maxlength="20"
              placeholder="必須"
              v-model="updatedCostomerInfo.lastName"
            />
          </div>
          <!-- 年齢（0~100） -->
          <div class="form-row" id="age">
            <form class="form-cell">年齢</form>
            <input
              class="form-cell"
              type="number"
              min="0"
              max="100"
              v-model="updatedCostomerInfo.age"
            />
          </div>
          <!-- 性別 -->
          <div class="form-row" id="gender">
            <form class="form-cell">性別</form>
            <div>
              <input
                class="form-cell"
                type="radio"
                id="man"
                name="gender"
                value="男性"
                v-model="updatedCostomerInfo.gender"
              />
              <label for="man">男性</label>
              <input
                class="form-cell"
                type="radio"
                id="woman"
                name="gender"
                value="女性"
                v-model="updatedCostomerInfo.gender"
              />
              <label for="woman">女性</label>
            </div>
          </div>
          <!-- 電話番号（最大11文字） -->
          <div class="form-row" id="phone-number">
            <form class="form-cell">電話番号</form>
            <input
              class="form-cell"
              type="tel"
              maxlength="11"
              v-model="updatedCostomerInfo.phoneNumber"
              placeholder="必須"
            />
          </div>
          <!-- メールアドレス（最大50文字） -->
          <div class="form-row" id="email">
            <form class="form-cell">メールアドレス</form>
            <input
              class="form-cell"
              type="email"
              maxlength="50"
              v-model="updatedCostomerInfo.email"
            />
          </div>
          <!-- 顧客ステータス -->
          <div class="form-row" id="status">
            <form class="form-cell">顧客ステータス</form>
            <div>
              <input
                class="form-cell"
                type="radio"
                id="menber"
                name="status"
                value="メンバー"
                v-model="updatedCostomerInfo.status"
              />
              <label for="menber">メンバー</label>
              <input
                class="form-cell"
                type="radio"
                id="visitor"
                name="status"
                value="ビジター"
                v-model="updatedCostomerInfo.status"
              />
              <label for="visitor">ビジター</label>
              <div>
                <input
                  class="form-cell"
                  type="radio"
                  id="junior"
                  name="status"
                  value="ジュニア"
                  v-model="updatedCostomerInfo.status"
                />
                <label for="junior">ジュニア</label>
                <input
                  class="form-cell"
                  type="radio"
                  id="general"
                  name="status"
                  value="一般"
                  v-model="updatedCostomerInfo.status"
                />
                <label for="general">一般</label>
              </div>
            </div>
          </div>
          <!-- 保護者情報（ジュニア選択時のみ） -->
          <div class="form-row" id="parents-first-name">
            <form class="form-cell">保護者氏名（姓）</form>
            <input
              class="form-cell"
              type="text"
              maxlength="20"
              v-model="updatedCostomerInfo.parentsFirstName"
            />
          </div>
          <div class="form-row" id="parents-last-name">
            <form class="form-cell">保護者氏名（名）</form>
            <input
              class="form-cell"
              type="text"
              maxlength="20"
              v-model="updatedCostomerInfo.parentsLastName"
            />
          </div>
          <!-- スコア -->
          <div class="form-row" id="score">
            <form class="form-cell">平均スコア</form>
            <input
              class="form-cell"
              type="text"
              v-model="updatedCostomerInfo.score"
            />
          </div>
          <!-- その他 -->
          <div class="form-row" id="other-info">
            <form class="form-cell">その他</form>
            <textarea
              class="other-textarea"
              placeholder="その他備考情報があれば記載"
              v-model="updatedCostomerInfo.otherInfo"
            ></textarea>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="border-t mb-16" />
        <div class="errorMsg">{{ errorMsg }}</div>
        <div class="table mg-auto mt-32">
          <SquareBotton
            class="update-botton"
            title="キャンセル"
            @click-btn="updateCostomerCancel()"
          />
          <SquareBotton
            class="update-botton"
            title="更新"
            @click-btn="updateCostomer()"
          />
        </div>
      </template>
    </Modal>
    <!-- 削除完了ポップアップ -->
    <Modal v-if="modalCanceledFlg">
      <template v-slot:header>
        <div class="bold mb-16 border-b">削除完了</div>
      </template>
      <template v-slot:body>
        <div class="selectedCostomerInfo">削除しました。</div>
      </template>
      <template v-slot:footer>
        <div class="border-t mb-16" />
        <div class="table mg-auto mt-32">
          <SquareBotton
            class="cancel-ok-botton"
            title="OK"
            @click-btn="cancelOkBtn()"
          />
        </div>
      </template>
    </Modal>
    <!-- 更新完了ポップアップ -->
    <Modal v-if="modalUpdatedFlg">
      <template v-slot:header>
        <div class="bold mb-16 border-b">更新完了</div>
      </template>
      <template v-slot:body>
        <div class="selectedCostomerInfo">更新しました。</div>
      </template>
      <template v-slot:footer>
        <div class="border-t mb-16" />
        <div class="table mg-auto mt-32">
          <SquareBotton
            class="update-ok-botton"
            title="OK"
            @click-btn="updateOkBtn()"
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
import _ from "lodash";

export default {
  name: "CostomerList",
  data() {
    return {
      modalSelectedCostomerFlg: false,
      modalUpdateCostomerFlg: false,
      modalCanceledFlg: false,
      modalUpdatedFlg: false,
      costomerList: [],
      selectedCostomerInfo: null,
      updatedCostomerInfo: null,
      errorMsg: null,
    };
  },
  components: { Modal, SquareBotton },
  created() {
    this.getCostomerList();
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
        this.getCostomerList();
        this.modalSelectedCostomerFlg = false;
        this.modalCanceledFlg = true;
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
    cancelOkBtn() {
      this.modalCanceledFlg = false;
    },
    enterUpdateCostomer() {
      // 顧客登録更新画面に遷移?
      this.updatedCostomerInfo = _.cloneDeep(this.selectedCostomerInfo);
      this.modalSelectedCostomerFlg = false;
      this.modalUpdateCostomerFlg = true;
    },
    updateCostomer() {
      if (this.checkForm()) {
        // 顧客情報を更新（nullに置き換え)
        let costomerInfo = {
          userId: this.updatedCostomerInfo.userId,
          firstName: this.updatedCostomerInfo.firstName,
          lastName: this.updatedCostomerInfo.lastName,
          age: this.updatedCostomerInfo.age
            ? this.updatedCostomerInfo.age
            : null,
          gender: this.updatedCostomerInfo.gender,
          phoneNumber: this.updatedCostomerInfo.phoneNumber,
          email: this.updatedCostomerInfo.email
            ? this.updatedCostomerInfo.email
            : null,
          status: this.updatedCostomerInfo.status,
          score: this.updatedCostomerInfo.score
            ? this.updatedCostomerInfo.score
            : null,
          parentsFirstName: this.updatedCostomerInfo.parentsFirstName
            ? this.updatedCostomerInfo.parentsFirstName
            : null,
          parentsLastName: this.updatedCostomerInfo.parentsLastName
            ? this.updatedCostomerInfo.parentsLastName
            : null,
          otherInfo: this.updatedCostomerInfo.otherInfo
            ? this.updatedCostomerInfo.otherInfo
            : null,
        };

        const success = () => {
          this.modalUpdateCostomerFlg = false;
          this.modalUpdatedFlg = true;
          this.getCostomerList();
        };
        const error = () => {
          console.log("error");
        };
        this.$store.dispatch("updateCostomerInfo", {
          success: success,
          error: error,
          costomerInfo: costomerInfo,
        });
      }
    },
    updateCostomerCancel() {
      this.modalUpdateCostomerFlg = false;
    },
    updateOkBtn() {
      this.modalUpdatedFlg = false;
    },
    /**
     * 入力チェック
     */
    checkForm() {
      let errMsgList = [];
      if (
        this.updatedCostomerInfo.firstName &&
        this.updatedCostomerInfo.lastName &&
        this.updatedCostomerInfo.gender &&
        this.updatedCostomerInfo.phoneNumber &&
        this.updatedCostomerInfo.status
      ) {
        this.errorMsg = null;
        return true;
      }

      if (!this.updatedCostomerInfo.firstName) {
        errMsgList.push("氏名(姓)");
      }
      if (!this.updatedCostomerInfo.lastName) {
        errMsgList.push("氏名(名)");
      }
      if (!this.updatedCostomerInfo.gender) {
        errMsgList.push("性別");
      }
      if (!this.updatedCostomerInfo.phoneNumber) {
        errMsgList.push("電話番号");
      }
      if (!this.updatedCostomerInfo.status) {
        errMsgList.push("顧客ステータス");
      }

      this.errorMsg =
        "必須項目は必ず入力してください。： " + errMsgList.concat(",");
      return false;
    },
    /**
     * 顧客情報取得処理
     * success():$dataの顧客情報リストに反映
     * error():エラーログ
     */
    getCostomerList() {
      const getCostomerListSuccess = (costomerList) => {
        this.costomerList = costomerList;
      };
      const getCostomerListError = () => {
        console.log("getError");
      };
      /**
       * 最新の顧客リストを取得
       */
      this.$store.dispatch("getCostomerList", {
        success: getCostomerListSuccess,
        error: getCostomerListError,
      });
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
.errorMsg {
  color: red;
}
</style>
