<template>
  <div class="costomer-info">
    <div class="costomer-info-title">顧客登録画面</div>
    <div class="border-t mt-32" />
    <div class="costomer-info-form">
      <!-- 氏名（姓）（最大20文字） -->
      <div class="form-row" id="first-name">
        <form class="form-cell">氏名（姓）</form>
        <input
          class="form-cell"
          type="text"
          maxlength="20"
          placeholder="必須"
          v-model="firstName"
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
          v-model="lastName"
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
          v-model="age"
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
            v-model="gender"
          />
          <label for="man">男性</label>
          <input
            class="form-cell"
            type="radio"
            id="woman"
            name="gender"
            value="女性"
            v-model="gender"
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
          v-model="phoneNumber"
          placeholder="必須"
        />
      </div>
      <!-- メールアドレス（最大50文字） -->
      <div class="form-row" id="email">
        <form class="form-cell">メールアドレス</form>
        <input class="form-cell" type="email" maxlength="50" v-model="email" />
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
            v-model="status"
          />
          <label for="menber">メンバー</label>
          <input
            class="form-cell"
            type="radio"
            id="visitor"
            name="status"
            value="ビジター"
            v-model="status"
          />
          <label for="visitor">ビジター</label>
          <div>
            <input
              class="form-cell"
              type="radio"
              id="junior"
              name="status"
              value="ジュニア"
              v-model="status"
            />
            <label for="junior">ジュニア</label>
            <input
              class="form-cell"
              type="radio"
              id="general"
              name="status"
              value="一般"
              v-model="status"
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
          v-model="parentsFirstName"
        />
      </div>
      <div class="form-row" id="parents-last-name">
        <form class="form-cell">保護者氏名（名）</form>
        <input
          class="form-cell"
          type="text"
          maxlength="20"
          v-model="parentsLastName"
        />
      </div>
      <div class="form-row" id="score">
        <form class="form-cell">平均スコア</form>
        <input class="form-cell" type="text" v-model="score" />
      </div>
      <div class="form-row" id="other-info">
        <form class="form-cell">その他</form>
        <textarea
          class="other-textarea"
          placeholder="その他備考情報があれば記載"
          v-model="otherInfo"
        ></textarea>
      </div>
    </div>
    <div class="border-t mt-32" />
    <div class="errorMsg">{{ errorMsg }}</div>
    <div class="table mg-auto mt-32">
      <SquareBotton
        class="cancel-botton"
        title="Top画面"
        @click-btn="gotoTop()"
      />
      <SquareBotton
        class="ok-botton"
        title="登録"
        @click-btn="registrationBtn()"
      />
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
          <div class="form-row" id="status">
            <div class="form-cell">顧客ステータス</div>
            <div class="form-cell">{{ costomerInfo.status ?? "未入力" }}</div>
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
import SquareBotton from "@/components/SquareBotton.vue";
import Modal from "@/components/Modal.vue";
export default {
  name: "CostomerRegistration",
  data() {
    return {
      modalFlg: false,
      modalRegistrationCompleteFlg: false,
      errorMsg: null,
      firstName: null,
      lastName: null,
      age: null,
      gender: null,
      phoneNumber: null,
      email: null,
      status: null,
      score: null,
      parentsFirstName: null,
      parentsLastName: null,
      otherInfo: null,
      costomerInfo: null,
    };
  },
  components: { Modal, SquareBotton },
  computed: {
    isExistsErrorMsg() {
      return this.errorMsg != null ? true : false;
    },
  },
  methods: {
    /**
     * 入力チェック
     */
    checkForm() {
      let errMsgList = [];
      if (
        this.firstName &&
        this.lastName &&
        this.gender &&
        this.phoneNumber &&
        this.status
      ) {
        this.errorMsg = null;
        return true;
      }

      if (!this.firstName) {
        errMsgList.push("氏名(姓)");
      }
      if (!this.lastName) {
        errMsgList.push("氏名(名)");
      }
      if (!this.gender) {
        errMsgList.push("性別");
      }
      if (!this.phoneNumber) {
        errMsgList.push("電話番号");
      }
      if (!this.status) {
        errMsgList.push("顧客ステータス");
      }

      this.errorMsg =
        "必須項目は必ず入力してください。： " + errMsgList.concat(",");
      return false;
    },
    /**
     * 入力チェックを行い、問題なければ確認ポップアップ表示
     */
    registrationBtn() {
      if (this.checkForm()) {
        // 顧客情報を作成
        let costomerInfo = {
          firstName: this.firstName,
          lastName: this.lastName,
          age: this.age ? this.age : null,
          gender: this.gender,
          phoneNumber: this.phoneNumber,
          email: this.email ? this.email : null,
          status: this.status,
          score: this.score ? this.score : null,
          parentsFirstName: this.parentsFirstName
            ? this.parentsFirstName
            : null,
          parentsLastName: this.parentsLastName ? this.parentsLastName : null,
          otherInfo: this.otherInfo ? this.otherInfo : null,
        };
        this.costomerInfo = costomerInfo;

        // 確認ポップアップ表示
        this.modalFlg = true;
      }
    },
    /**
     * 顧客情報登録ポップアップでOK押下
     */
    registrationOKBtn() {
      const success = () => {
        // 登録完了しましたポップアップ
        this.modalFlg = false;
        this.modalRegistrationCompleteFlg = true;
      };
      const error = () => {
        // 登録失敗しましたポップアップ
        console.log("登録失敗");
      };
      // 顧客登録APIを実行（仮）
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
    gotoTop() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.costomer-info {
  margin: 32px 64px;
}
.costomer-info-title {
  font-size: 32px;
}
.costomer-info-form {
  margin: 16px auto 0;
  font-size: 20px;
  display: table;
  text-align: center;
  vertical-align: middle;
}
.form-row {
  display: table-row;
  margin-bottom: 8px;
  height: 10px;
}
.form-cell {
  display: table-cell;
}
.other-textarea {
  width: 100%;
  height: 50px;
}
.registrationVerification {
  margin: 0 auto 16px;
  display: table;
}
.errorMsg {
  color: red;
}
</style>
