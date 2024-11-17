'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
export default function Vendor() {
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    // Fetch communication logs
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/api/campaigns');
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  const handleSend = async () => {
    if (!selectedLog) {
      alert('Please select a log to send');
      return;
    }

    try {
      const response = await axios.post('/api/vendor', { logId: selectedLog });
      setStatus(`Status updated to: ${response.data.log.status}`);
    } catch (error) {
      console.error('Error sending log:', error);
      setStatus('Failed to send log');
    }
  };

  return (
<div className="flex flex-col items-center">
  <h1 className="text-purple-600 text-center text-3xl font-bold mb-6">Send Campaign</h1>
  <div className='w-[300px]'>
    <label htmlFor="logSelect">Select Communication Log:</label>
    <select id="logSelect" value={selectedLog} onChange={(e) => setSelectedLog(e.target.value)} className="w-full mt-2 mb-4 p-2 border rounded">
      <option className="dark:bg-black" value="">Select campaign</option>
      {logs.map((log) => (
        <option key={log._id} value={log._id}>
          {log.message} - {log.status}
        </option>
      ))}
    </select>
  </div>
  <Button onClick={handleSend}>Send</Button>
  {status && <p className="mt-4">{status}</p>}
</div>

  );
}
