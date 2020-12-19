const loginTextBox = document.getElementById("login-password");
loginTextBox.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("sign-in-btn").click();
	}
});

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

const signIn = document.getElementById("sign-in-btn");

signIn.onclick = function () {
	var email = document.getElementById("login-email").value;
	var password = document.getElementById("login-password").value;
	console.log(email);
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((user) => {
			document.location = "./Home.html";
		})
		.catch((error) => {
			var errorMessage = error.message;
			alert(errorMessage);
		});
};
