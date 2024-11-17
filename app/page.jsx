"use client"; // Add this line at the very top

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from 'next/link'; // Add this import statement
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Home() {
  const { isAuthenticated, logout } = useKindeBrowserClient(); // Destructure logout from Kinde hook
  const [campaigns, setCampaigns] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('/api/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data.customers);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
    fetchCustomers();
  }, []);

  const handleLogout = () => {
    if (logout) {
      logout(); // Call the logout method from Kinde to log the user out
    } else {
      // If logout is not available, perform a custom action (e.g., redirect)
      console.error('Logout method is not available');
      // Optionally redirect or clear session here manually
      window.location.href = '/'; // Example: redirect to login page
    }
  };

  if (!isAuthenticated) {
    return (
      <div className='container mx-auto p-4'>
        <h1 className='font-extrabold text-2xl text-violet-600 flex justify-center p-2 mb-3'>Welcome to My CRM App</h1>
        <p className='text-center'>Please login to the app</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* <div className="flex flex-row items-center justify-evenly p-4 mb-5 bg-black shadow-lg rounded-b-lg">
        <Link href="/" className="text-white px-4 py-2 rounded-full border border-gray-500 hover:bg-gray-300 hover:text-black transition-all duration-200">
          Home
        </Link>
        <Link href="/create-campaign" className="text-white px-4 py-2 rounded-full border border-gray-500 hover:bg-gray-300 hover:text-black transition-all duration-200">
          Create Campaign
        </Link>
        <Link href="/audience" className="text-white px-4 py-2 rounded-full border border-gray-500 hover:bg-gray-300 hover:text-black transition-all duration-200">
          Add Customer
        </Link>
        <Link href="/vendor" className="text-white px-4 py-2 rounded-full border border-gray-500 hover:bg-gray-300 hover:text-black transition-all duration-200">
          Vendor
        </Link>
        <button
          onClick={handleLogout}
          className="text-white px-4 py-2 rounded-full border border-gray-500 hover:bg-gray-300 hover:text-black transition-all duration-200"
        >
          Logout
        </button>
      </div> */}

      <div className="container mx-auto p-6">
        <h1 className="text-center text-[32px] font-semibold mb-4">Campaigns</h1>
        <Table className="w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <TableHeader className="bg-gray-700">
            <TableRow>
              <TableHead className="px-4 py-2">Message</TableHead>
              <TableHead className="px-4 py-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign, index) => (
              <TableRow
                key={campaign._id}
                className={`transition-colors duration-200 hover:text-black ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-300`}
              >
                <TableCell className="px-4 py-2">{campaign.message}</TableCell>
                <TableCell className="px-4 py-2">{campaign.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="container mx-auto p-6">
        <h1 className="text-center text-[32px] font-semibold mb-4">Customers</h1>
        <Table className="w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <TableHeader className="bg-gray-700">
            <TableRow>
              <TableHead className="px-4 py-2">Name</TableHead>
              <TableHead className="px-4 py-2">Total Spending</TableHead>
              <TableHead className="px-4 py-2">Visit Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow
                key={customer._id}
                className={`transition-colors hover:text-black duration-200 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-300`}
              >
                <TableCell className="px-4 py-2 hover:text-black">{customer.name}</TableCell>
                <TableCell className="px-4 py-2 hover:text-black">{customer.totalSpends}</TableCell>
                <TableCell className="px-4 py-2 hover:text-black">{customer.visitCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Home;
