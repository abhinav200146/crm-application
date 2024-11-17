'use client';
import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from 'next/navigation'
export default function CreateCampaign() {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({ field: '', operator: '', value: '' });
  const [message, setMessage] = useState('');
  const [audienceSize, setAudienceSize] = useState(null);
 
  const handleAddRule = () => {
    setRules([...rules, { ...newRule }]);
    setNewRule({ field: '', operator: '', value: '' });
  };

  const handleDeleteRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const handleNewRuleChange = (field, value) => {
    setNewRule({ ...newRule, [field]: value });
  };

  const handleCheckAudience = async () => {
    try {
      const res = await axios.post('/api/campaigns/audience', { rules });
      setAudienceSize(res.data.audienceSize);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCampaign = async () => {
    try {
      await axios.post('/api/campaigns', { rules, message });
      alert('Campaign created successfully');
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="flex flex-col items-center">
  <h1 className="font-extrabold text-2xl text-violet-600 text-center p-2 mb-4">Create Campaign</h1>

  <div className="flex justify-center items-center w-4/5 mb-4">
    {rules.length > 0 && (
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Operator</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.map((rule, index) => (
            <TableRow key={index}>
              <TableCell>{rule.field}</TableCell>
              <TableCell>{rule.operator}</TableCell>
              <TableCell>{rule.value}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" onClick={() => handleDeleteRule(index)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </div>

  <div className="flex justify-center items-center w-4/5">
    <div className="w-full">
      <div className="flex flex-row gap-3 mb-4">
        <select className="p-2 border rounded" value={newRule.field} onChange={(e) => handleNewRuleChange('field', e.target.value)}>
          <option value="" disabled>Select Field</option>
          <option value="totalSpends">Total Spends</option>
          <option value="visitCount">Visit Count</option>
          <option value="lastVisit">Last Visit</option>
        </select>
        <select className="p-2 border rounded" value={newRule.operator} onChange={(e) => handleNewRuleChange('operator', e.target.value)}>
          <option value="" disabled>Select Operator</option>
          <option value=">">{'>'}</option>
          <option value="<">{'<'}</option>
          <option value=">=">{">="}</option>
          <option value="<=">{"<="}</option>
        </select>
        <Input
          type="text"
          placeholder="Value"
          value={newRule.value}
          className="border rounded-md w-1/5"
          onChange={(e) => handleNewRuleChange('value', e.target.value)}
        />
      </div>
      
      <Button variant="outline" onClick={handleAddRule}  className="mt-4 p-2 bg-white-500 mr-3 text-white rounded hover:bg-gray-300 hover:text-black">Add Rule</Button>
<Button variant="outline" onClick={handleCheckAudience}  className="mt-4 p-2 bg-white-500 text-white rounded hover:bg-gray-300 hover:text-black">Check Audience Size</Button>

      {audienceSize !== null && <p className="mt-2">Audience Size: {audienceSize}</p>}

      <div className="mt-4">
        <Label>Your Message</Label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here"
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      


      <Button onClick={handleCreateCampaign}  className="mt-4 p-2 bg-white-500 text-white rounded hover:bg-gray-300 hover:text-black">
        Create Campaign
      </Button>
    </div>
  </div>
</div>
  );
}
