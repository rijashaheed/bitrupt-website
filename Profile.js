const ref = database.ref("tasks");

const taskButton = document.getElementById("add-task-btn");

function retrieveData() {
	const insertTask = document.getElementById("profile-table-body");
	var userId = firebase.auth().currentUser.uid;
	var keysArray = [];

	ref
		.orderByChild("userId")
		.equalTo(userId)
		.once("value", function (snapshot) {
			snapshot.forEach(function (childSnapshot) {
				var task = childSnapshot.val().name;
				var description = childSnapshot.val().description;
				var status = childSnapshot.val().status;
				var key = childSnapshot.key;
				keysArray.push(key);
				console.log(task, description, status);
				insertTask.insertAdjacentHTML(
					"beforeend",
					`<tr><td>${task}</td><td>${description}</td><td>${status}</td></tr>`
				);
			});
		});
}

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		retrieveData();
	}
});

taskButton.onclick = function () {
	const taskName = document.getElementById("task");
	const taskDescription = document.getElementById("description");
	const taskStatus = document.getElementById("status");
	var userId = firebase.auth().currentUser.uid;
	const task = {
		name: taskName.value,
		description: taskDescription.value,
		status: taskStatus.value,
		userId: userId,
	};
	console.log(task);
	ref.push(task);
	taskName.value = "";
	taskDescription.value = "";
	taskStatus.value = "";

	retrieveData();
};
