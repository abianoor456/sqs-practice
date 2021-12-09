// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = "https://sqs.us-east-2.amazonaws.com/196770554431/swvl-saas.fifo";

var params = {
 
 MaxNumberOfMessages: 10,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: queueURL,
 VisibilityTimeout: 20,
 WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function(err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };
    console.log(data.Messages);
     sqs.deleteMessage(deleteParams, function(err, data) {
      if (err) {
         console.log("Delete Error", err);
       } else {
         console.log("Message Deleted", data);
       }
     });
  }
  else{
      console.log('No messages')
  }
});
