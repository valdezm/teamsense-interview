const Firestore = require('@google-cloud/firestore');
const { IncomingWebhook } = require('@slack/webhook');
// Use your project ID here
const PROJECTID = 'chromatic-trees-296620';
const COLLECTION_NAME = 'slack-integration';

const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
  // NOTE: Don't hardcode your project credentials here.
  // If you have to, export the following to your shell:
  //   GOOGLE_APPLICATION_CREDENTIALS=<path>
  // keyFilename: './cred/chromatic-trees-296620-d3985c6995ba.json',
});
exports.createCustomer = (event, context) => {
    const message = event.data
      ? Buffer.from(event.data, 'base64').toString()
      : '{}';
      const messageObj = JSON.parse(message);
      // console.log("recieved-message:",message);
      // console.log("context:",context);
      console.log("event:",event);

    const store = messageObj.store
    const eventType = messageObj.event

    const payload = messageObj.payload

    // console.log("store:",store)
    // console.log("eventType:",eventType)
    // console.log("payload:",payload)

    firestore.collection(COLLECTION_NAME)
    .doc(store)
    .get()
    .then(doc => {
      if (!(doc && doc.exists)) {
        // return res.status(404).send({
          console.error('Unable to find the document');
        // });
      }
      const data = doc.data();
      if (!data) {
        // return res.status(404).send({
            console.error('Found document is empty');
        // });
      }
    //   return res.status(200).send(data);
    // console.log(data)
    // x.split(" ").map((x) => {if(x.indexOf('payload.') == 0) return t[x.substring(8)]})
    const outboundMessage = data.events.CUSTOMER_CREATED.message.split(" ").map((word) => {
        return word.indexOf('payload.') == 0 ? "`"+payload[word.substring(8)]+"`" : word;
    }).join(" ")
    
    const webhook = new IncomingWebhook(data.slack_webhook);
    (async () => {
        await webhook.send({
          text: outboundMessage,
        });
      })();

    }).catch(err => {
      console.error(err);
    //   return res.status(404).send({
        // error: 'Unable to retrieve the document',
        // err
    //   });
    });
  };
  
/**
* Retrieve or store a method in Firestore
*
* Responds to any HTTP request.
*
* GET = retrieve
* POST = store (no update)
*
* success: returns the document content in JSON format & status=200
*    else: returns an error:<string> & status=404
*
* @param {!express:Request} req HTTP request context.
* @param {!express:Response} res HTTP response context.
*/
// exports.main = (req, res) => {
//   if (req.method === 'POST') {
//     // store/insert a new document
//     const data = (req.body) || {};
//     const ttl = Number.parseInt(data.ttl);
//     const ciphertext = (data.ciphertext || '')
//       .replace(/[^a-zA-Z0-9\-_!.,; ']*/g, '')
//       .trim();
//     const created = new Date().getTime();

//     // .add() will automatically assign an ID
//     return firestore.collection(COLLECTION_NAME).add({
//       created,
//       ttl,
//       ciphertext
//     }).then(doc => {
//       console.info('stored new doc id#', doc.id);
//       return res.status(200).send(doc);
//     }).catch(err => {
//       console.error(err);
//       return res.status(404).send({
//         error: 'unable to store',
//         err
//       });
//     });
//   }

//   // everything below this requires an ID
//   if (!(req.query && req.query.id)) {
//     return res.status(404).send({
//       error: 'No II'
//     });
//   }
//   const id = req.query.id.replace(/[^a-zA-Z0-9]/g, '').trim();
//   if (!(id && id.length)) {
//     return res.status(404).send({
//       error: 'Empty ID'
//     });
//   }

//   if (req.method === 'DELETE') {
//     // delete an existing document by ID
//     return firestore.collection(COLLECTION_NAME)
//       .doc(id)
//       .delete()
//       .then(() => {
//         return res.status(200).send({ status: 'ok' });
//       }).catch(err => {
//         console.error(err);
//         return res.status(404).send({
//           error: 'unable to delete',
//           err
//         });
//       });
//   }

//   // read/retrieve an existing document by ID
//   return firestore.collection(COLLECTION_NAME)
//     .doc(id)
//     .get()
//     .then(doc => {
//       if (!(doc && doc.exists)) {
//         return res.status(404).send({
//           error: 'Unable to find the document'
//         });
//       }
//       const data = doc.data();
//       if (!data) {
//         return res.status(404).send({
//           error: 'Found document is empty'
//         });
//       }
//       return res.status(200).send(data);
//     }).catch(err => {
//       console.error(err);
//       return res.status(404).send({
//         error: 'Unable to retrieve the document',
//         err
//       });
//     });
// };
