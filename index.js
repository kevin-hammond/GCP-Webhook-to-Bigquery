const { BigQuery } = require("@google-cloud/bigquery");
const crypto = require("crypto");

// Initialize BigQuery
const bigquery = new BigQuery();

// Specify the dataset and table
const DATASET_ID = "dataset_id";
const TABLE_ID = "table_id";

exports.handleWebhook = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const webhookData = req.body;
    console.log("Received webhook data:", webhookData);

    // Generate a unique ID
    const id = crypto.randomUUID();

    // Prepare the row to be inserted
    const row = {
      id: id,
      timestamp: BigQuery.timestamp(new Date()),
      content: JSON.stringify(webhookData),
    };

    // Insert data into BigQuery
    await bigquery.dataset(DATASET_ID).table(TABLE_ID).insert(row);

    console.log("Data stored in BigQuery with ID:", id);

    res.status(200).send("Webhook received and data stored successfully");
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Error processing webhook");
  }
};
