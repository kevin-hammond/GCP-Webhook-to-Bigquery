# Webhook Handler Function Documentation

## Overview

This Google Cloud Function handles incoming webhook requests and stores the data in BigQuery.

**Function URL**: `https://us-central1-gcp-webhook-tutorial.cloudfunctions.net/webhook-parse`

## Functionality

1. Receives POST requests with webhook data
2. Generates a unique ID for each request
3. Stores the received data in a BigQuery table

## Technical Details

- **Runtime**: Node.js
- **Method**: POST only
- **BigQuery Dataset**: `dataset_id`
- **BigQuery Table**: `table_id`

## Request Format

- Method: POST
- Content-Type: application/json
- Body: JSON object (any valid JSON structure)

## Response

- Success (200 OK): "Webhook received and data stored successfully"
- Method Not Allowed (405): "Method Not Allowed"
- Server Error (500): "Error processing webhook"

## BigQuery Data Structure

The function stores the following information in BigQuery:

| Column    | Type      | Description                              |
| --------- | --------- | ---------------------------------------- |
| id        | STRING    | Unique identifier (UUID)                 |
| timestamp | TIMESTAMP | Time when the webhook was received       |
| content   | STRING    | JSON string of the received webhook data |

## Error Handling

- Logs errors to Cloud Functions logs
- Returns a 500 status code for any processing errors

## Usage Example

```bash
curl -X POST -H "Content-Type: application/json" -d '{"key": "value"}' https://us-central1-gcp-webhook-tutorial.cloudfunctions.net/webhook-parse
```

## Notes

- Ensure the function has proper permissions to write to the specified BigQuery dataset and table.
- Monitor the function's logs for any errors or issues in processing.
