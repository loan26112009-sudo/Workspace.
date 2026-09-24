// ── FIREBASE SYNC ─────────────────────────────────────────────────────────────
// Gère l'authentification Google et la synchronisation Firestore.
// Dépend des scripts Firebase compat SDK chargés avant ce fichier.
// ──────────────────────────────────────────────────────────────────────────────
(function () {
  var cfg = {
    apiKey:            'AIzaSyBnDobdEig7sM1_PEfApRtQEHmxwk_s9eU',
    authDomain:        'workspace-60d4e.firebaseapp.com',
    projectId:         'workspace-60d4e',
    storageBucket:     'workspace-60d4e.firebasestorage.app',
    messagingSenderId: '1005183949271',
    appId:             '1:1005183949271:web:80175208b632727c949392'
  };

  firebase.initializeApp(cfg);
  var auth = firebase.auth();
  var db   = firebase.firestore();

  window.FBSYNC = {

    // Résout quand l'état auth initial est connu (user | null)
    ready: function () {
      return new Promise(function (resolve) {
        var unsub = auth.onAuthStateChanged(function (user) {
          unsub();
          resolve(user);
        });
      });
    },

    // Popup Google Sign-In (résultat immédiat, pas de redirect)
    signIn: function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      return auth.signInWithPopup(provider);
    },

    // Gardé pour compatibilité — retourne toujours null avec signInWithPopup
    getRedirectResult: function () {
      return Promise.resolve(null);
    },

    signOut: function () {
      try {
        localStorage.removeItem('ws_gphoto');
        localStorage.removeItem('ws_gname');
        localStorage.removeItem('ws_gemail');
      } catch (e) {}
      return auth.signOut();
    },

    getUser: function () {
      return auth.currentUser;
    },

    // Sauvegarde {role, name} dans Firestore après login par mot de passe
    saveSession: function (role, name) {
      var u = auth.currentUser;
      if (!u) return Promise.resolve();
      return db.collection('users').doc(u.uid).set({
        role:      role,
        name:      name || '',
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    },

    // Charge la session depuis Firestore → {role, name} | null
    loadSession: function () {
      var u = auth.currentUser;
      if (!u) return Promise.resolve(null);
      return db.collection('users').doc(u.uid).get().then(function (doc) {
        return doc.exists ? doc.data() : null;
      });
    },

    // Sauvegarde une valeur arbitraire dans users/{uid}/kv/{key}
    saveData: function (key, value) {
      var u = auth.currentUser;
      if (!u) return Promise.resolve();
      return db.collection('users').doc(u.uid)
        .collection('kv').doc(key)
        .set({ v: value, ts: firebase.firestore.FieldValue.serverTimestamp() });
    },

    // Charge une valeur depuis users/{uid}/kv/{key}
    loadData: function (key) {
      var u = auth.currentUser;
      if (!u) return Promise.resolve(null);
      return db.collection('users').doc(u.uid)
        .collection('kv').doc(key).get()
        .then(function (doc) { return doc.exists ? doc.data().v : null; });
    }
  };
})();
