<template>
  <div class="lesten-registration">
    <div class="lesten-registration-title">顧客登録画面</div>
    <div class="lesten-registration-contents">
      <table class="form-table">
        <tbody>
          <!-- 氏名 -->
          <tr>
            <th class="middle">
              <span>氏名</span>
              <span class="required-form">【必須】</span>
            </th>
            <td class="middle flex-form">
              <!-- 氏名（姓）（最大20文字） -->
              <div class="flex-name-form" id="first-name">
                <input
                  class="form-cell"
                  type="text"
                  maxlength="20"
                  placeholder="性"
                  v-model="inputCostomerInfo.firstName"
                />
              </div>
              <!-- 氏名（名）（最大20文字） -->
              <div class="flex-name-form" id="last-name">
                <input
                  class="form-cell"
                  type="text"
                  maxlength="20"
                  placeholder="名"
                  v-model="inputCostomerInfo.lastName"
                />
              </div>
            </td>
          </tr>
          <!-- 年齢（0~100） -->
          <tr>
            <th class="middle">
              <span>年齢</span>
            </th>
            <td class="middle">
              <input
                class="form-cell"
                type="number"
                min="0"
                max="100"
                v-model="inputCostomerInfo.age"
              />
            </td>
          </tr>
          <!-- 性別 -->
          <tr>
            <th class="middle">
              <span>性別</span>
              <span class="required-form">【必須】</span>
            </th>
            <td class="middle">
              <div>
                <input
                  class="form-cell"
                  type="radio"
                  id="man"
                  name="gender"
                  value="男性"
                  v-model="inputCostomerInfo.gender"
                />
                <label for="man">男性</label>
                <input
                  class="form-cell"
                  type="radio"
                  id="woman"
                  name="gender"
                  value="女性"
                  v-model="inputCostomerInfo.gender"
                />
                <label for="woman">女性</label>
              </div>
            </td>
          </tr>
          <!-- 電話番号（最大11文字） -->
          <tr>
            <th class="middle">
              <span>電話番号</span>
              <span class="required-form">【必須】</span>
            </th>
            <td class="middle">
              <div class="form-row" id="phone-number">
                <input
                  class="form-cell"
                  type="tel"
                  maxlength="11"
                  v-model="inputCostomerInfo.phoneNumber"
                  placeholder="必須"
                />
              </div>
            </td>
          </tr>
          <!-- メールアドレス（最大50文字） -->
          <tr>
            <th class="middle">
              <span>メールアドレス</span>
            </th>
            <td class="middle">
              <div class="form-row" id="email">
                <input
                  class="form-cell"
                  type="email"
                  maxlength="50"
                  placeholder="必須"
                  v-model="inputCostomerInfo.email"
                />
              </div>
            </td>
          </tr>
          <!-- 顧客ステータス -->
          <tr>
            <th class="middle">
              <span>顧客ステータス</span>
              <span class="required-form">【必須】</span>
            </th>
            <td class="middle">
              <div class="form-row" id="customerStatus">
                <div>
                  <input
                    class="form-cell"
                    type="radio"
                    id="menber"
                    name="customerStatus"
                    value="メンバー"
                    v-model="inputCostomerInfo.customerStatus"
                  />
                  <label for="menber">メンバー</label>
                  <input
                    class="form-cell"
                    type="radio"
                    id="visitor"
                    name="customerStatus"
                    value="ビジター"
                    v-model="inputCostomerInfo.customerStatus"
                  />
                  <label for="visitor">ビジター</label>
                  <input
                    class="form-cell"
                    type="radio"
                    id="junior"
                    name="customerStatus"
                    value="ジュニア"
                    v-model="inputCostomerInfo.customerStatus"
                  />
                  <label for="junior">ジュニア</label>
                  <input
                    class="form-cell"
                    type="radio"
                    id="general"
                    name="customerStatus"
                    value="一般"
                    v-model="inputCostomerInfo.customerStatus"
                  />
                  <label for="general">一般</label>
                </div>
              </div>
            </td>
          </tr>
          <!-- 保護者情報（ジュニア選択時のみ） -->
          <tr>
            <th class="middle">
              <span>保護者氏名</span>
            </th>
            <td class="middle">
              <div class="flex-form">
                <div class="form-row" id="parents-first-name">
                  <input
                    class="form-cell"
                    type="text"
                    maxlength="20"
                    placeholder="性"
                    v-model="inputCostomerInfo.parentsFirstName"
                  />
                </div>
                <div class="form-row" id="parents-last-name">
                  <input
                    class="form-cell"
                    type="text"
                    maxlength="20"
                    placeholder="名"
                    v-model="inputCostomerInfo.parentsLastName"
                  />
                </div>
              </div>
            </td>
          </tr>
          <!-- 平均スコア -->
          <tr>
            <th class="middle">
              <span>平均スコア</span>
            </th>
            <td class="middle">
              <div class="form-row" id="score">
                <input
                  class="form-cell"
                  type="text"
                  v-model="inputCostomerInfo.score"
                />
              </div>
            </td>
          </tr>
          <!-- その他 -->
          <tr>
            <th class="middle">
              <span>その他</span>
            </th>
            <td class="middle">
              <div class="form-row" id="other-info">
                <textarea
                  class="other-textarea"
                  placeholder="その他備考情報があれば記載"
                  v-model="inputCostomerInfo.otherInfo"
                ></textarea>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="errorMsg">{{ errorMsg }}</div>
    <div class="lesten-registration-footer flex-center">
      <div class="footer-botton">
        <BoxBotton text="Top画面" @click-box-botton="gotoTop()" />
      </div>
      <div class="footer-botton">
        <BoxBotton text="登録" @click-box-botton="registrationBtn()" />
      </div>
    </div>
    <Modal v-if="modalFlg">
      <template v-slot:header>
        <div class="bold mb-16 border-b">登録確認</div>
      </template>
      <template v-slot:body>
        <div class="registrationVerification">
          <!-- 氏名（姓）（最大20文字） -->
          <div class="form-row" id="first-name">
            <div class="form-cell">氏名（姓）</div>
            <div class="form-cell">
              {{ costomerInfo.firstName ?? "未入力" }}
            </div>
          </div>
          <!-- 氏名（名）（最大20文字） -->
          <div class="form-row" id="last-name">
            <div class="form-cell">氏名（名）</div>
            <div class="form-cell">{{ costomerInfo.lastName ?? "未入力" }}</div>
          </div>
          <!-- 年齢（0~100） -->
          <div class="form-row" id="age">
            <div class="form-cell">年齢</div>
            <div class="form-cell">{{ costomerInfo.age ?? "未入力" }}</div>
          </div>
          <!-- 性別 -->
          <div class="form-row" id="gender">
            <div class="form-cell">性別</div>
            <div class="form-cell">{{ costomerInfo.gender ?? "未入力" }}</div>
          </div>
          <!-- 電話番号（最大11文字） -->
          <div class="form-row" id="phone-number">
            <div class="form-cell">電話番号</div>
            <div class="form-cell">
              {{ costomerInfo.phoneNumber ?? "未入力" }}
            </div>
          </div>
          <!-- メールアドレス（最大50文字） -->
          <div class="form-row" id="email">
            <div class="form-cell">メールアドレス</div>
            <div class="form-cell">{{ costomerInfo.email ?? "未入力" }}</div>
          </div>
          <!-- 顧客ステータス -->
          <div class="form-row" id="customerStatus">
            <div class="form-cell">顧客ステータス</div>
            <div class="form-cell">
              {{ costomerInfo.customerStatus ?? "未入力" }}
            </div>
          </div>
          <!-- 保護者情報（ジュニア選択時のみ） -->
          <div class="form-row" id="parents-first-name">
            <div class="form-cell">保護者氏名（姓）</div>
            <div class="form-cell">
              {{ costomerInfo.parentsFirstName ?? "未入力" }}
            </div>
          </div>
          <div class="form-row" id="parents-last-name">
            <div class="form-cell">保護者氏名（名）</div>
            <div class="form-cell">
              {{ costomerInfo.parentsLastName ?? "未入力" }}
            </div>
          </div>
          <div class="form-row" id="score">
            <div class="form-cell">平均スコア</div>
            <div class="form-cell">{{ costomerInfo.score ?? "未入力" }}</div>
          </div>
          <div class="form-row" id="other-info">
            <div class="form-cell">その他</div>
            <div class="form-cell">
              {{ costomerInfo.otherInfo ?? "未入力" }}
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
            @click-btn="registrationCancelBtn()"
          />
          <SquareBotton
            class="ok-botton"
            title="OK"
            @click-btn="registrationOKBtn()"
          />
        </div>
      </template>
    </Modal>
    <Modal v-if="modalRegistrationCompleteFlg">
      <template v-slot:header>
        <div class="bold mb-16 border-b">登録完了</div>
      </template>
      <template v-slot:body>
        顧客の登録が完了しました。
        <br />
        Top画面に戻ります。
      </template>
      <template v-slot:footer>
        <div class="table mg-auto mt-32">
          <SquareBotton class="" title="OK" @click-btn="gotoTop()" />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import BoxBotton from "@/components/base/BoxBotton";
