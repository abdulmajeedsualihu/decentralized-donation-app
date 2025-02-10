import DonationForm from '../components/DonationForm';
import Header from "./components/Header";

export default function DonatePage() {
  const contractAddress = "0xYourDeployedContractAddress"; // Replace with your contract address

  return (
    <div>
        <Header /> // Header component imported
      <h1>Make a Donation</h1>
      <DonationForm contractAddress={contractAddress} />
    </div>
  );
}      