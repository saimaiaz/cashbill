<template>
 
 <div class="hello">
   <div id="todo-list-example" class="container">
     <div class="row">
       <div class="col-md-6 mx-auto">
          <h1 class="text-center">TODO List App</h1>

          <table class="table">
            <tr v-for="(todo) in todos"
              v-bind:key="todo.id"
              v-bind:title="todo.task_name" >

              <td class="text-left">{{todo.task_name}}</td>
              <td class="text-right">

                <button class="btn btn-info" v-on:click="editTask(todo.task_name, todo.id)">Edit</button>

                <button class="btn btn-danger" v-on:click="deleteTask(todo.id)">Delete</button>

              </td>

            </tr>
          </table>
          <hr>
          <form  v-on:submit.prevent="addNewTask">

            <label for="tasknameinput">Task Name</label>
            <input v-model="taskname" type="text" id="tasknameinput" class="form-control" placeholder="Add new Task" />

            <button v-if="this.isEdit == false" type="submit" class="btn btn-success ">Submit</button>

            <button v-else v-on:click="updateTask()" type="button" class="btn btn-primary ">Update</button>

          </form>
          
       </div>
     </div>
   </div>
 </div>

</template>

<script>
import axios from 'axios'

export default {

  data () {
    return {
      todos:[],
      id: '',
      taskname: '',
      isEdit: false
    }
  },
  mounted(){
    this.getTasks()
  },
  methods: {
    getTasks(){
      axios.get("/api/tasks").then(
        result => {
          console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewTask(){
      console.log('addNewTask has fire')
      axios.post("/api/task", {task_name: this.taskname})
      .then((res)=>{
        this.taskname = ''
        this.getTasks()
      })
      .catch((err)=> {
        console.log("Error : " +err)
      })
    },
    editTask(title, id){
      this.id = id
      this.taskname = title
      this.isEdit = true
    },
    updateTask(){
      console.log('updateTask has fire')
      axios.put(`/api/task/${this.id}`,{
        task_name: this.taskname
      })
      .then((res)=>{
        this.taskname = ''
        this.isEdit = false
        this.getTasks()
        console.log(res)
      })
      .catch((err)=>{
        console.log("Error : "+ err)
      })
    },
    deleteTask(id){
      axios.delete(`/api/task/${id}`)
      .then((res)=> {
        this.taskname = ''
        this.getTasks()
        console.log(res)
      })
      .catch((err)=>{
        console.log("Error : "+ err)
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
