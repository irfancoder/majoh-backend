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

export function getCategories(){
  const categories = [
    "Vegetable",
    "Poultry & Meat",
    "Fishery"
  ]
  return categories
}

export function getLocations() {
  const location = {
    MIRI: [
      "Piasau",
      "Krokop",
      "Pujut",
      "Padang Kerbau",
      "Bandar Miri",
      "Senadin",
      "Permyjaya",
      "Tudan",
      "Vista",
      "Lutong",
      "Lambir",
      "Taman Tunku",
      "Lopeng",
      "Morsjaya",
      "Hospital Miri",
      "Riam",
      "Airport",
      "Bumiko",
      "Tanjong",
      "Bekenu",
      "Sibuti",
    ],
    KUCHING: [
      "Batu Kawa",
      "Bandar Kuching",
      "Petrajaya",
      "Bintawa",
      "Waterfront",
      "Tabuan Jaya",
      "Padawan",
      "Kota Sentosa",
      "Kampung Stutong",
    ],
    BINTULU: [
      "Parkcity Commerce Square",
      "Kampung Baru Sebuan Besar",
      "Tanjung Kidurong",
      "Medan Mall",
      "Kampung Assyakirin",
    ],
  };
  return location;
}
