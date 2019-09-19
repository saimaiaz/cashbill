<template>

<div class="container">
<br><br>

  <div class="row">
    <!-- <h4>Manage Worksheet details</h4>  -->
    <div class="text-left">
      <v-chip
        class="ma-2 title"
        color="deep-purple accent-4"        
        text-color="white"
      >
      <!-- outlined -->
        <v-icon left>mdi-label</v-icon>
        Manage Worksheet details
      </v-chip>
    </div>
    
    <br><br>
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
  sort-by="ord"
  class="elevation-1 " 
  :items-per-page="5" 
  show-select
  >

  <template v-slot:item="{ item }" >

    <tr v-if="item.is_full_row==1">
      <td>
        <!-- v-model="checkbox1" -->
        <v-checkbox color="red"></v-checkbox> 
      </td>
      <td >
        <v-btn text icon color="red">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn text icon color="red">
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>

      </td>
      <td colspan="7">{{ item.working_report }}</td>
      </tr> 
    
    <tr v-else>
      <td ><v-checkbox color="red"></v-checkbox> </td>
      <td >
        <v-btn text icon color="red">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn text icon color="red">
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>

      </td>
      <td >{{ item.go }}</td>
      <td >{{ item.dt_go_date }}</td>
      <td >{{ item.dt_go_time }}</td>
      <td >{{ item.to }}</td>
      <td >{{ item.dt_to_date }}</td>
      <td >{{ item.dt_to_time }}</td>
      <td >{{ item.working_report }}</td>
      <td >
        <!-- <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            delete
          </v-icon>
        </template> -->
        <template >
          <v-icon small class="mr-2">edit</v-icon>
          <v-icon small>delete</v-icon>
        </template>
      </td>
    </tr> 
    
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
            value="1"     
            color="indigo"       
          ></v-checkbox>
        </v-col>


      </v-row>


      <!-- ################## input date rows -->
      <v-row >
        <v-col
          cols="12"
          md="2" >
 
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
            :disabled="is_full_row==1"
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
            :disabled="is_full_row==1"
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
            :disabled="is_full_row==1"
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
            :disabled="is_full_row==1"
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
            :disabled="is_full_row==1"
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
            :disabled="is_full_row==1"
          ></v-text-field> 
        </v-col>
<!-- ### end group ถึง ### -->
      </v-row>

      
      <v-row>
        <v-col>
          <div class="text-center ">
            <v-btn v-on:click="addNew()" class="primary">เพิ่มข้อมูล</v-btn>
          </div>
        </v-col>
      </v-row>


    </v-container>
  </v-form>

    


  </div>
<!-- 
  <hr style="border:1px solid ;"> -->


</div>
  
</template>

<script>
import axios from 'axios'

export default {

  data () {
    return {
      isEdit: false,
      is_valid_input: '',
      id: '',      
      worksheets_id: '',      
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
        { text: ' ', value: '' },
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
      axios.get("/api/workdetails/"+this.$route.params.id).then(
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
      this.go = '' 
      this.date_dt_go = '' 
      this.time_dt_go = '' 
      this.to = '' 
      this.date_dt_to = '' 
      this.time_dt_to = '' 
      this.working_report = '' 
      this.is_full_row = '' 
    },
    addNew(){
      // console.log('addNewTask has fire')
       console.log('dt_go : '+(this.date_dt_go+' '+this.time_dt_go))
      // return

      if( this.is_full_row  != '1' ){
        if(
          this.go == '' ||
          this.date_dt_go == '' ||
          this.time_dt_go == '' ||
          this.to == '' ||
          this.date_dt_to == '' ||
          this.time_dt_to == '' ||
          this.working_report == '' 
        ){
          this.is_valid_input = ''
          alert('โปรดกรอกข้อมูลให้ครบ')
        }else{
          this.is_valid_input = 'true'
        }        
      }else{
         this.is_valid_input = 'true'
      }

      // console.log(this.is_valid_input)
      // console.log('The id is: ' + this.$route.params.id); return 

      axios.post("/api/workdetails", 
        {
          is_valid_input: this.is_valid_input,         
          go:this.go, 
          dt_go:this.date_dt_go+' '+this.time_dt_go,          
          to:this.to,
          dt_to:this.date_dt_to+' '+this.time_dt_to, 
          working_report:this.working_report,
          is_full_row:this.is_full_row,
          worksheets_id: this.$route.params.id,
          
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
  ,
  watch : {

  }

}
</script>