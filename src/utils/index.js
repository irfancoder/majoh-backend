import Firebase from "../firebase";

export function isUserLoggedIn() {
  var userAuth = Firebase.auth().currentUser;
  if (userAuth) {
    return userAuth;
  } else {
    return null;
  }
}
