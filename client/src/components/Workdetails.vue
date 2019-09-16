<template>

<div class="container">
<br><br>

  <div class="row">
    <h4>Manage Worksheet details</h4> <br><br>
  </div>
  <div class="row">
<br>
<br>



<!-- table for show items details in tb_work_details -->
<v-data-table 
  dense 
  :headers="headers_details" 
  :items="items_details" 
  item-key="id" 
  class="elevation-1" 
  :items-per-page="5" 
  show-select
  >

  <template v-slot:item.dt_go="{ item }">
    <b>{{ item.dt_go }} 1</b>
  </template>

</v-data-table>





  <v-form >  
    <!-- v-model="valid" -->
    <v-container>
      
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="working_report"            
            :counter="255"
            label="รายงานการเดินทาง / รายละเอียดการปฏิบัติงาน"
            required
          ></v-text-field> 
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-checkbox 
            label="รายการนี้คือ รายละเอียดการปฏิบัติงาน?"
            required
            v-model="is_full_row"
          ></v-checkbox>
        </v-col>


      </v-row>



      <v-row>
        <v-col
          cols="12"
          md="2"
        >
 
          <!-- วันที่ออก -->
          <v-menu
        v-model="dialog_date_dt_go"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date_dt_go"
            label="วันที่ออก"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date_dt_go" @input="dialog_date_dt_go = false" locale="th"></v-date-picker>
      </v-menu>
          <!-- วันที่ออก -->

        </v-col>

        <v-col
          cols="12"
          md="1"
        >
          <!-- เวลาออก -->
           <v-dialog
        ref="dialog"
        v-model="modal_time_dt_go"
        :return-value.sync="time_dt_go"
        persistent
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="time_dt_go"
            label="เวลาออก"
            prepend-icon=""
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker          
          v-model="time_dt_go"
          full-width
        >
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="$refs.dialog.save(time_dt_go)">OK</v-btn>
        </v-time-picker>
      </v-dialog>
          <!-- เวลาออก -->
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="go"         
            label="ออกจาก"
            required
          ></v-text-field> 
        </v-col>

<!-- ### group ถึง ### -->
        <v-col
          cols="12"
          md="2"
        >
 
          <!-- วันที่ถึง -->
          <v-menu
        v-model="dialog_date_dt_to"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date_dt_to"
            label="วันที่ถึง"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date_dt_to" @input="dialog_date_dt_to = false" locale="th"></v-date-picker>
      </v-menu>
          <!-- วันที่ถึง -->

        </v-col>

        <v-col
          cols="12"
          md="1"
        >
          <!-- เวลาถึง -->
          <v-dialog
        ref="dialog2"
        v-model="modal_time_dt_to"
        :return-value.sync="time_dt_to"
        persistent
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="time_dt_to"
            label="เวลาถึง"
            prepend-icon=""
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker          
          v-model="time_dt_to"
          full-width
        >
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="$refs.dialog2.save(time_dt_to)">OK</v-btn>
        </v-time-picker>
      </v-dialog> 
          <!-- end เวลาถึง -->
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="to"         
            label="ไปถึง"
            required
          ></v-text-field> 
        </v-col>
<!-- ### end group ถึง ### -->
      </v-row>

      
      <v-row>
        <v-col>
          <div class="text-center ">
            <v-btn class="primary">เพิ่มข้อมูล</v-btn>
          </div>
        </v-col>
      </v-row>


    </v-container>
  </v-form>

    


  </div>

  <hr style="border:1px solid ;">


</div>
  
</template>

<script>
import axios from 'axios'

export default {

  data () {
    return {
      //dataArray:[],
      isEdit: false,
      is_valid_input: '',
      id: '',

      // data for details
      modal_time_dt_go: false,
      dialog_date_dt_go: false,
      time_dt_go: null,
      date_dt_go: null,
      dt_go:'',

      modal_time_dt_to: false,
      dialog_date_dt_to: false,
      time_dt_to: null,
      date_dt_to: null,
      dt_to:'',

      ord:'',
      go:'',
      to:'',
      working_report:'',
      is_full_row:'',
      // data for details

      items_details: [],
      headers_details: [
        // {
        //   text: 'Dessert (100g serving)',
        //   align: 'left',
        //   sortable: false,
        //   value: 'name',
        // },
        { text: 'ออกจาก', value: 'go' },
        { text: 'วัน', value: 'dt_go_date' },
        { text: 'เวลา', value: 'dt_go_time' },
        { text: 'ถึง', value: 'to' },
        { text: 'วัน', value: 'dt_to_date' },
        { text: 'เวลา', value: 'dt_to_time' },
        { text: 'รายงานการเดินทาง และปฏิบัติงาน', value: 'working_report' },
      ],

    }
  },mounted(){
    this.getData()
  },methods : {
    getData(){
      axios.get("/api/workdetails").then(
        (result) => {
          //console.log(result.data)
          this.items_details = result.data
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

      axios.post("/api/workdetails", 
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

      axios.put(`/api/workdetails/${this.id}`,{
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
        axios.delete(`/api/workdetails/${id}`)
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