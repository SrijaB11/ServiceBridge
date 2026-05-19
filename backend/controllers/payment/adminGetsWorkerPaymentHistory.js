const Booking = require("../../models/BookingModel");

const workerPaymentHistoryController = async (req,res)=>{

  try{
  const bookings = await Booking.find({ workerPaid:true}).populate("worker","fullName email phone location services").sort({updatedAt:-1});

  const history = bookings.map((booking)=>({

  bookingId:booking._id,

  worker:booking.worker ? 
  {
  id:booking.worker._id,

  name:booking.worker.fullName,

  email:booking.worker.email,

  phone:booking.worker.phone,

  location:booking.worker.location,

  services:booking.worker.services
  }
  : 
  {
  id:null,

  name:"Worker removed",
  email:"",
  phone:"",
  location:"",
  services:[]
  },

  amountPaid:booking.workerAmount,
  paymentStatus:booking.workerPaid,
  paidDate:booking.updatedAt

  })
  );

  const totalPaid =bookings.reduce((sum,item)=>sum+item.workerAmount,0);

  res.status(200).json({
  success:true,
  totalWorkersPaid:history.length,
  totalAmountPaid:totalPaid,
  history

  });

  }catch(error){

  res.status(500).json({
  success:false,
  message:error.message
  });

  }

};

module.exports = workerPaymentHistoryController;