const AWS = require('aws-sdk');
const zlib = require('zlib');
var output = {};

/**
 * A Lambda function that logs the payload received from S3.
 */
 exports.kinesisHandler = function(event, context) {
  if (event.awslogs && event.awslogs.data) {
    const payload = Buffer.from(event.awslogs.data, 'base64');

    const logevents = JSON.parse(zlib.unzipSync(payload).toString()).logEvents;

    for (const logevent of logevents) {
      const log = JSON.parse(logevent.message);
      var s3 = new AWS.S3();

      var params = {
          Bucket : "<bucketname>",
          Key : log.sessionId + ".json",
          Body : JSON.stringify(log.interpretations)
      }
      s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
    }
  }
};
