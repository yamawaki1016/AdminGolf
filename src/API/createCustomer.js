"use strict";
const aws = require("aws-sdk");
const ddb = new aws.DynamoDB();
const CUSTOMER_TABLE = "customerTable";

exports.handler = async (event) => {
  try {
    const body = event.body;
    if (validateColumn(body)) {
      return createResponse(400, "Varidate Error");
    }
    const requestBody = createCustomerRequest(body);
    try {
      await addCustomer(requestBody);
    } catch (e) {
      console.log(e);
      return createResponse(400, "Bad Request");
    }
    return createResponse(200, requestBody.userId);
  } catch (e) {
    console.log(e);
    return createResponse(500, "Internal Server Error");
  }
};

function createResponse(code, body) {
  return {
    statusCode: code,
    body: JSON.stringify(body),
  };
}
/**
 * バリデーションチェック
 * @param {*} body リクエストボディ
 */
function validateColumn(body) {
  var varidateList = [
    "firstName",
    "lastName",
    "gender",
    "phoneNumber",
    "customerStatus",
  ];
  var checkFlg = false;
  var varidateMsg = "";
  varidateList.forEach((varidate) => {
    if (body[varidate] == null) {
      checkFlg = true;
      varidateMsg = varidateMsg + varidate + "/";
    }
  });
  if (varidateMsg != "") {
    console.log("varidate error : " + varidateMsg);
  }
  return checkFlg;
}
/**
 * DB追加のパラメータ作成
 * 必須項目以外はなければ空文字を格納
 * @param {*} info
 * @returns
 */
function createCustomerRequest(info) {
  // ・顧客ID
  let createAt = new Date();
  let createInfo = {
    userId: getUniqueStr(),
    firstName: info.firstName, // 必須項目
    lastName: info.lastName, // 必須項目
    age: info.age ? info.age : "",
    gender: info.gender, // 必須項目
    phoneNumber: info.phoneNumber, // 必須項目
    email: info.email ? info.email : "",
    customerStatus: info.customerStatus, // 必須項目
    parentFirstName: info.parentFirstName ? info.parentFirstName : "",
    parentLastName: info.parentLastName ? info.parentLastName : "",
    score: info.score ? info.score : "",
    otherInfo: info.otherInfo ? info.otherInfo : "",
    createdAt: createAt.toLocaleString(),
    updateAt: "",
    isDeleted: false,
  };
  return createInfo;
}

async function addCustomer(request) {
  var params = {
    TableName: CUSTOMER_TABLE,
    Item: {
      userId: { S: request.userId },
      firstName: { S: request.firstName },
      lastName: { S: request.lastName },
      age: { S: request.age.toString() },
      gender: { S: request.gender },
      phoneNumber: { S: request.phoneNumber },
      email: { S: request.email },
      customerStatus: { S: request.customerStatus },
      parentFirstName: { S: request.parentFirstName },
      parentLastName: { S: request.parentLastName },
      score: { S: request.score },
      otherInfo: { S: request.otherInfo },
      createdAt: { S: request.createdAt },
      updateAt: { S: request.updateAt },
      isDeleted: { BOOL: request.isDeleted },
    },
  };
  try {
    await dynamoPutItem(params);
  } catch (e) {
    throw e;
  }
}
/**
 * DynamoDB Update Method
 * TODO : 共通化
 * @param {*} obj クエリ
 * @returns
 */
function dynamoPutItem(obj) {
  try {
    return new Promise((resolve, reject) => {
      let params = obj;
      ddb.putItem(params, function (err, data) {
        if (err) {
          reject(err, err);
        } else {
          resolve("updated");
        }
      });
    });
  } catch (e) {
    throw e;
  }
}
/**
 * ユニークな値を生成
 * @param {*} myStrong
 * @returns 12桁の数値文字列
 */
function getUniqueStr(myStrong) {
  var strong = 1000;
  if (myStrong) strong = myStrong;
  var uniqStr =
    new Date().getTime().toString(10) +
    Math.floor(strong * Math.random()).toString(10);
  return uniqStr.slice(-12);
}
