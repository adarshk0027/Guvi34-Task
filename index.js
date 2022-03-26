const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const date = require('date-and-time')
const { log } = require('console')

const PORT = 5000
app.use(bodyParser.json())
//create Room Model
const HallRoom = [
  {
    Roomid: 1,
    RoomName:"Room1",
    NumberOfSeats: 10,
    Price: 50
  },
  {
    Roomid: 2,
    RoomName:"Room2",
    NumberOfSeats: 15,
    Price: 90
  }
]
//id array
const id=["1","2"]
//booked ids
const BookedId=[]
//BookedRoom Model
const BookedRoom = [
    //send CustomerName , StartTime ,EndTime Through PostMan
    //Book Status,Date And Id Set Automatically
]

//Customer Array
customer=[];
// view All Room With Id And Total Seat Etc
app.get('/', (req, res) => {
  res.send({
    StatusCode: 200,
    Message: 'success',
    data: HallRoom,
    booked:BookedRoom
    
  })
})
//add Room Route 
//Add A New Room For Stay
app.post('/add_room', (req, res) => {
  try {
    id.push(""+req.body.Roomid)
    HallRoom.push(req.body)
    res.send({
      StatusCode: 200,
      Message: 'success',
      data: 'added Succesfully'
    })
  } catch (error) {
    console.log(error)
    res.send({
      StatusCode: 400,
      message: 'INTERNAL SERVER ERROR'
    })
  }
})
//Book A Room By A Customer
//Book A Valuable Room 
//params,id is room id
app.post('/book/:id', (req, res) => {
  try {
      if(id.includes(req.params.id) && !BookedId.includes(req.params.id) ){
        BookedRoom.push({
            Room_id: req.params.id,
            BookStatus: true,
            RoomName: HallRoom.map((item)=>{
            if(item.Roomid==req.params.id){
                return item.RoomName
                
            }
            }),
            DATE: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss'),
            ...req.body
          })
          customer.push({
            
            DATE: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss'),
            Name:req.body.Customer,
            RoomName:HallRoom.map((item)=>{
                if(item.Roomid==req.params.id){
                    return item.RoomName
                    
                }
                }),
            StartTime:req.body.StartTime,
            EndTime:req.body.EndTime,
            
          })
         //
         BookedId.push(req.params.id)
          
          res.send({
            StatusCode: 200,
            Message: 'success',
            data: 'BookedSuccesFully Succesfully',
            customer:BookedRoom
          })
      }
      else{
          res.send({StatusCode:300,
            message:"This Room is Invalid or your trying to book an booked room",
        })
      }
    
    
  } catch (error) {
    console.log(error)
    res.send({
      StatusCode: 400,
      message: 'INTERNAL SERVER ERROR'
    })
  }
})
//List All Booked Room
app.get('/list-booked', (req, res) => {
    try{
        res.send({
            StatusCode: 200,
            data: BookedRoom,
            message:"list Are There"
            
          })
    }
    catch(error){
        console.log(error);
        res.send({
            StatusCode: 400,
            message: 'INTERNAL SERVER ERROR'
          })
    }
    
  })
//List Customer With Booked data
app.get('/list-customer', (req, res) => {
    try{
        
        res.send({
            StatusCode: 200,
            data: customer,
            message:"Customer Listed"
            
          })
    }
    
    catch(error){
        console.log(error)
        res.send({
            StatusCode: 400,
            message: 'INTERNAL SERVER ERROR'
          })
    }
  })
app.listen(PORT, () => {
  console.log('Connect Port is SUCCESS')
})
