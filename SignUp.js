const signupTextBox = document.getElementById("confirm-pass");
signupTextBox.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("sign-up-btn").click();
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

const auth = firebase.auth();
const database = firebase.database();
const ref = database.ref("users");

const signup = document.getElementById("sign-up-btn");

function createUser() {
	const email = document.getElementById("signup-email").value;
	const password = document.getElementById("signup-password").value;
	const user = {
		fullName: document.getElementById("fullname").value,
		contact: document.getElementById("contact").value,
		address: document.getElementById("address").value,
		email: document.getElementById("signup-email").value,
	};
	console.log(email, password);
	auth
		.createUserWithEmailAndPassword(email, password)
		.then((cred) => {
			console.log(cred);
			ref.push(user);
			document.location = "./Home.html";
		})
		.catch((error) => {
			console.log(error);
			alert(error.message);
		});
}

function validate() {
	const fullname = document.getElementById("fullname").value;
	const fullnameArr = fullname.split("");
	const contact = document.getElementById("contact").value;
	const contactArr = contact.split("");
	const address = document.getElementById("address").value;
	const signUpEmail = document.getElementById("signup-email").value;
	const signUpPassword = document.getElementById("signup-password").value;
	const confirmPassword = document.getElementById("confirm-pass").value;
	const passArr = signUpPassword.split("");
	const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const numbers = /\d/;
	const capLetter = /[A-Z]/;
	const symbols = /[-\/:-@\[-\`{-~!]/;

	console.log(fullname, contact, signUpPassword, signUpEmail);

	if (
		fullname == "" ||
		contact == "" ||
		address == "" ||
		signUpEmail == "" ||
		signUpPassword == "" ||
		confirmPassword == ""
	) {
		alert("All fields are required");
		return false;
	}

	if (fullnameArr[0] != fullnameArr[0].toUpperCase()) {
		alert("First letter of your name should be capital");
		return false;
	}

	if (contactArr.length < 11) {
		alert("Enter a valid phone no");
		return false;
	}

	if (!signUpEmail.match(emailFormat)) {
		alert("Please enter a valid Email address");
		return false;
	}

	if (
		passArr.length < 8 ||
		!numbers.test(signUpPassword) ||
		!capLetter.test(signUpPassword) ||
		!symbols.test(signUpPassword)
	) {
		alert(
			"Password must be minimum of 8 characters length with a number, capital letter and special charater included"
		);
		return false;
	}
	if (confirmPassword != signUpPassword) {
		alert("Password do not match");
	} else {
		createUser();
	}
}

signup.onclick = function () {
	validate();
};
