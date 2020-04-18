import Firebase from "../firebase";

export function isUserLoggedIn() {
  var userAuth = Firebase.auth().currentUser;
  if (userAuth) {
    return userAuth;
  } else {
    return null;
  }
}

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getLocations() {
  const location = [
    "Piasau",
    "Krokop",
    "Pujut",
    "Padang Kerbau",
    "Town (Bandar Miri)",
    "Senadin",
    "Permyjaya",
    "Tudan",
    "Vista",
    "Lutong",
    "Lambir",
    "Taman Tunku",
    "Lopeng",
    "Morsjaya",
    "Hospital",
    "Riam",
    "Airport",
    "Bumiko",
    "Tanjong",
    "Bekenu",
    "Sibuti",
  ];
  return location;
}
