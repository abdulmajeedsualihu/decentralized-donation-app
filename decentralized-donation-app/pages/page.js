import WalletConnect from '../app/components/WalletConnect';

export default function Home() {
  return (
    <div className='px-4 py-2 bg-blue-600 text-white border-0 rounded-full cursor-pointer hover:bg-sky-700 text-sm font-bold'>
      <h1>Welcome to the Decentralized Donation App</h1>
      <WalletConnect />
    </div>
  );
}