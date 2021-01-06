function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
      
}

class Task {
    constructor(name) {
        if (typeof name === 'string') {
            this.taskName = name
            this.id = uuid()
        }
    }

}

class ToDo {
    constructor(data, tasks_div) {
        if (typeof data !== "object" || data == null) {
            this.data = []
        } else {
            this.data = data
            this.tasks_div = tasks_div
            this.load_and_display()
        }
        console.log("this.data: ",this.data)
    }

    clear() {
        this.data = []
    }

    del(task, div) {
        // del from data
        // let pos = this.data.map(function(e) { return e.id}).indexOf(task.id)
        let pos = this.data.indexOf(task)
        this.data.splice(pos,1)
        this.updateLocalData()

        // del from GUI:
        div.remove()
        
    }

    add(task) {
        // update data:
        this.data.push(task)
        this.updateLocalData()

        // add to GUI:
        this.tasks_div.appendChild(this.make_div(task))


    }

    updateLocalData() {
        localStorage.setItem('data', JSON.stringify(this.data))
    }

    load_and_display() {
        // display in gui
        this.data.forEach(element => {
            this.tasks_div.appendChild(this.make_div(element))
        });
    }

    make_div(task) {
        var _this = this;
        let task_div = document.createElement("DIV")
        // div the id:
        // let uuid = document.createAttribute("uuid")
        // uuid.value = task.id
        // task_div.setAttributeNode(uuid)
        task_div.id = task.id

        let span_div = document.createElement("SPAN")
        let del_button_div = document.createElement("BUTTON") 
        del_button_div.textContent = "Remove"

        span_div.innerText = task.taskName
        del_button_div.addEventListener("click", (e) => {
            _this.del(task, task_div)
        });
        task_div.appendChild(span_div)
        task_div.appendChild(del_button_div)
        return task_div
    }

}

const add_button = document.querySelector("#add_button")
const text_field = document.querySelector("#input_field")
const tasks_div = document.querySelector("#tasks")

var data = JSON.parse(localStorage.getItem('data'))
console.log("my data", data)

var toDo = new ToDo(data,tasks_div);

add_button.addEventListener("click", (e) => {
    if (text_field.value !== "") {
        let task = new Task(text_field.value)
        toDo.add(task)

    }
})

