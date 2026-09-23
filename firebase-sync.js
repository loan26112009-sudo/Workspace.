(function () {
  var cfg = {
    apiKey:            'AIzaSyBn•••••••••••••••••••••••••••••••',
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

    ready: function () {
      return new Promise(function (resolve) {
        var unsub = auth.onAuthStateChanged(function (user) {
          unsub();
          resolve(user);
        });
      });
    },

    signIn: function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      return auth.signInWithRedirect(provider);
    },

    getRedirectResult: function () {
      return auth.getRedirectResult();
    },

    signOut: function () {
      return auth.signOut();
    },

    getUser: function () {
      return auth.currentUser;
    },

    // Sauvegarde role + name dans Firestore
    saveSession: function (role, name) {
      var u = auth.currentUser;
      if (!u) return Promise.resolve();
      return db.collection('users').doc(u.uid).set({
        role:      role,
        name:      name || '',
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    },

    // Lit role + name depuis Firestore → retourne { role, name } ou null
    loadSession: function () {
      var u = auth.currentUser;
      if (!u) return Promise.resolve(null);
      return db.collection('users').doc(u.uid).get().then(function (doc) {
        return doc.exists ? doc.data() : null;
      });
    },

    // Restaure la session depuis Firestore dans localStorage
    // Retourne true si la session a été restaurée, false sinon
    restoreSession: function () {
      return this.loadSession().then(function (session) {
        if (session && session.role) {
          localStorage.setItem('ws_role', session.role);
          if (session.name) localStorage.setItem('ws_name', session.name);
          return true;
        }
        return false;
      });
    }
  };
})();
