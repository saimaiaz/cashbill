<template>
  
 <div class="container">
<br><br>

  <div class="row">
    <h4>Manage Worksheet</h4> <br><br>
    <table class="table">
      <tr v-for="(item) in dataArray"
        v-bind:key="item.id"
        v-bind:title="item.name" >

        <td class="text-left">
          {{item.name}} | 
          {{item.work_no}} | 
          {{item.work_date_send}} | 
          {{item.activity}} | 
          {{item.work_job_no}} | 
          {{item.work_type}} | 
          {{item.other_specify}} | 
          {{item.training_no}} | 
          {{item.training_name}} | 
          {{item.comments}} | 
          {{item.commander}} | 
          {{item.work_start}} | 
          {{item.work_end}} | 
          {{item.fuel}} | 
          {{item.work_day_amount}} | 
          {{item.hostel_day_amount}} | 
          {{item.member_id}} | 
          {{item.account_code}} | 
          {{item.cost_code}} | 
          {{item.budget_code}} 
          
        </td>
          
        <td style="background: #ddd; width: 300px;">
          <button class="btn btn-success" v-on:click="printPage1(item.id)">Preview Page1</button>

          <button class="btn btn-info" v-on:click="editData(item.id,item.name,item.work_no,item.work_date_send,item.activity,item.work_job_no,item.work_type,item.other_specify,item.training_no,item.training_name,item.comments,item.commander,item.work_start,item.work_end,item.fuel,item.work_day_amount,item.hostel_day_amount,item.account_code,item.cost_code,item.budget_code,item.member_id )">Edit</button>
          <button class="btn btn-danger" v-on:click="deleteData(item.id)">Delete</button>
        </td>

      </tr>
    </table>

    


  </div>

  <hr style="border:1px solid ;">


  <v-tabs
  background-color="indigo"
  dark 
  >

    <v-tab ripple>
      สดย่อย
    </v-tab>
    <v-tab ripple>
      รายงานการเดินทาง
    </v-tab>
    <v-tab ripple>
      Item 1
    </v-tab>
    <v-tab ripple>
      Item 2
    </v-tab>


    <v-tab-item>
      <v-card flat>
        
        <div class="row">
    <div class="col-md-4 order-md-2 mb-4">
      
    </div>
    <div class="col-md-8 order-md-1">
      <h4 class="mb-3"></h4>

      <form v-on:submit.prevent="addNew" class="needs-validation" novalidate>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="member_id">***ผู้เบิก***</label>
            <select class="form-control browser-default custom-select" v-model="member_id" id="member_id">
              <option v-for="(m) in memberDataArray" v-bind:key="m.id" :value="m.id">
                {{m.firstname }} {{m.lastname}}  
              </option>
            </select>            
          </div>
          
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="name">ชื่อใบเบิก</label>
            <input type="text" class="form-control" v-model="name" id="name" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="work_no">เลขที่ (เว้นว่างได้)</label>
            <input type="text" class="form-control" v-model="work_no" id="work_no" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="work_date_send">วันที่เบิก</label>
            <input type="text" class="form-control" v-model="work_date_send" id="work_date_send" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="activity">กิจกรรม</label>
            <input type="text" class="form-control" v-model="activity" id="activity" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="work_job_no">เลขที่การเดินทาง</label>
            <input type="text" class="form-control" v-model="work_job_no" id="work_job_no" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="work_type">ลักษณะงาน</label>
            <select class="form-control browser-default custom-select" v-model="work_type" id="work_type">
              <option value="" >-โปรดเลือก-</option>
              <option value="ซื้อพัสดุ">ซื้อพัสดุ</option>
              <option value="เดินทางไปปฏิบัติงานต่างท้องที่">เดินทางไปปฏิบัติงานต่างท้องที่</option>
              <option value="เดินทางไปฝึกอบรม">เดินทางไปฝึกอบรม</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="other_specify">อื่นๆ โปรดระบุ</label>
            <input :disabled="other_flag == false" type="text"  class="form-control" v-model="other_specify" id="other_specify" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="training_no">เลขที่รุ่นหลักสูตร</label>
            <input  :disabled="training_flag == false" type="text" class="form-control" v-model="training_no" id="training_no" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="training_name">ชื่อหลักสูตร</label>
            <input  :disabled="training_flag == false" type="text" class="form-control" v-model="training_name" id="training_name" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="comments">หมายเหตุ</label>
            <input type="text" class="form-control" v-model="comments" id="comments" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="work_start">วันที่เริ่มงาน (ออกจากบ้าน)</label>
            <input type="text" class="form-control" v-model="work_start" id="work_start" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="work_end">วันที่สิ้นสุดงาน (กลับถึงบ้าน)</label>
            <input type="text" class="form-control" v-model="work_end" id="work_end" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="commander">ชื่อผู้บังคับบัญชา</label>
            <input type="text" class="form-control" v-model="commander" id="commander" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="fuel">ค่าน้ำมัน</label>
            <input type="text" class="form-control" v-model="fuel" id="fuel" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="work_day_amount">จำนวนวันปฏิบัติงาน</label>
            <input type="text" class="form-control" v-model="work_day_amount" id="work_day_amount" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="hostel_day_amount">จำนวนวันค้างแรม</label>
            <input type="text" class="form-control" v-model="hostel_day_amount" id="hostel_day_amount" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="account_code">รหัสบัญชี</label>
            <input type="text" class="form-control" v-model="account_code" id="account_code" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cost_code">รหัสศูนย์ต้นทุน</label>
            <input type="text" class="form-control" v-model="cost_code" id="cost_code" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="budget_code">รหัสงบประมาณ	</label>
            <input type="text" class="form-control" v-model="budget_code" id="budget_code" placeholder="" value="" required>
            <div class="invalid-feedback">
              จำเป็นต้องกรอกข้อมูล
            </div>
          </div>
        </div>
        

        <hr class="mb-4">
        <button v-if="this.isEdit == false" class="btn btn-primary " type="submit">Add New</button>
        <span v-else>
          <button  v-on:click="updateData()" class="btn btn-primary " type="button" >Update</button>
          <button  v-on:click="cancelUpdate()" class="btn btn-primary " type="button" >Cancel</button>
        </span>

      </form>
      <br><br><br>
    </div>
  </div>


      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat>
        <!-- รายงานการเดินทาง -->
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


      </v-row>

      



    </v-container>
  </v-form>
        <!-- รายงานการเดินทาง -->      
      </v-card>
    </v-tab-item>  
    <v-tab-item>
      <v-card flat>
        Contents for Item 1 go here
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat>
        Contents for Item 2 go here
      </v-card>
    </v-tab-item>  


  </v-tabs>

  
 </div>

