const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// exports.getAllPosts = functions.https.onRequest(async(request, response) => {
     
//       const posts = snapshots.doc.map(snapshot=>({uid:snapshot.uid,...snapshot.data()}))
//       response.json({posts}) 
//   });

  exports.getAllPosts = functions.https.onRequest(async(request, response)=> {
    const snapshots = await admin.firestore().collection('posts').get()
    const posts = snapshots.doc.map(snapshot=>({uid:snapshot.uid,...snapshot.data()}))
    response.json({posts}) 
  });