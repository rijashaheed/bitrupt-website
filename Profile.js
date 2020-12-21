const ref = database.ref("tasks");
const taskButton = document.getElementById("add-task-btn");
const table = document.getElementById("profile-table");
const editTaskButton = document.getElementById("edit-task-btn");
const deleteTaskButton = document.getElementById("delete-task-btn");
const tableBody = document.getElementById("profile-table-body");
var noOfRows = table.rows.length;
var row, rowId;

function retrieveData() {
	//function to retrieve task

	var userId = firebase.auth().currentUser.uid;
	// var noOfRows = table.rows.length;
	var keysArray = [];

	console.log(firebase.auth().currentUser);
	console.log(ref);

	ref
		.orderByChild("userId")
		.equalTo(userId)
		.once("value", function (snapshot) {
			snapshot.forEach(function (childSnapshot) {
				var task = childSnapshot.val().name;
				var description = childSnapshot.val().description;
				var status = childSnapshot.val().status;
				key = childSnapshot.key;
				keysArray.push(key);
				tableBody.insertAdjacentHTML(
					"beforeend",
					`<tr id="${key}" data-toggle="modal" data-target="#editTaskModal"><td>${task}</td><td>${description}</td><td>${status}</td></tr>`
				);
				noOfRows = noOfRows + 1;
				console.log("retrievefunc", noOfRows);
				selectTask(noOfRows);
				// console.log("key", key);
			});
		});
}

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		retrieveData();
	}
});

function selectTask(noOfRows) {
	//function to select task
	console.log(noOfRows);
	var selectedRow;
	console.log("editfunc", noOfRows);
	for (var i = 2; i < noOfRows; i++) {
		table.rows[i].onclick = function (event) {
			selectedRow = this.rowIndex;
			// console.log(row);
			row = selectedRow;
			console.log("row", row);
			rowId = event.target.parentNode.id;
			console.log(event.target.parentNode.id);
			document.getElementById("edited-task").value =
				table.rows[row].cells[0].innerHTML;
			document.getElementById("edited-description").value =
				table.rows[row].cells[1].innerHTML;
			document.getElementById("edited-status").value =
				table.rows[row].cells[2].innerHTML;
		};
	}
}

deleteTaskButton.onclick = function () {
	//function to delete task
	table.deleteRow(row);
	firebase.database().ref(`/tasks/${rowId}/`).remove();
	console.log("deleted from fir");
};

editTaskButton.onclick = function () {
	//function to edit task
	var task = table.rows[row].cells[0];
	var description = table.rows[row].cells[1];
	var status = table.rows[row].cells[2];
	var editedName = document.getElementById("edited-task");
	var editedDescription = document.getElementById("edited-description");
	var editedStatus = document.getElementById("edited-status");
	const updatedTask = {
		name: editedName.value,
		description: editedDescription.value,
		status: editedStatus.value,
	};
	task.innerHTML = editedName.value;
	description.innerHTML = editedDescription.value;
	status.innerHTML = editedStatus.value;
	console.log("select", rowId);
	firebase.database().ref(`/tasks/${rowId}/`).update(updatedTask);
	console.log(updatedTask);
};

taskButton.onclick = function () {
	//create task function

	const tableBody = document.getElementById("profile-table-body");
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
	ref.push(task);

	var taskKey = firebase.database().ref("tasks").push().key;

	console.log(taskKey);
	tableBody.insertAdjacentHTML(
		"beforeend",
		`<tr id=${taskKey} data-toggle="modal" data-target="#editTaskModal"><td>${task.name}</td><td>${task.description}</td><td>${task.status}</td></tr>`
	);

	rowId = taskKey;
	console.log("rowId", rowId);

	taskName.value = "";
	taskDescription.value = "";
	taskStatus.value = "";

	noOfRows = noOfRows + 1;
	selectTask(noOfRows);
};
