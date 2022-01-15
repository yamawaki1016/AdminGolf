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
    createCostomer(state, { costomerInfo, success }) {
      // TODO: 今後APIに処理を置き換え
      // ユーザーIDと作成日時を追加
      const id = new Date().getTime().toString();
      costomerInfo.userId = id;
      costomerInfo.createdAt = moment().format();

      // ローカルストレージから最新の顧客リストを取得
      const costomerList = localStorage.getItem(
        LOCAL_STORAGE_KEYS.costomerList
      );
      let parsedCostomerList;
      if (costomerList) {
        // 取得できた場合のみパース
        parsedCostomerList = JSON.parse(costomerList);
      } else {
        // 取得できない場合は作成
        parsedCostomerList = [];
      }
      // 顧客リストに新規ユーザーを追加
      parsedCostomerList.push(costomerInfo);
      // ローカルストレージ更新
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.costomerList,
        JSON.stringify(parsedCostomerList)
      );
      success();
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
      }).then((res) => {
        if (res.data.statusCode == 200) {
          success(res.data.body);
        } else {
          error();
        }
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
    deleteCostomer(state, { success, error, costomerInfo }) {
      // TODO: 今後APIに処理を置き換え
      // ローカルストレージから最新の顧客リストを取得
      const costomerList = localStorage.getItem(
        LOCAL_STORAGE_KEYS.costomerList
      );
      if (costomerList) {
        // 取得できた場合のみパース
        const parsedCostomerList = JSON.parse(costomerList);
        // 顧客リストから該当の情報を削除
        const filterCostomerList = parsedCostomerList.filter((record) => {
          if (record.userId != costomerInfo.userId) {
            return record;
          }
        });
        // ローカルストレージ更新
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.costomerList,
          JSON.stringify(filterCostomerList)
        );
        success();
      } else {
        // 取得できない場合はerror
        error();
      }
    },
  },
  modules: {},
});
