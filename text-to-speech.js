const AWS = require("aws-sdk");
const fs = require("fs");

const SESConfig = {
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
};

AWS.config.update(SESConfig);

const Polly = new AWS.Polly({
  region: process.env.REGION,
});

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
});

var getRandomKey = function () {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

module.exports = (req, res) => {
  const input = {
    Text: req.body.text,
    OutputFormat: "mp3",
    VoiceId: "Joanna",
  };

  Polly.synthesizeSpeech(input, (err, data) => {
    if (err) throw res.status(404).send(`FAIL: ${err}`);

    if (data.AudioStream instanceof Buffer) {
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: getRandomKey(),
        Body: data.AudioStream,
        ContentType: "audio/mp3",
      };

      s3.upload(params, function (s3Err, data) {
        if (s3Err) throw res.status(404).send(`FAIL: ${s3Err}`);
        res.status(200).send(data.Location);
        return;
      });

      // fs.writeFile("hihi.mp3", data.AudioStream, (fsErr) => {
      //   if (fsErr) {
      //     console.error(err);
      //     return;
      //   }
      //   console.log("success");
      // });
    }
  });
};
