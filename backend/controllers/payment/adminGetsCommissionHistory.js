const Booking = require("../../models/BookingModel");

const adminCommissionController =async (req,res)=>{

  try{

    const bookings =
    await Booking.find({paymentStatus:"paid"}).populate("customer","fullName email").sort({createdAt:-1});

    const commissionHistory = bookings.map((booking)=>({
      bookingId:booking._id,
      customer:booking.customer ? 
      {
          id:
          booking.customer._id,

          name:
          booking.customer.fullName,

          email:
          booking.customer.email
        }
      : null,

      commission:booking.adminCommission,
      totalAmount:booking.amount,
      paymentDate:booking.updatedAt
    }));

    const totalCommission =bookings.reduce((sum,item)=>sum +item.adminCommission,0);

    res.status(200).json({
      success:true,
      totalCommission,
      totalPayments:bookings.length,
      commissionHistory
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};

module.exports = adminCommissionController;