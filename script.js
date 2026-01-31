/* ===== DOM REFERENCES ===== */
const submit=document.getElementById("btn");
const submiteddata=document.getElementById("studentForm");
const mainvalue=document.getElementById("mainvalue");
const studentid=document.getElementById("studentid");
const studentname=document.getElementById("studentname");
const gmail=document.getElementById("email");
const contact=document.getElementById("contact");

let editIndex=null;

/* ===== VALIDATION ===== */
// Allow only letters in name
studentname.addEventListener("input",function(){
  this.value=this.value.replace(/[^a-zA-Z\s]/g,"");
});

// Allow only digits in contact
contact.addEventListener("input",function(){
  this.value=this.value.replace(/[^0-9]/g,"");
});

/* ===== LOAD DATA FROM LOCAL STORAGE ===== */
let actualdata=JSON.parse(localStorage.getItem("task"))||[];

/* ===== RENDER FUNCTION ===== */
// Dynamically display all student records
function renderData(){
  mainvalue.innerHTML="";

  actualdata.forEach((obj,index)=>{

    let div=document.createElement("div");
    div.className="record-card";

    div.innerHTML=`
      <p><strong>Name:</strong> ${obj.name}</p>
      <p><strong>ID:</strong> ${obj.id}</p>
      <p><strong>Email:</strong> ${obj.gmail}</p>
      <p><strong>Contact:</strong> ${obj.contact}</p>
    `;

    // Edit Button
    const editbtn=document.createElement("button");
    editbtn.innerText="Edit";
    editbtn.className="editbtns";

    editbtn.addEventListener("click",function(){
      studentname.value=obj.name;
      studentid.value=obj.id;
      gmail.value=obj.gmail;
      contact.value=obj.contact;
      submit.innerText="Update";
      editIndex=index;  // remember which record to update
    });

    // Delete Button
    const delBtn=document.createElement("button");
    delBtn.innerText="Delete";
    delBtn.className="editbtns";

    delBtn.addEventListener("click",function(){
      actualdata.splice(index,1);  // remove selected record
      localStorage.setItem("task",JSON.stringify(actualdata));
      renderData();
    });

    div.appendChild(editbtn);
    div.appendChild(delBtn);
    mainvalue.appendChild(div);
  });
}

renderData();

/* ===== FORM SUBMIT ===== */
submiteddata.addEventListener("submit",function(e){
  e.preventDefault();

  // Prevent duplicate ID
  if(editIndex===null){
    let exists=actualdata.some(item=>item.id===studentid.value);
    if(exists){
      alert("Student ID already exists!");
      return;
    }
  }

  let obj={
    name:studentname.value,
    id:studentid.value,
    gmail:gmail.value,
    contact:contact.value
  };

  if(editIndex!==null){
    actualdata[editIndex]=obj; // update record
    editIndex=null;
    submit.innerText="Submit";
  }else{
    actualdata.push(obj); // add new record
  }

  localStorage.setItem("task",JSON.stringify(actualdata));
  renderData();
  submiteddata.reset();
});