"use strict";
const aws = require("aws-sdk");
const docClient = new aws.DynamoDB.DocumentClient();
const CUSTOMER_TABLE = "customerTable";

exports.handler = async (event) => {
  try {
    const body = event.body;
    if (validateColumn(body)) {
      return createResponse(400, "Varidate Error");
    }
    try {
      await updateCustomer(body);
    } catch (e) {
      console.log(e);
      return createResponse(400, "Bad Request");
    }
    return createResponse(200, "success");
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
async function updateCustomer(request) {
  let updateAt = new Date();
  var params = {
    TableName: CUSTOMER_TABLE,
    Key: {
      userId: request.userId,
    },
    ExpressionAttributeNames: {
      "#fn": "firstName",
      "#ln": "lastName",
      "#a": "age",
      "#g": "gender",
      "#pn": "phoneNumber",
      "#e": "email",
      "#cs": "customerStatus",
      "#pfn": "parentFirstName",
      "#pln": "parentLastName",
      "#s": "score",
      "#oi": "otherInfo",
      "#ua": "updateAt",
    },
    ExpressionAttributeValues: {
      ":fn": request.firstName,
      ":ln": request.lastName,
      ":a": request.age.toString(),
      ":g": request.gender,
      ":pn": request.phoneNumber,
      ":e": request.email,
      ":cs": request.customerStatus,
      ":pfn": request.parentFirstName,
      ":pln": request.parentLastName,
      ":s": request.score,
      ":oi": request.otherInfo,
      ":ua": updateAt.toLocaleString(),
    },
    UpdateExpression:
      "SET #fn = :fn, #ln = :ln, #a = :a, #g = :g, #pn = :pn, #e = :e, #cs = :cs, #pfn = :pfn, #pln = :pln, #s = :s, #oi = :oi, #ua = :ua",
  };
  try {
    await dynamoUpdateItem(params);
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
function dynamoUpdateItem(params) {
  try {
    return new Promise((resolve, reject) => {
      docClient.update(params, function (err, data) {
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
