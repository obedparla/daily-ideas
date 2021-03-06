import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.app = app;
    this.serverValue = app.database.ServerValue;

    /* Social Sign In Method Provider */
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // *** Auth API ***
  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  signInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  signOut = () => this.auth.signOut();

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // ** Utils **

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  // *** Ideas api *** //

  // Idea store
  userIdeaUrl = (userId, date) => `ideas/${userId}/${date}`;
  ideas = (userId, date) =>
    this.db.ref(`${this.userIdeaUrl(userId, date)}/ideas`);
  ideaTitle = (userId, date) =>
    this.db.ref(`${this.userIdeaUrl(userId, date)}/title`);
  idea = (userId, date, ideaId) =>
    this.db.ref(`${this.userIdeaUrl(userId, date)}/ideas/${ideaId}`);

  // Stats
  ideaStats = (userId, date) => this.db.ref(`ideaStats/${userId}/${date}`);
  userStats = userId => this.db.ref(`ideaStats/${userId}`);
  ideaStatsCount = (userId, date) =>
    this.db.ref(`ideaStats/${userId}/${date}/ideasCount`);
}

export default Firebase;
