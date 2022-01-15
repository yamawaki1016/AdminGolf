"use strict";
const aws = require("aws-sdk");
const docClient = new aws.DynamoDB.DocumentClient();
const CUSTOMER_TABLE = "customerTable";

exports.handler = async (event) => {
  try {
    const body = event.body;
    const userId = body.userId;
    console.log(userId);
    var params = {
      TableName: CUSTOMER_TABLE,
      Key: {
        userId: userId,
      },
    };
    let result = await dynamoDeleteItem(params);
    return createResponse(200, result);
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
 * DynamoDB Delete Method
 * TODO : 共通化
 * @param {*} obj クエリ
 * @returns
 */
function dynamoDeleteItem(params) {
  try {
    return new Promise((resolve, reject) => {
      docClient.delete(params, function (err, data) {
        if (err) {
          reject(err, err);
        } else {
          resolve("success");
        }
      });
    });
  } catch (e) {
    throw e;
  }
}
