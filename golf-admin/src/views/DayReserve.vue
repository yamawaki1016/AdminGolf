<template>
  <div class="adminTop">
    <div class="day-reserve">
      <div class="day-reserve-date">
        {{ getDay + "のご予約" }}
      </div>
      <div class="day-reserve-info">
        <div class="flex mb-16 border-b">
          <div class="day-reserve-r-info-title" id="name-id">氏名</div>
          <div class="day-reserve-r-info-title" id="reserve-time-id">
            予約時間
          </div>
          <div class="day-reserve-r-info-title" id="spot-id">場所</div>
          <div class="day-reserve-r-info-title" id="calte">カルテ</div>
        </div>
        <div
          v-for="reserveUser in reserveUserList"
          :key="reserveUser.index"
          class="reserveUser"
        >
          <!-- 氏名 -->
          <div
            class="day-reserve-info-colum"
            id="name-id"
            @click="addLestenInfoModal(reserveUser)"
          >
            {{ reserveUser.name }}
          </div>
          <!-- 予約時間 -->
          <div
            class="day-reserve-info-colum"
            id="reserve-time-id"
            @click="addLestenInfoModal(reserveUser)"
          >
            {{ reserveUser.reserveTime }}
          </div>
          <!-- 受講場所 -->
          <div
            class="day-reserve-info-colum"
            id="spot-id"
            @click="addLestenInfoModal(reserveUser)"
          >
            {{ reserveUser.spot }}
          </div>
          <!-- カルテ登録 -->
          <div
            class="day-reserve-info-colum"
            id="calte"
            @click="addLestenInfoModal(reserveUser)"
          >
            カルテ登録
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="modalFlg" @close="modalFlg = false">
      <template v-slot:header>
        <div class="bold mb-16 border-b">{{ selectedUserInfo.name }}</div>
      </template>
      <template v-slot:body>
        <div>
          <div class="mb-16">
            <div class="left">レッスン内容</div>
            <div class="center">アプローチ/打ちっぱなし</div>
          </div>
          <div class="mb-16">
            <div class="left">レッスン結果</div>
            <div class="center">
              <textarea
                class="lesten-textarea"
                placeholder="レッスン結果を入力してください。"
              ></textarea>
            </div>
          </div>
          <div class="mb-16">
            <div class="left">次回予定日</div>
            <div class="center">22/12/15</div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="border-t mb-16">上記内容で登録しますか？</div>
        <div class="relative mt-32">
          <SquareBotton
            class="cancel-botton"
            title="キャンセル"
            @click-btn="cancelListenInfoModal()"
          />
          <SquareBotton
            class="ok-botton"
            title="登録"
            @click-btn="cancelListenInfoModal()"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import SquareBotton from "@/components/SquareBotton.vue";
export default {
  name: "AdminDayReserve",
  components: { Modal, SquareBotton },
  data() {
    return {
      modalFlg: false,
      reserveUserList: [
        {
          name: "受講者1",
          reserveTime: "10:00",
          spot: "福知山東ゴルフクラブ",
        },
        {
          name: "受講者2",
          reserveTime: "12:00",
          spot: "にしきゴルフクラブ",
        },
        {
          name: "受講者3",
          reserveTime: "14:00",
          spot: "篠山ゴルフクラブ",
        },
      ],
      selectedUserInfo: null,
    };
  },
  computed: {
    getDay() {
      let date = new Date();
      let dateMonth = date.getMonth();
      let dateDay = date.getDate();
      return dateMonth + "/" + dateDay;
    },
  },
  methods: {
    gotoAdminUserInfo() {
      this.$router.push("UserInfo");
    },
    addLestenInfoModal(info) {
      this.selectedUserInfo = info;
      this.modalFlg = true;
    },
    cancelListenInfoModal() {
      this.modalFlg = false;
      this.selectedUserInfo = null;
    },
  },
};
</script>
<style scoped>
.adminTop {
  margin: 50px 0;
}

.day-reserve-date {
  margin: 32px 64px;
  text-align: center;
  font-size: 40px;
}
.day-reserve-info {
  margin: 24px;
  border-radius: 20px;
  padding: 24px;
  background-color: rgb(201, 201, 201);
  /* color: white; */
  font-weight: bold;
}
.reserveUser {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  transition: all 0.3s ease-in-out;
}
.reserveUser:hover {
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.45);
}
#name-id {
  width: 25%;
}
#reserve-time-id {
  width: 15%;
}
#spot-id {
  width: 45%;
}
#calte {
  width: 15%;
}
.lesten-textarea {
  width: 80%;
  height: 50px;
}
.cancel-botton {
  position: absolute;
  bottom: 0;
  left: 0;
}
.ok-botton {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>