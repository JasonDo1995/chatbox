require("dotenv").config();
//process.dotenv.name

let getHomePage = (req, res) => {
  return res.render("homepage.ejs");
};

// let postWebhook = (req, res) => {
//   let body = req.body;

//   console.log(`\u{1F7EA} Received webhook:`);
//   console.dir(body, { depth: null });
//   // Send a 200 OK response if this is a page webhook

//   if (body.object === "page") {
//     // Returns a '200 OK' response to all requests
//     res.status(200).send("EVENT_RECEIVED");

//     // Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.
//   } else {
//     // Return a '404 Not Found' if event is not from a page subscription
//     res.sendStatus(404);
//   }
// };

// let getWebhook = (req, res) => {
//   // Parse the query params
//   let mode = req.query["hub.mode"];
//   let token = req.query["hub.verify_token"];
//   let challenge = req.query["hub.challenge"];

//   // Check if a token and mode is in the query string of the request
//   if (mode && token) {
//     // Check the mode and token sent is correct
//     if (mode === "subscribe" && token === config.verifyToken) {
//       // Respond with the challenge token from the request
//       console.log("WEBHOOK_VERIFIED");
//       res.status(200).send(challenge);
//     } else {
//       // Respond with '403 Forbidden' if verify tokens do not match
//       res.sendStatus(403);
//     }
//   }
// };
let postWebhook = (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

let getWebhook = (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "isJustRandomString";

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

module.exports = {
  getHomePage: getHomePage,
  postWebhook: postWebhook,
  getWebhook: getWebhook,
};
