var isBtnSelected = false;
const dateDisplay = document.getElementById("dateDisplay");
var btnSelected;
const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const Months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

let date = new Date();
var currYear = date.getFullYear();
var currMonth = date.getMonth();


var todayYear = currYear;
var todayMonth = currMonth;
var todayDay = date.getDate();

const currentDate = document.querySelector(".currentDate");




function renderCalender() {
    const dayTable = document.getElementById("days");
    dayTable.innerHTML = ""
    
    
    currentDate.innerText = Months[currMonth] + " " + currYear;
    var lastDatepfMonth = new Date(currYear, currMonth+1, 0).getDate(); 
    var firstdayofMonth = new Date(currYear, currMonth, 1).getDay();
    let dayTracker = firstdayofMonth;


    let firstRow = dayTable.insertRow(0);
    let row = firstRow;
    rowTracker = 0;
    let cell;


    for(let i = 0; i < firstdayofMonth; i++){
        cell = firstRow.insertCell(i);
        
        var t = document.createTextNode("")
        cell.appendChild(t);
        

    }

    for(let i = 1; i<=lastDatepfMonth; i++){
        cell = row.insertCell(dayTracker);
        

        var btn = document.createElement("button");
        btn.innerHTML = i;
        btn.classList.add("realNum");
        let stringnum = i.toString();
        let stringmonth = currMonth.toString();
        let stringyear = currYear.toString();
        let stringdate = stringyear + " " + stringmonth + " " + stringnum;
        btn.value = stringdate;
        
        cell.appendChild(btn);
        
        
       


        dayTracker++;

        if(dayTracker == 7){
            dayTracker = 0;
            rowTracker++;
            row = dayTable.insertRow(rowTracker);
        }
    } 


    const butns = document.querySelectorAll(".realNum");

    //format: year month day

    let todayDate = todayYear.toString() + " "+  todayMonth.toString() + " " + todayDay.toString();
    //highlight todays date on the calender
    for(let btn of butns){
        
        if(btn.value === todayDate){
            btn.classList.add("today");
            

            if(isBtnSelected == false) {
                btnSelected = btn;
                dateDisplay.innerHTML = todayYear.toString()+ " " + Months[todayMonth] + " " + todayDay.toString();

            }
            
            renderEvents();



            

        }
    }

    


    for(let btn of butns){
        btn.addEventListener("click", (e)=> {

            btnSelected = btn;
            isBtnSelected = true;
            //btnSelected = e.target;
            let dayData = btnSelected.value.split(" ");
            let month = Number(dayData[1]);

           
           dateDisplay.innerHTML = dayData[0] + " " + Months[month]+ " " + dayData[2];

           renderEvents();

          

        });

        

    }

   


    for(let btn of butns) {

        Object.keys(localStorage).forEach(function(key){
            let keySplit = key.split("-");
            if (btn.value === keySplit[0]) {
                btn.style.color ="red";
            }
            });


    }


   


    
}

function renderEvents() {
    var eventDisplay = document.getElementById("eventDisplayh1");
    var eventContainer = document.getElementById("eventWrapper");
    eventContainer.innerHTML = "";
    eventDisplay.textContent = "";
    let date = btnSelected.value.split(" ");
   
    

   
    let realDate = date[0] + " " + Months[Number(date[1])] + " " + date[2];
    eventDisplay.textContent = "Events for " + realDate;

    Object.keys(localStorage).forEach(function(key){
        let keyData = key.split("-");
        


        
        if(keyData[0] === btnSelected.value) {
            let eventData = localStorage.getItem(key).split("_");
            let title = eventData[0];
            let reason = eventData[1];
            let time = eventData[2];


            let div = document.createElement("div");
            div.classList.add("event");

            let h2 = document.createElement("h2");
            h2.innerText = title;
            div.appendChild(h2);

            let p = document.createElement("p");
            p.textContent = reason;
            div.appendChild(p);
            
            let p2 = document.createElement("p2")
            p2.textContent = time;
            div.appendChild(p2);

            let br = document.createElement("br");
            

           


            eventContainer.appendChild(div);

        }
        });


        



}


function test(){
    var counter =1;
    Object.keys(localStorage).forEach(function(key){
    counter++;
    });

    let date = btnSelected.value + "-"+ counter.toString();
    let title = document.forms["addEvent"]["title"].value;
    let reason = document.forms["addEvent"]["reason"].value;
    let time = document.forms["addEvent"]["time"].value;

    let eventdata = title + "_" + reason + "_" + time;

    localStorage.setItem(date,eventdata);

    alert("Event Created");
    document.getElementById("addEvent").reset();

    renderEvents();
    renderCalender();
    

    
}





function prev() {
    currMonth--;
    if(currMonth<0){
        currMonth = 11;
        currYear--;
    }

    document.addEventListener("DOMContentLoaded", renderCalender());
    
   
}

function next(){
    currMonth++;
    if(currMonth == 12) {
        currMonth = 0;
        currYear++;
    }
    
    document.addEventListener("DOMContentLoaded", renderCalender());
}

document.addEventListener("DOMContentLoaded", renderCalender());
