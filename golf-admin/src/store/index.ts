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
    getCostomerList({ state }, { success, error }) {
      // TODO: 今後APIに処理を置き換え
      // ローカルストレージから最新の顧客リストを取得
      const costomerList = localStorage.getItem(
        LOCAL_STORAGE_KEYS.costomerList
      );
      let parsedCostomerList;
      if (costomerList) {
        // 取得できた場合のみパース
        parsedCostomerList = JSON.parse(costomerList);
        success(parsedCostomerList);
      } else {
        // 取得できない場合は作成
        error();
      }
    },
    deleteCostomer({ state }, { success, error, costomerInfo }) {
      // TODO: 今後APIに処理を置き換え
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
      // 顧客リストから該当の情報を削除
      const filterCostomerList = parsedCostomerList.filter((record: any) => {
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
    },
    debugSetCostomer({ state }) {
      // TODO: 今後APIに処理を置き換え
      // ローカルストレージから既存の顧客リストを削除
      localStorage.removeItem(LOCAL_STORAGE_KEYS.costomerList);
      const setList = [
        {
          firstName: "ユーザー",
          lastName: "001",
          age: 21,
          gender: "男性",
          phoneNumber: "00000000001",
          email: "user001@gmail.com",
          status: "メンバー",
          score: "101",
          parentsFirstName: "p",
          parentsLastName: "001",
          otherInfo: null,
          userId: "00000001",
          createAt: "2021-12-05T17:36:16+09:00",
        },
        {
          firstName: "ユーザー",
          lastName: "002",
          age: 22,
          gender: "男性",
          phoneNumber: "00000000002",
          email: "user002@gmail.com",
          status: "メンバー",
          score: "102",
          parentsFirstName: "p",
          parentsLastName: "002",
          otherInfo: null,
          userId: "00000002",
          createAt: "2021-12-05T17:36:16+09:00",
        },
        {
          firstName: "ユーザー",
          lastName: "003",
          age: 23,
          gender: "男性",
          phoneNumber: "00000000003",
          email: "user003@gmail.com",
          status: "メンバー",
          score: "103",
          parentsFirstName: "p",
          parentsLastName: "003",
          otherInfo: null,
          userId: "00000003",
          createAt: "2021-12-05T17:36:16+09:00",
        },
        {
          firstName: "ユーザー",
          lastName: "004",
          age: 20,
          gender: "男性",
          phoneNumber: "00000000001",
          email: "user004@gmail.com",
          status: "メンバー",
          score: "104",
          parentsFirstName: "p",
          parentsLastName: "004",
          otherInfo: null,
          userId: "00000004",
          createAt: "2021-12-05T17:36:16+09:00",
        },
        {
          firstName: "ユーザー",
          lastName: "005",
          age: 25,
          gender: "男性",
          phoneNumber: "00000000005",
          email: "user001@gmail.com",
          status: "メンバー",
          score: "105",
          parentsFirstName: "p",
          parentsLastName: "005",
          otherInfo: null,
          userId: "00000005",
          createAt: "2021-12-05T17:36:16+09:00",
        },
      ];
      // ローカルストレージ更新
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.costomerList,
        JSON.stringify(setList)
      );
    },
  },
  modules: {},
});
