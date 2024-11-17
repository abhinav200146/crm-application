'use client'
import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from 'next/navigation'
function Audience() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [totalSpends, setTotalSpends] = useState('');
  const [lastVisit, setLastVisit] = useState('');
  const [visitCount, setVisitCount] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/customers', {
        name,
        email,
        totalSpends: parseFloat(totalSpends),
        lastVisit,
        visitCount: parseInt(visitCount),
      });
      alert('Customer added successfully');
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Error adding customer');
    }
  };

  return (
    <div>
      <h1 className='font-extrabold text-xl text-violet-600 flex justify-center p-2 mb-3' >Add Customer</h1>
      <div className='flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
        <Label>
          Name:
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Label>
        <Label>
          Email:
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>
        <Label>
          Total Spends:
          <Input
            type="text"
            value={totalSpends}
            onChange={(e) => setTotalSpends(e.target.value)}
          />
        </Label>
        <Label>
          Last Visit:
          <Input
            type="date"
            value={lastVisit}
            onChange={(e) => setLastVisit(e.target.value)}
          />
        </Label>
        <Label>
          Visit Count:
          <Input
            type="text"
            value={visitCount}
            onChange={(e) => setVisitCount(e.target.value)}
          />
        </Label>
        <Button className="mt-2"type="submit">Add Customer</Button>
      </form>
    </div>
    </div>
  );
}

export default  Audience;