</template>

<script>
import axios from 'axios'

export default {

  data () {
    return {
      dataArray:[],
      memberDataArray:[],
      isEdit: false,
      training_flag: false,
      other_flag: false,
      is_valid_input: '',
      id: '',
      name: '',
      work_no: '',
      work_date_send: '',
      activity: '',
      work_job_no: '',
      work_type: '',
      other_specify: '',
      training_no: '',
      training_name: '',
      comments: '',
      commander: '',
      work_start: '',
      work_end: '',
      fuel: '',
      work_day_amount:'',
      hostel_day_amount:'',
      account_code:'',
      cost_code:'',
      budget_code:'',
      member_id:'',

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

      
    }
  },mounted(){
    this.getData()
    this.getMemberData()
    //console.log(this)
  },methods : {
    getData(){
      axios.get("/api/worksheet").then(
        (result) => {
          //console.log(result.data)
          this.dataArray = result.data
        },
        (error) => {
          console.error('Error: '+error)
        }
      )
    }
    ,
    printPage1(id){
      var win = window.open('http://localhost:3000/api/printPage1/'+id, '_blank');
      win.focus();
    }
    ,
    getMemberData(){
      axios.get("/api/member").then(
        (result) => {
          //console.log(result.data)
          this.memberDataArray = result.data
        },
        (error) => {
          console.error('Error: '+error)
        }
      )
    },
    clearData(){      
      this.name = ''
      this.work_no = ''
      this.work_date_send = ''
      this.activity = ''
      this.work_job_no = ''
      this.work_type = ''
      this.other_specify = ''
      this.training_no = ''
      this.training_name = ''
      this.comments = ''
      this.commander = ''
      this.work_start = ''
      this.work_end = ''
      this.fuel = ''
      this.work_day_amount=''
      this.hostel_day_amount=''
      this.account_code=''
      this.cost_code=''
      this.budget_code=''
      this.member_id=''
    },
    addNew(){
      //console.log('addNewTask has fire')
      if(this.name == '' || this.work_no == ''){
        this.is_valid_input = ''
      }else{
        this.is_valid_input = 'true'
      }

      axios.post("/api/worksheet", 
        {
          is_valid_input: this.is_valid_input,
          name: this.name,
          work_no: this.work_no,
          work_date_send: this.work_date_send,
          activity: this.activity,
          work_job_no: this.work_job_no,
          work_type: this.work_type,
          other_specify: this.other_specify,
          training_no: this.training_no,
          training_name: this.training_name,
          comments: this.comments,
          commander: this.commander,
          work_start: this.work_start,
          work_end: this.work_end,
          fuel: this.fuel,
          work_day_amount: this.work_day_amount,
          hostel_day_amount: this.hostel_day_amount,
          account_code:this.account_code,
          cost_code:this.cost_code,
          budget_code:this.budget_code,
          member_id: this.member_id
        }
        
      )
      .then((res)=>{
        this.clearData()
        this.getData()
        //console.log(res)
      })
      .catch((err)=> {
        console.log("Error : " +err)
      })
    },
    editData(id,name,work_no,work_date_send,activity,work_job_no,work_type,other_specify,training_no,training_name,comments,commander,work_start,work_end,fuel,work_day_amount,hostel_day_amount,account_code,cost_code,budget_code,member_id){
      this.id = id
      this.name = name
      this.work_no = work_no
      this.work_date_send = work_date_send
      this.activity = activity
      this.work_job_no = work_job_no
      this.work_type = work_type
      this.other_specify = other_specify
      this.training_no = training_no
      this.training_name = training_name
      this.comments = comments
      this.commander = commander
      this.work_start = work_start
      this.work_end = work_end
      this.fuel = fuel
      this.work_day_amount = work_day_amount
      this.hostel_day_amount = hostel_day_amount
      this.account_code=account_code
      this.cost_code=cost_code
      this.budget_code=budget_code
      this.member_id=member_id
      //console.log(member_id)
      this.isEdit = true
    },
    updateData(){
      //console.log('updateData has fire')
      if(this.firstname == '' || this.lastname == ''){
        this.is_valid_input = ''
      }else{
        this.is_valid_input = 'true'
      }

      axios.put(`/api/worksheet/${this.id}`,{
          is_valid_input: this.is_valid_input,
          name: this.name,
          work_no: this.work_no,
          work_date_send: this.work_date_send,
          activity: this.activity,
          work_job_no: this.work_job_no,
          work_type: this.work_type,
          other_specify: this.other_specify,
          training_no: this.training_no,
          training_name: this.training_name,
          comments: this.comments,
          commander: this.commander,
          work_start: this.work_start,
          work_end: this.work_end,
          fuel: this.fuel,
          work_day_amount: this.work_day_amount,
          hostel_day_amount: this.hostel_day_amount,
          account_code:this.account_code,
          cost_code:this.cost_code,
          budget_code:this.budget_code,
          member_id:this.member_id
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
      if(confirm('Confirm delete.')){
        axios.delete(`/api/worksheet/${id}`)
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
    ,
    cancelUpdate(){
      this.isEdit = false 
      this.clearData() 
    }
  
  } // end ,methods :
  ,
  watch : {
      work_type:function(val) {
        // console.log(val)
        if(val == 'เดินทางไปฝึกอบรม'){
          this.training_flag= true
          this.other_flag=false
          //console.log(val)
        }
        else if(val == 'อื่นๆ'){
          this.other_flag=true
          this.training_flag= false
        }
        else{
          this.training_flag= false
          this.other_flag=false
        }
      }
  }
  ,
  computed: {

  }

}
</script>


<style scoped>

</style>
