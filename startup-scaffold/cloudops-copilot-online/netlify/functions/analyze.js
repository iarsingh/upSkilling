"use strict";

const { analyzeIncident } = require("../../api/_analysis");

exports.handler = async function handler(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Use POST /api/analyze" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(analyzeIncident(body.type, body.text))
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid analysis request", detail: error.message })
    };
  }
};

