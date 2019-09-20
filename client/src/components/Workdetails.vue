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
   
  :headers="headers_details" 
  :items="items_details" 
  item-key="id" 
  sort-by="ord"
  class="elevation-1 " 
  :items-per-page="5" 
  
  >

  <!-- dialog Insert / Edit -->
  <template v-slot:top>
  <v-dialog v-model="dialog" max-width="900px"> 
  <template v-slot:activator="{ on }" >
    <div class="text-right">
      <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
    </div>
  </template>

    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
        <v-row>
          <v-col cols="12" md="6" >
            <!-- <v-text-field v-model="editedItem.id" ></v-text-field> -->
            <v-text-field
              v-model="editedItem.working_report"            
              :counter="255"
              label="รายงานการเดินทาง / รายละเอียดการปฏิบัติงาน"
              required
            ></v-text-field> 
          </v-col>

          <v-col cols="12" md="6" >
            <v-checkbox 
              label="รายการนี้คือ รายละเอียดการปฏิบัติงาน?"
              required
              v-model="editedItem.is_full_row"
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
            v-model="editedItem.date_dt_go"
            label="วันที่ออก"
            prepend-icon="event"
            readonly
            v-on="on"
            :disabled="editedItem.is_full_row==1"
          ></v-text-field>
        </template>
        <v-date-picker v-model="editedItem.date_dt_go" @input="dialog_date_dt_go = false" locale="th"></v-date-picker>
      </v-menu>
          <!-- วันที่ออก -->

        </v-col>

        <v-col cols="12" md="1" >
          <!-- เวลาออก -->
          
        <v-dialog
          ref="dialog"
          v-model="modal_time_dt_go"
          :return-value.sync="editedItem.time_dt_go"          
          persistent
          full-width
          width="290px"
        >
        <template v-slot:activator="{ on }">
          
          <v-text-field
            v-model="editedItem.time_dt_go"
            label="เวลาออก"
            prepend-icon=""
            readonly
            v-on="on"
            :disabled="editedItem.is_full_row==1"
          ></v-text-field>
        </template>
        <v-time-picker          
          v-model="editedItem.time_dt_go"
          full-width
        >
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="$refs.dialog.save(editedItem.time_dt_go)">OK</v-btn>
        </v-time-picker>
      </v-dialog>
          <!-- เวลาออก -->
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="editedItem.go"         
            label="ออกจาก"
            required
            :disabled="editedItem.is_full_row==1"
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
            v-model="editedItem.date_dt_to"
            label="วันที่ถึง"
            prepend-icon="event"
            readonly
            v-on="on"
            :disabled="editedItem.is_full_row==1"
          ></v-text-field>
        </template>
        <v-date-picker v-model="editedItem.date_dt_to" @input="dialog_date_dt_to = false" locale="th"></v-date-picker>
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
        :return-value.sync="editedItem.time_dt_to"
        persistent
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="editedItem.time_dt_to"
            label="เวลาถึง"
            prepend-icon=""
            readonly
            v-on="on"
            :disabled="editedItem.is_full_row==1"
          ></v-text-field>
        </template>
        <v-time-picker          
          v-model="editedItem.time_dt_to"
          full-width
        >
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="$refs.dialog2.save(editedItem.time_dt_to)">OK</v-btn>
        </v-time-picker>
      </v-dialog> 
          <!-- end เวลาถึง -->
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="editedItem.to"         
            label="ไปถึง"
            required
            :disabled="editedItem.is_full_row==1"
          ></v-text-field> 
        </v-col>
<!-- ### end group ถึง ### -->
      </v-row>


        </v-container>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions> 

    </v-card> 

  </v-dialog>
  </template> 
  <!-- dialog Insert / Edit -->


  <!-- table show all data -->
  <template v-slot:item="{ item }" >
    
    <tr v-if="item.is_full_row==1">
      
      <td >
        <v-btn text icon color="red">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn text icon color="red">
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>

      </td>
      <td colspan="7">{{ item.working_report }}</td>
      <td >
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </td>
    </tr> 
    
    <tr v-else>      
      <td >
        <v-btn text icon color="red">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn text icon color="red">
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
      </td>
      <td >{{ item.go }}</td>
      <td >{{ item.date_dt_go }}</td>
      <td >{{ item.time_dt_go }} </td>
      <td >{{ item.to }}</td>
      <td >{{ item.date_dt_to }}</td>
      <td >{{ item.time_dt_to }}</td>
      <td >{{ item.working_report }}</td>
      <td >
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small>delete</v-icon>
      </td>
    </tr> 
    
  </template>


