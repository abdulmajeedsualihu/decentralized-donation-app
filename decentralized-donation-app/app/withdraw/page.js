'use client'
import WithdrawFunds from '../components/WithdrawFunds';
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "page.css"; // Replace with your CSS file path
document.head.appendChild(link);
import Header from "./components/Header";


   export default function WithdrawPage() {
     const contractAddress = "0x0a3A4cF5e094e7eF5Cee5e133b9267A135Eb1b9b"; // Replace with your contract address

     return (
       <div>
        <Header /> // Header component imported
         <h1>Withdraw Funds</h1>
         <WithdrawFunds contractAddress={contractAddress} />
       </div>
     );
   }