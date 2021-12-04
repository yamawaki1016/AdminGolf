import { createStore } from "vuex";
import moment from "moment";

moment.locale("ja");

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
    createCostomer({ state }, { costomerInfo, success, error }) {
      // TODO: 今後APIに処理を置き換え
      // ユーザーIDと作成日時を追加
      const id = new Date().getTime().toString();
      costomerInfo.userId = id;
      costomerInfo.createAt = moment().format();

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
      console.log(parsedCostomerList);
      // ローカルストレージ更新
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.costomerList,
        JSON.stringify(parsedCostomerList)
      );
      success();
    },
  },
  modules: {},
});