</v-data-table>





    


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
      modal_time_dt_to: false,
      dialog_date_dt_to: false,

      // time_dt_go: null,
      // date_dt_go: null,
      // dt_go:'',      
      // time_dt_to: null,
      // date_dt_to: null,
      // dt_to:'',
      // ord:'',
      // go:'',
      // to:'',
      // working_report:'',
      // is_full_row:'',

      dialog: false,
      editedIndex: -1,
      editedItem: {
        id:'',
        modal_time_dt_go: false,
        dialog_date_dt_go: false,
        time_dt_go: '',
        date_dt_go: '',
        dt_go:'',
        modal_time_dt_to: false,
        dialog_date_dt_to: false,
        time_dt_to: '',
        date_dt_to: '',
        dt_to:'',
        ord:'',
        go:'',
        to:'',
        working_report:'',
        is_full_row:'',
      },
      defaultItem: {
        id:'',
        modal_time_dt_go: false,
        dialog_date_dt_go: false,
        time_dt_go: '',
        date_dt_go: '',
        dt_go:'',
        modal_time_dt_to: false,
        dialog_date_dt_to: false,
        time_dt_to: '',
        date_dt_to: '',
        dt_to:'',
        ord:'',
        go:'',
        to:'',
        working_report:'',
        is_full_row:'',
      },

      // data for details
      items_details: [],
      headers_details: [
        { text: ' ', value: '' },
        { text: 'ออกจาก', value: 'go' },
        { text: 'วัน', value: 'date_dt_go' },
        { text: 'เวลา', value: 'time_dt_go' },
        { text: 'ถึง', value: 'to' },
        { text: 'วัน', value: 'date_dt_to' },
        { text: 'เวลา', value: 'time_dt_to' },
        { text: 'รายงานการเดินทาง และปฏิบัติงาน', value: 'working_report' },
        { text: 'Actions', value: 'action', sortable: false },
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
      this.editedItem.go = '' 
      this.editedItem.date_dt_go = '' 
      this.editedItem.time_dt_go = '' 
      this.editedItem.to = '' 
      this.editedItem.date_dt_to = '' 
      this.editedItem.time_dt_to = '' 
      this.editedItem.working_report = '' 
      this.editedItem.is_full_row = '' 
    },
    addNew(){
       //console.log('addNewTask has fire')        
       //console.log('dt_go : '+(this.date_dt_go+' '+this.time_dt_go)) return
       //return

      if( this.editedItem.is_full_row  != '1' ){
        if(
          this.editedItem.go == '' ||
          // this.date_dt_go == '' ||
          // this.time_dt_go == '' ||
          this.editedItem.to == '' ||
          // this.date_dt_to == '' ||
          // this.time_dt_to == '' ||
          this.editedItem.working_report == '' 
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
      // console.log('this.go: ' + this.editedItem.go); 
      // console.log('this.date_dt_go+ +this.time_dt_go: ' + (this.editedItem.date_dt_go+' '+this.editedItem.time_dt_go)); return 

      axios.post("/api/workdetails", 
        {
          is_valid_input: this.is_valid_input,         
          go:this.editedItem.go, 
          dt_go:this.editedItem.date_dt_go+' '+this.editedItem.time_dt_go,          
          to:this.editedItem.to,
          dt_to:this.editedItem.date_dt_to+' '+this.editedItem.time_dt_to, 
          working_report:this.editedItem.working_report,
          is_full_row:this.editedItem.is_full_row,
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
    // editData(id,firstname, lastname, position, address, allowance, expenses, bank_account, emp_no, belong_to, taxi,  etc){
    //   this.id = id
    //   this.firstname = firstname
      
    //   this.isEdit = true
    // },
    updateData(){
      //console.log('updateData has fire')
      if(this.firstname == '' || this.lastname == ''){
        this.is_valid_input = ''
      }else{
        this.is_valid_input = 'true'
      }
      var dataSend = {
          is_valid_input: this.is_valid_input,
          //id:this.editedItem.id, 
          go:this.editedItem.go, 
          dt_go:this.editedItem.date_dt_go+' '+this.editedItem.time_dt_go,          
          to:this.editedItem.to,
          dt_to:this.editedItem.date_dt_to+' '+this.editedItem.time_dt_to, 
          working_report:this.editedItem.working_report,
          is_full_row:this.editedItem.is_full_row,
          worksheets_id: this.$route.params.id,           
        }
      //console.log(dataSend)  
      axios.put(`/api/workdetails/${this.editedItem.id}`, dataSend)
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
    ,
    // handle close button
    close () {
      this.dialog = false 
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    // handle Save button
    save () {
      if (this.editedIndex > -1) { 
        // edit mode
        Object.assign(this.items_details[this.editedIndex], this.editedItem)
        this.updateData()
      } else { 
        // insert mode
        this.items_details.push(this.editedItem)
        //console.log(this.editedItem); return
        //console.log(this.items_details[this.items_details.length-1]); return
        this.addNew()
      }
      this.clearData()
      this.close()
    },
    editItem (item) {      
      this.editedIndex = this.items_details.indexOf(item)
      item.date_dt_go = this.reversDateYMD(item.date_dt_go)
      item.date_dt_to = this.reversDateYMD(item.date_dt_to)
      this.editedItem = Object.assign({}, item)   
      //console.log(this.editedItem)   
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.items_details.indexOf(item)
      if(confirm('ยืนยันการลบรายการที่ ' + item.id)){
        this.items_details.splice(index, 1)
        this.deleteData(item.id)
      }
    },
    reversDateYMD (d) {      
      if(/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(d)){
        return d
      }else{
        var newdate = d.split("-").reverse().join("-");
        return newdate
      }      
    },
    
  } // end ,methods :
  ,
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

}
</script>