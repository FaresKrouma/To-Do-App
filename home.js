const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    addNote();
})
function addNote() {
    if(input.value !== "") {
        const todoEl = document.createElement("li");
        todoEl.textContent = input.value;
        list.appendChild(todoEl);
        todoEl.addEventListener("click", ()=> {
            todoEl.classList.toggle("completed");
            updateLS();
        })
        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        })
        input.value = ""
    }
    updateLS();
}
function updateLS() {
    const listItems = document.querySelectorAll("li");
    let items = [];
    
    listItems.forEach((item) => {
        items.push({
            text: item.textContent,
            completed: item.classList.contains("completed")
        });
    });
    localStorage.setItem("todos", JSON.stringify(items))
};
function fetchLS() {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos !== null) {
        todos.forEach(function(element) {
            const todoEl = document.createElement("li");
            todoEl.innerHTML = element.text
            if (element.completed) {
                todoEl.classList.add("completed")
            }
            list.appendChild(todoEl)
            todoEl.addEventListener("click", ()=> {
                todoEl.classList.toggle("completed");
                updateLS();
            })
            todoEl.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                todoEl.remove();
                updateLS();
            })
        })
    }
}
fetchLS();
