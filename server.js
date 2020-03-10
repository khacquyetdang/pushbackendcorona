const express = require("express");
const webpush = require("web-push");
const cors = require("cors");
const bodyParser = require("body-parser");

const publicKey =
  "BNvwyqX3JmZ1jy-LP-Q7zn4Dhf7wC3uMfytnUaIhDLb5Vp4UhYyiQmRcwC14NxGfxkRlA2zDFb8VRfQUB05YSzw";
const privateKey = "1rKxxhEYYdtT1stc5c2Spa4IDcshshusCjruAYWMlfA";

const app = express();

app.use(cors());
app.use(bodyParser.json());

webpush.setVapidDetails(
  "mailto:khacquyet.dang@gmail.com",
  publicKey,
  privateKey
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const fakeDatabase = [];

app.post("/subscription", (req, res) => {
  const subscription = req.body;
  fakeDatabase.push(subscription);
  console.log(fakeDatabase);
});

app.post("/sendNotification", (req, res) => {
  const notificationPayload = {
    notification: {
      title: "Corona notification title",
      body: "Corona notification Content",
      icon: "assets/icons/icon-512x512.png"
    }
  };

  const promises = [];
  fakeDatabase.forEach(subscription => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    );
  });
  setTimeout(
    Promise.all(promises).then(() => res.sendStatus(200)),
    3000
  );
});
