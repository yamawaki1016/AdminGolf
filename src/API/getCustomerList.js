"use strict";
const aws = require("aws-sdk");
const docClient = new aws.DynamoDB.DocumentClient();
const CUSTOMER_TABLE = "customerTable";

exports.handler = async (event) => {
  try {
    // DynamoDB scanで必要なパラメータ
    let params = {
      TableName: CUSTOMER_TABLE, // テーブル名
    };
    let customerList = await dynamoScanItem(params);
    return createResponse(200, customerList);
  } catch (e) {
    console.log(e);
    return createResponse(500, "Internal Server Error");
  }
};

function createResponse(code, body) {
  return {
    statusCode: code,
    body: body,
  };
}
/**
 * DynamoDB Scan Method
 * TODO : 共通化
 * @param {*} obj クエリ
 * @returns
 */
function dynamoScanItem(params) {
  try {
    return new Promise((resolve, reject) => {
      docClient.scan(params, function (err, data) {
        if (err) {
          reject(err, err);
        } else {
          resolve(data.Items);
        }
      });
    });
  } catch (e) {
    throw e;
  }
}
