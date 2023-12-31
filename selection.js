let category = ["Latest News", "World", "Politics", "Sports", "Entertainment", "Technology", "Business", "Health", "Science", "Food"];

let toggleVar = [true, false, false, false, false, false, false, false, false, false];

let currentCategory = null;

// Retrive data of userpreference
if (localStorage.getItem("userPreference_Category") != null)
    toggleVar = JSON.parse(localStorage.getItem("userPreference_Category"));


function toggle(i, set = false) {
    if (set == false) {
        if (toggleVar[i] == false) {
            document.querySelectorAll(".switch")[i].children[0].style.marginLeft = "28px";
            document.querySelectorAll(".switch")[i].style.backgroundColor = "var(--secondary_color)";
            toggleVar[i] = true;
        }
        else {
            document.querySelectorAll(".switch")[i].children[0].removeAttribute("style");
            document.querySelectorAll(".switch")[i].removeAttribute("style");
            toggleVar[i] = false;
        }
    }
    else {
        if (toggleVar[i] == false) {
            document.querySelectorAll(".switch")[i].children[0].removeAttribute("style");
            document.querySelectorAll(".switch")[i].removeAttribute("style");
        }
        else {
            document.querySelectorAll(".switch")[i].children[0].style.marginLeft = "28px";
            document.querySelectorAll(".switch")[i].style.backgroundColor = "var(--secondary_color)";
        }
    }
}

function savePreference() {
    let isFalseAll = toggleVar.every(item => item === false);
    if (isFalseAll === true)
        toggleVar[0] = true;

    localStorage.setItem("userPreference_Category", JSON.stringify(toggleVar));

    document.getElementById("categoryDiv").innerHTML = "";
    document.getElementById("categoryDiv").innerHTML = `<div id="plus-icon" onclick=showHideCategorySelectionBox()><i class="fa fa-plus" aria-hidden="true"></i></div>`;
    for(let i=0; i<toggleVar.length; i++){

        if(toggleVar[i] === true) {
            let category_id = "category_" + i;
            document.getElementById("categoryDiv").innerHTML += `<div class="category-item" id=` + category_id + ` onclick=focusCategory("` + category_id + `")>` + category[i] + `</div>`
        }
    }
    if(currentCategory == null || toggleVar[currentCategory.slice(9)] == false){
        currentCategory = document.getElementsByClassName("category-item")[0].getAttribute("id");
    }

    focusCategory(currentCategory);
    showHideCategorySelectionBox(false); // It will hide the selection box
    
}

function focusCategory(category_id) {
    if (currentCategory == null)
        document.getElementById(category_id).setAttribute("style", "border-bottom : 4px solid var(--secondary_color); color : var(--secondary_color)");
    else {
        document.getElementById(currentCategory).removeAttribute("style");
        document.getElementById(category_id).setAttribute("style", "border-bottom : 4px solid var(--secondary_color); color : var(--secondary_color)");
        currentCategory = category_id;
    }
    fetchNews(document.getElementById(category_id).innerHTML);
}

function showHideCategorySelectionBox(show=true){
    // Reset Toggle buttons
    for (let i = 0; i < category.length; i++)   
        toggle(i, true);    //Reset toggle buttons as per user preference
    
    if(show == true){
        document.getElementById("categorySelectionBox").setAttribute("style","display : block");
        document.getElementById("main").setAttribute("style","opacity : 0.1;");
    }
    else{
        document.getElementById("categorySelectionBox").setAttribute("style","display : none");
        document.getElementById("main").removeAttribute("style");
    }
}

// For adding toggle buttons
document.getElementById("categorySelectionBox").innerHTML = `<i class="fa fa-times" aria-hidden="true" onclick=showHideCategorySelectionBox(false) style="font-size : 35px; cursor: pointer; margin-left: 100%;"></i>`;
for (let i = 0; i < category.length; i++) {
    document.getElementById("categorySelectionBox").innerHTML +=
        `<div class="categoryDivToggle">
                    <div>`+ category[i] + `</div>
                    <div class="switch" onclick="toggle(`+ i + `)">
                        <div></div>
                    </div>
                </div>`
}
document.getElementById("categorySelectionBox").innerHTML += `<div><button class="btn" id="saveBtn" onclick=savePreference()>Save</button></div>`;

savePreference();