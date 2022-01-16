<template>
  <div class="costomer-list">
    <div class="costomer-list-title">顧客一覧画面</div>
    <div class="search">
      <div class="search-conditions">
        <div class="search-conditions-content">
          <div class="search-conditions-title">顧客ID/名前</div>
          <div>
            <input type="text" maxlength="20" v-model="searchConditions.text" />
          </div>
        </div>
        <div class="search-conditions-content">
          <div class="search-conditions-title">性別</div>
          <div>
            <input
              type="checkbox"
              id="man"
              name="gender"
              value="男性"
              v-model="searchConditions.gender.M"
              checked
            />
            <label for="man">男性</label>
            <input
              type="checkbox"
              id="woman"
              name="gender"
              value="女性"
              v-model="searchConditions.gender.F"
              checked
            />
            <label for="woman">女性</label>
          </div>
        </div>
        <div class="search-conditions-content">
          <div class="search-conditions-title">顧客ステータス</div>
          <div>
            <input
              type="checkbox"
              id="menber"
              name="customerStatus"
              value="メンバー"
              v-model="searchConditions.customerStatus.menber"
              checked
            />
            <label for="menber">メンバー</label>
            <input
              type="checkbox"
              id="visitor"
              name="customerStatus"
              value="ビジター"
              v-model="searchConditions.customerStatus.visitor"
              checked
            />
            <label for="visitor">ビジター</label>
            <input
              type="checkbox"
              id="junior"
              name="customerStatus"
              value="ジュニア"
              v-model="searchConditions.customerStatus.junior"
              checked
            />
            <label for="junior">ジュニア</label>
            <input
              type="checkbox"
              id="general"
              name="customerStatus"
              value="一般"
              v-model="searchConditions.customerStatus.general"
              checked
            />
            <label for="general">一般</label>
          </div>
        </div>
      </div>
    </div>
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
          v-for="costomerInfo in filterCostomerList"
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
            {{ costomerInfo.customerStatus }}
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
          <div class="form-row" id="customerStatus">
            <div class="form-cell">顧客ステータス</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.customerStatus ?? "未入力" }}
            </div>
          </div>
          <!-- 保護者情報（ジュニア選択時のみ） -->
          <div class="form-row" id="parent-first-name">
            <div class="form-cell">保護者氏名（姓）</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.parentFirstName ?? "未入力" }}
            </div>
          </div>
          <div class="form-row" id="parent-last-name">
            <div class="form-cell">保護者氏名（名）</div>
            <div class="form-cell">
              {{ selectedCostomerInfo.parentLastName ?? "未入力" }}
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
              {{ dateFormat(selectedCostomerInfo.createdAt) }}
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="border-t mb-16" />
        <div class="table mg-auto mt-32">
          <SquareBotton title="キャンセル" @click-btn="cancelBtn()" />
          <SquareBotton title="削除" @click-btn="deleteCostomer()" />
          <SquareBotton title="更新" @click-btn="enterUpdateCostomer()" />
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
                id="update-man"
                name="gender"
                value="男性"
                v-model="updatedCostomerInfo.gender"
              />
              <label for="update-man">男性</label>
              <input
                class="form-cell"
                type="radio"
                id="update-woman"
                name="gender"
                value="女性"
                v-model="updatedCostomerInfo.gender"
              />
              <label for="update-woman">女性</label>
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
          <div class="form-row" id="customerStatus">
            <form class="form-cell">顧客ステータス</form>
            <div>
              <input
                class="form-cell"
                type="radio"
                id="update-menber"
                name="customerStatus"
                value="メンバー"
                v-model="updatedCostomerInfo.customerStatus"
              />
              <label for="update-menber">メンバー</label>
              <input
                class="form-cell"
                type="radio"
                id="update-visitor"
                name="customerStatus"
                value="ビジター"
                v-model="updatedCostomerInfo.customerStatus"
              />
              <label for="update-visitor">ビジター</label>
              <div>
                <input
                  class="form-cell"
                  type="radio"
                  id="update-junior"
                  name="customerStatus"
                  value="ジュニア"
                  v-model="updatedCostomerInfo.customerStatus"
                />
                <label for="update-junior">ジュニア</label>
                <input
                  class="form-cell"
                  type="radio"
                  id="update-general"
                  name="customerStatus"
                  value="一般"
                  v-model="updatedCostomerInfo.customerStatus"
                />
                <label for="update-general">一般</label>
              </div>
            </div>
          </div>
          <!-- 保護者情報（ジュニア選択時のみ） -->
          <div class="form-row" id="parent-first-name">
            <form class="form-cell">保護者氏名（姓）</form>
            <input
              class="form-cell"
              type="text"
              maxlength="20"
              v-model="updatedCostomerInfo.parentFirstName"
            />
          </div>
          <div class="form-row" id="parent-last-name">
            <form class="form-cell">保護者氏名（名）</form>
            <input
              class="form-cell"
              type="text"
              maxlength="20"
              v-model="updatedCostomerInfo.parentLastName"
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
            title="キャンセル"
            @click-btn="updateCostomerCancel()"
          />
          <SquareBotton title="更新" @click-btn="updateCostomer()" />
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
          <SquareBotton title="OK" @click-btn="cancelOkBtn()" />
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
          <SquareBotton title="OK" @click-btn="updateOkBtn()" />
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
      searchConditions: {
        text: null,
        gender: {
          M: true,
          F: true,
        },
        customerStatus: {
          menber: true,
          visitor: true,
          junior: true,
          general: true,
        },
      },
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
    /**
     * 顧客リストから検索した結果
     */
    filterCostomerList() {
      // 検索条件
      const searchText = this.searchConditions.text;
      const M = this.searchConditions.gender.M;
      const F = this.searchConditions.gender.F;
      const member = this.searchConditions.customerStatus.menber;
      const visitor = this.searchConditions.customerStatus.visitor;
      const junior = this.searchConditions.customerStatus.junior;
      const general = this.searchConditions.customerStatus.general;

      // 検索対象
      const costomerList = _.cloneDeep(this.costomerList);

      // 検索
      const filterCostomerList = costomerList
        // 顧客ID・氏名の文字列検索(部分一致)
        .filter(function (item) {
          // 入力がない場合は全件表示
          return (
            item["userId"].indexOf(searchText) > -1 ||
            item["firstName"].indexOf(searchText) > -1 ||
            item["lastName"].indexOf(searchText) > -1 ||
            searchText === "" ||
            searchText == null
          );
        })
        // 性別検索
        .filter(function (item) {
          let resultM = false;
          let resultF = false;
          if (M) resultM = item["gender"] == "男性";
          if (F) resultF = item["gender"] == "女性";
          return resultM || resultF;
        })
        // 顧客ステータス検索
        .filter(function (item) {
          let resultMenber = false;
          let resultVisitor = false;
          let resultJunior = false;
          let resultGeneral = false;
          if (member) resultMenber = item["customerStatus"] == "メンバー";
          if (visitor) resultVisitor = item["customerStatus"] == "ビジター";
          if (junior) resultJunior = item["customerStatus"] == "ジュニア";
          if (general) resultGeneral = item["customerStatus"] == "一般";
          return resultMenber || resultVisitor || resultJunior || resultGeneral;
        });

      return filterCostomerList;
    },
  },
  methods: {
    selectCostomer(info) {
      this.selectedCostomerInfo = info;
      this.modalSelectedCostomerFlg = true;
    },
    dateFormat(date) {
      return moment(date, "MM/DD/YYYY").format("YYYY-MM-DD");
    },
    cancelBtn() {
      this.modalSelectedCostomerFlg = false;
    },
    deleteCostomer() {
      const vm = this;
      this.$store.commit("loadingFlg", true);
      const success = () => {
        this.getCostomerList();
        this.modalSelectedCostomerFlg = false;
        this.modalCanceledFlg = true;
      };
      const error = () => {
        vm.$store.commit("loadingFlg", false);
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
        const vm = this;
        this.$store.commit("loadingFlg", true);
        // 顧客情報を更新（nullに置き換え)
        let costomerInfo = {
          userId: this.updatedCostomerInfo.userId,
          firstName: this.updatedCostomerInfo.firstName,
          lastName: this.updatedCostomerInfo.lastName,
          age: this.updatedCostomerInfo.age ? this.updatedCostomerInfo.age : "",
          gender: this.updatedCostomerInfo.gender,
          phoneNumber: this.updatedCostomerInfo.phoneNumber,
          email: this.updatedCostomerInfo.email
            ? this.updatedCostomerInfo.email
            : "",
          customerStatus: this.updatedCostomerInfo.customerStatus,
          score: this.updatedCostomerInfo.score
            ? this.updatedCostomerInfo.score
            : "",
          parentFirstName: this.updatedCostomerInfo.parentFirstName
            ? this.updatedCostomerInfo.parentFirstName
            : "",
          parentLastName: this.updatedCostomerInfo.parentLastName
            ? this.updatedCostomerInfo.parentLastName
            : "",
          otherInfo: this.updatedCostomerInfo.otherInfo
            ? this.updatedCostomerInfo.otherInfo
            : "",
        };

        const success = () => {
          this.modalUpdateCostomerFlg = false;
          this.modalUpdatedFlg = true;
          this.getCostomerList();
        };
        const error = () => {
          vm.$store.commit("loadingFlg", false);
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
        this.updatedCostomerInfo.customerStatus
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
      if (!this.updatedCostomerInfo.customerStatus) {
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
      const vm = this;
      this.$store.commit("loadingFlg", true);
      const getCostomerListSuccess = (costomerList) => {
        vm.$store.commit("loadingFlg", false);
        this.costomerList = costomerList;
      };
      const getCostomerListError = () => {
        vm.$store.commit("loadingFlg", false);
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
</style>