import SquareBotton from "@/components/SquareBotton.vue";

const DEFAULT_COSTOMER_INFO = {
  firstName: null,
  lastName: null,
  age: null,
  gender: null,
  phoneNumber: null,
  email: null,
  customerStatus: null,
  score: null,
  parentsFirstName: null,
  parentsLastName: null,
  otherInfo: null,
};

export default {
  name: "CostomerRegistration",
  data() {
    return {
      modalFlg: false,
      modalRegistrationCompleteFlg: false,
      errorMsg: null,
      inputCostomerInfo: DEFAULT_COSTOMER_INFO,
      costomerInfo: null,
    };
  },
  components: { BoxBotton, Modal, SquareBotton },
  created() {
    this.inputCostomerInfo = DEFAULT_COSTOMER_INFO;
  },
  computed: {},
  watch: {},
  methods: {
    gotoTop() {
      this.$router.push("/");
    },
    /**
     * 入力チェックを行い、問題なければ確認ポップアップ表示
     */
    registrationBtn() {
      if (this.checkForm()) {
        // 顧客情報を作成
        let costomerInfo = {
          firstName: this.inputCostomerInfo.firstName,
          lastName: this.inputCostomerInfo.lastName,
          age: this.inputCostomerInfo.age ? this.inputCostomerInfo.age : null,
          gender: this.inputCostomerInfo.gender,
          phoneNumber: this.inputCostomerInfo.phoneNumber,
          email: this.inputCostomerInfo.email
            ? this.inputCostomerInfo.email
            : null,
          customerStatus: this.inputCostomerInfo.customerStatus,
          score: this.inputCostomerInfo.score
            ? this.inputCostomerInfo.score
            : null,
          parentsFirstName: this.inputCostomerInfo.parentsFirstName
            ? this.inputCostomerInfo.parentsFirstName
            : null,
          parentsLastName: this.inputCostomerInfo.parentsLastName
            ? this.inputCostomerInfo.parentsLastName
            : null,
          otherInfo: this.inputCostomerInfo.otherInfo
            ? this.inputCostomerInfo.otherInfo
            : null,
        };
        this.costomerInfo = costomerInfo;

        // 確認ポップアップ表示
        this.modalFlg = true;
      }
    },
    /**
     * 入力チェック
     */
    checkForm() {
      let errMsgList = [];
      const inputCostomerInfo = this.inputCostomerInfo;
      if (
        inputCostomerInfo.firstName &&
        inputCostomerInfo.lastName &&
        inputCostomerInfo.gender &&
        inputCostomerInfo.phoneNumber &&
        inputCostomerInfo.customerStatus
      ) {
        this.errorMsg = null;
        return true;
      }

      if (!inputCostomerInfo.firstName) {
        errMsgList.push("氏名(姓)");
      }
      if (!inputCostomerInfo.lastName) {
        errMsgList.push("氏名(名)");
      }
      if (!inputCostomerInfo.gender) {
        errMsgList.push("性別");
      }
      if (!inputCostomerInfo.phoneNumber) {
        errMsgList.push("電話番号");
      }
      if (!inputCostomerInfo.customerStatus) {
        errMsgList.push("顧客ステータス");
      }

      this.errorMsg =
        "必須項目は必ず入力してください。： " + errMsgList.concat(",");
      return false;
    },

    /**
     * 顧客情報登録ポップアップでOK押下
     */
    registrationOKBtn() {
      const vm = this;
      this.$store.commit("loadingFlg", true);
      const success = () => {
        vm.$store.commit("loadingFlg", false);
        // 登録完了しましたポップアップ
        this.modalFlg = false;
        this.modalRegistrationCompleteFlg = true;
      };
      const error = () => {
        vm.$store.commit("loadingFlg", false);
        // 登録失敗しましたポップアップ
        console.log("登録失敗");
      };
      this.$store.dispatch("createCostomer", {
        costomerInfo: this.costomerInfo,
        success: success,
        error: error,
      });
    },
    registrationCancelBtn() {
      this.modalFlg = false;
      this.costomerInfo = null;
    },
  },
};
</script>
<style scoped>
.required-form {
  color: red;
}
.flex-form {
  display: flex;
  justify-content: left;
  gap: 10px 20px; /* 余白 */
  flex-flow: column;
}
.flex-name-form {
  width: 150px;
}
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
input[type="tel"],
input[type="email"],
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
input[type="tel"],
input[type="email"],
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
input[type="tel"]:focus,
input[type="email"]:focus,
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
