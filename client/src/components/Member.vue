<template>
  
 <div class="container">
<br><br>

  <div class="row">
    <h4>Manage Member</h4> <br><br>
    <table class="table">
      <tr v-for="(item) in dataArray"
        v-bind:key="item.id"
        v-bind:title="item.firstname" >

        <td class="text-left">
          {{item.firstname}} | 
          {{item.lastname}} | 
          {{item.position}} | 
          {{item.address}} | 
          {{item.allowance}} | 
          {{item.expenses}} | 
          {{item.bank_account}} | 
          {{item.emp_no}} | 
          {{item.belong_to}} | 
          {{item.taxi}} | 
          {{item.etc}}
        </td>
          
<!--
        <td class="text-left">
          {{item.firstname}} 
        </td>
        <td class="text-left">
          {{item.lastname}} 
        </td>
        <td class="text-left">
          {{item.position}} 
        </td>
        <td class="text-left">
          {{item.address}} 
        </td>
        <td class="text-left">
          {{item.allowance}} 
        </td>
        <td class="text-left">
          {{item.expenses}} 
        </td>
        <td class="text-left">
          {{item.bank_account}} 
        </td> -->

        <td style="background: #ddd; width: 160px;">
          <button class="btn btn-info" v-on:click="editData(item.id, item.firstname, item.lastname,item.position,item.address,item.allowance,item.expenses,item.bank_account,item.emp_no,item.belong_to,item.taxi,item.etc )">Edit</button>
          <button class="btn btn-danger" v-on:click="deleteData(item.id)">Delete</button>
        </td>

      </tr>
    </table>

<!-- 
    <paginate
      v-model="dataArray"
      :page-count="20"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'">
    </paginate>

-->


  </div>

<hr style="border:1px solid ;">

  <div class="row">
    <div class="col-md-4 order-md-2 mb-4">
      
    </div>
    <div class="col-md-8 order-md-1">
      <h4 class="mb-3"></h4>

      <form v-on:submit.prevent="addNew" class="needs-validation" novalidate>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">ชื่อ</label>
            <input type="text" class="form-control" v-model="firstname" id="firstName" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="lastName">นามสกุล</label>
            <input type="text" class="form-control" v-model="lastname" id="lastName" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="position">ตำแหน่ง</label>
            <input type="text" class="form-control" v-model="position" id="position" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="address">ที่อยู่</label>
            <input type="text" class="form-control" v-model="address" id="address" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="allowance">เบี้ยเลี้ยง</label>
            <input type="text" class="form-control" v-model="allowance" id="allowance" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="expenses">ค่าที่พัก</label>
            <input type="text" class="form-control" v-model="expenses" id="expenses" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="bank_account">เลขบัญชีธนาคาร</label>
            <input type="text" class="form-control" v-model="bank_account" id="bank_account" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="emp_no">รหัสพนักงาน</label>
            <input type="text" class="form-control" v-model="emp_no" id="emp_no" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="belong_to">สังกัดงาน</label>
            <input type="text" class="form-control" v-model="belong_to" id="belong_to" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>    
          <div class="col-md-6 mb-3">
            <label for="taxi">ค่าแท๊กซี่</label>
            <input type="text" class="form-control" v-model="taxi" id="taxi" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>        
        </div>
        <div class="row">
           
          <div class="col-md-6 mb-3">
            <label for="etc">ค่าใช้จ่ายเบ็ดเตล็ด</label>
            <input type="text" class="form-control" v-model="etc" id="etc" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>        
        </div>

        <hr class="mb-4">
        <button v-if="this.isEdit == false" class="btn btn-primary " type="submit">Add New</button>
        <button v-else v-on:click="updateData()" class="btn btn-primary " type="button" >Update</button>
      </form>
      <br><br><br>
    </div>
  </div>
 </div>

</template>

<script>
import axios from 'axios'

export default {

  data () {
    return {
      dataArray:[],
      isEdit: false,
      is_valid_input: '',
      id: '',
      firstname: '',
      lastname: '',
      position: '',
      address: '',
      allowance: '',
      expenses: '',
      bank_account: '',
      emp_no: '',
      belong_to: '',
      taxi: '',
      etc: '',
      page: 1
      
    }
  },mounted(){
    this.getData()
  },methods : {
    getData(){
      axios.get("/api/member").then(
        (result) => {
          //console.log(result.data)
          this.dataArray = result.data
        },
        (error) => {
          console.error('Error: '+error)
        }
      )
    },
    clearData(){
      this.firstname = ''
      this.lastname = ''
      this.position=''
      this.address=''
      this.allowance=''
      this.expenses=''
      this.bank_account=''
      this.emp_no=''
      this.belong_to=''
      this.taxi=''
      this.etc=''
    },
    addNew(){
      //console.log('addNewTask has fire')
      if(this.firstname == '' || this.lastname == ''){
        this.is_valid_input = ''
      }else{
        this.is_valid_input = 'true'
      }

      axios.post("/api/member", 
        {
          is_valid_input: this.is_valid_input,
          firstname: this.firstname,
          lastname: this.lastname,
          position: this.position,
          address: this.address,
          allowance: this.allowance,
          expenses: this.expenses,
          bank_account: this.bank_account,
          emp_no: this.emp_no,
          belong_to: this.belong_to,
          taxi: this.taxi,
          etc: this.etc
        }
        
      )
      .then((res)=>{
        this.clearData()
        this.getData()
        console.log(res)
      })
      .catch((err)=> {
        console.log("Error : " +err)
      })
    },
    editData(id,firstname, lastname, position, address, allowance, expenses, bank_account, emp_no, belong_to, taxi,  etc){
      this.id = id
      this.firstname = firstname
      this.lastname = lastname
      this.position = position
      this.address = address
      this.allowance = allowance
      this.expenses = expenses
      this.bank_account = bank_account
      this.emp_no = emp_no
      this.belong_to = belong_to
      this.taxi = taxi
      this.etc = etc
      this.isEdit = true
    },
    updateData(){
      //console.log('updateData has fire')
      if(this.firstname == '' || this.lastname == ''){
        this.is_valid_input = ''
      }else{
        this.is_valid_input = 'true'
      }

      axios.put(`/api/member/${this.id}`,{
          is_valid_input: this.is_valid_input,
          firstname: this.firstname,
          lastname: this.lastname,
          position: this.position,
          address: this.address,
          allowance: this.allowance,
          expenses: this.expenses,
          bank_account: this.bank_account,
          emp_no: this.emp_no,
          belong_to: this.belong_to,
          taxi: this.taxi,
          etc: this.etc
        })
      .then((res)=>{
        this.isEdit = false 
        this.clearData()        
        this.getData()
        console.log(res)
      })
      .catch((err)=>{
        console.log("Error : "+ err)
      })
    },
    deleteData(id){
      if(confirm('Confirm delete.'))
      {
        axios.delete(`/api/member/${id}`)
        .then((res)=> {
          this.clearData()
          this.getData()
          //console.log(res)
        })
        .catch((err)=>{
          console.log("Error : "+ err)
        })
      }
    }
    



  } // end ,methods :

}
</script>


<style scoped>

</style>
