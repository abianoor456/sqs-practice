// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-2'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var queueURL = "https://sqs.us-east-2.amazonaws.com/196770554431/swvl-saas.fifo";
var params = {
   // Remove DelaySeconds parameter and value for FIFO queues
  MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
   MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
   MessageGroupId: "Group1",  // Required for FIFO queues
  QueueUrl: queueURL
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
