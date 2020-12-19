var firebaseConfig = {
	apiKey: "AIzaSyBgK4ZLhlKD4vvqqAmxHPXPOkW02_3MBDw",
	authDomain: "bitrupt-trainee-web.firebaseapp.com",
	databaseURL: "https://bitrupt-trainee-web-default-rtdb.firebaseio.com",
	projectId: "bitrupt-trainee-web",
	storageBucket: "bitrupt-trainee-web.appspot.com",
	messagingSenderId: "151546755005",
	appId: "1:151546755005:web:f459ab08f7fd0f13b6c4d4",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

const signOut = document.getElementById("logout-btn");

signOut.onclick = function () {
	firebase
		.auth()
		.signOut()
		.then(function () {
			console.log("signed out");
			document.location = "./index.html";
		})
		.catch(function (error) {
			alert("Failed to logout. Check your connection");
		});
};
