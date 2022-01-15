import { createStore } from "vuex";
import moment from "moment";
import axios from "axios";
moment.locale("ja");
var api = axios.create();
api.defaults.baseURL =
  "https://qzqwh39h7l.execute-api.ap-northeast-1.amazonaws.com/test/";

const LOCAL_STORAGE_KEYS = {
  costomerList: "costomerList",
};

export default createStore({
  state: {},
  mutations: {},
  actions: {
    /**
     * 顧客情報作成
     * @param costomerInfo 追加対象の顧客情報
     * @param success 成功時処理
     * @param error 失敗時処理
     */
    async createCostomer(state, { costomerInfo, success, error }) {
      await api
        .post("/customer", { body: costomerInfo })
        .then((res) => {
          if (res.data.statusCode == 200) {
            success();
          } else {
            error();
          }
        })
        .catch((e) => {
          console.log(e);
          error();
        });
    },
    /**
     * 顧客一覧取得
     * @param param0
     * @param param1
     */
    async getCostomerList(state, { success, error }) {
      await api({
        url: "customer",
        method: "get",
        params: null,
      })
        .then((res) => {
          if (res.data.statusCode == 200) {
            success(res.data.body);
          } else {
            error();
          }
        })
        .catch((e) => {
          console.log(e);
          error();
        });
    },
    /**
     * 顧客情報更新
     * @param param0
     * @param param1
     */
    updateCostomerInfo(state, { success, error, costomerInfo }) {
      // TODO: 今後APIに処理を置き換え
      // ローカルストレージから最新の顧客リストを取得
      const costomerList = localStorage.getItem(
        LOCAL_STORAGE_KEYS.costomerList
      );
      if (costomerList) {
        // 取得できた場合のみパース
        const parsedCostomerList = JSON.parse(costomerList);
        // 顧客IDの一致するユーザーを更新
        const updatedCostomerList = parsedCostomerList.map((record) => {
          if (record.userId == costomerInfo.userId) {
            record = costomerInfo;
          }
          return record;
        });
        // ローカルストレージ更新
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.costomerList,
          JSON.stringify(updatedCostomerList)
        );
        success();
      } else {
        // 取得できない場合は作成
        console.log("取得エラー");
        error();
      }
    },
    async deleteCostomer(state, { success, error, costomerInfo }) {
      const reqBody = { userId: costomerInfo.userId };
      await api({
        url: "customer",
        method: "delete",
        data: { body: reqBody },
      })
        .then((res) => {
          if (res.data.statusCode == 200) {
            success();
          } else {
            error();
          }
        })
        .catch((e) => {
          console.log(e);
          error();
        });
    },
  },
  modules: {},
});
