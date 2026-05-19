
import {Component} from "react"

class CustomerPayments extends Component {
    componentDidMount() {
        this.GetCustomerPaymentDetails()
    }
    GetCustomerPaymentDetails = async () => {
        const JwtToken=localStorage.getItem("token")
        const PaymentDetails = await fetch("http://localhost:5000/payment/verify-payment",{method:"GET",headers:{Authorization:`Bearer ${JwtToken}`}})
        console.log(PaymentDetails)
    }
    render() {
        return (
            <></>
        )
    }
}

export default CustomerPayments