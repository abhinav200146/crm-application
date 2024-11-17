'use client'
import { useState } from 'react';

function RuleInput({ onAddRule }) {
    const [field, setField] = useState('totalSpends');
    const [operator, setOperator] = useState('>');
    const [value, setValue] = useState('');

    const handleAddRule = () => {
        onAddRule({ field, operator, value });
        setField('totalSpends');
        setOperator('>');
        setValue('');
    };

    return (
        <div>
            <select value={field} onChange={(e) => setField(e.target.value)}>
                <option value="totalSpends">Total Spends</option>
                <option value="visitCount">Visit Count</option>
                <option value="lastVisit">Last Visit</option>
            </select>
            <select value={operator} onChange={(e) => setOperator(e.target.value)}>
                <option value=">">{'>'}</option>
                <option value={'<'}>
                    {'<'}
                </option>
                <option value="=">=</option>
                <option value=">=">{'>='}</option>
                <option value="<=">
                    {'<='}
                </option>
            </select>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleAddRule}>Add Rule</button>
        </div>
    );
}

export default RuleInput;
