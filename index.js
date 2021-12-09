var AWS = require("aws-sdk");
// Set the region 
AWS.config.update({region: 'us-east-2'});
// Create an SQS service object

console.log("Region: ", AWS.config.region);

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
    QueueName: 'swvl-saas.fifo'
  };
  
  sqs.getQueueUrl(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.QueueUrl);
    }
  });