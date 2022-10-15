// get form data on form submit,
// store that data in a global array
// careate a display function to disply all the data from array to our entry list

let taskList = [];
let badList = [];

// create a constatnt to store the total hours
const hrPerWeek = 24 * 7;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hr = +frmData.get("hr");

  //got the data from the user and created a new object woth the input data
  const obj = {
    task,
    hr,
  };

  // to check the toral amount of hours as enterd by the users
  const toatalAllocatedHrs = totalTaskHours() + totalBadTaskHours();

  // added totalbadhours to incliude the hours in the badlist
  // + hrs to calculate the toaral hours from the user and the previous hour
  if (toatalAllocatedHrs + hr > hrPerWeek)
    return alert("Sorry, cant add more than hrs Perweek exceded");

  // Push the created object into the array tasklist
  taskList.push(obj);
  console.log(taskList);

  // Call the display and total task function
  displayTasks();
  totalTaskHours();
};

const displayTasks = () => {
  // Using the templetate literal and looping through our array to get the value from the array and display them

  // Let the string value to convert the string into the innerHTML

  let str = "";
  // Running map to loop through the array
  taskList.map((item, index) => {
    console.log(item, index);
    str += `<tr>
    <td>${index + 1}</td>

    
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
      <button onclick="deleteTask(${index})" class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button  onclick="markAsNotToDO(${index})" class="btn btn-success">
        <i class="fa-solid fa-right-long"></i>
      </button>
    </td>
  </tr>`;
  });
  // Passing the string value to the getelementbyId
  document.getElementById("task-list").innerHTML = str;
};

// Function to caluclate the total hours
const totalTaskHours = () => {
  // Using reduce in the array to get the total hours from the array tasklist
  const total = taskList.reduce((subTotal, item) => subTotal + item.hr, 0);

  document.getElementById("totalHrs").innerText = total + totalBadTaskHours();
  return total;
};
// Function to caluclate the total hours
const totalBadTaskHours = () => {
  // Using reduce in the array to get the total hours from the array tasklist
  const total = badList.reduce((subTotal, item) => subTotal + item.hr, 0);

  document.getElementById("totalBadHr").innerText = total;
  return total;
};

const deleteTask = (index) => {
  // window.confirm gives false when the cancel button sic clicked by the not function makes it true which then enters the true condition and return from the fuction
  if (!window.confirm("Are you sure you want to delete this task")) return;
  // console.log(index);

  // filter filters the array as per the codtion as return the value in array
  taskList = taskList.filter((item, i) => i !== index);

  displayTasks();
  totalTaskHours();
};

const markAsNotToDO = (i) => {
  // splice changes the original
  const itm = taskList.splice(i, 1);

  // splice gives the final result in an array

  // [0] syntax to get the object from the array
  badList.push(itm[0]);

  // console.log(badList);
  displayTasks();
  displayBadList();
};

const displayBadList = () => {
  let str = "";
  badList.map((item, index) => {
    str += `<tr>
    <td>1</td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
      <button onclick="markAsToDo(${index})" class="btn btn-warning">
        <i class="fa-solid fa-left-long"></i>
      </button>
      <button onclick="deleteBadList(${index})" class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>`;
  });

  document.getElementById("bad-task").innerHTML = str;
  totalBadTaskHours();
};

const markAsToDo = (i) => {
  const itmbad = badList.splice(i, 1);
  taskList.push(itmbad[0]);

  displayBadList();
  displayTasks();
};
const deleteBadList = (index) => {
  if (!window.confirm("Are you sure you want to delete this task")) return;
  badList = badList.filter((item, i) => !i == index);
  displayBadList();
  totalTaskHours();
};
