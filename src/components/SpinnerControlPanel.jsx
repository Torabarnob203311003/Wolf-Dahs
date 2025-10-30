import React, { useState, useEffect } from 'react';
import { AlertCircle, Save, RotateCcw } from 'lucide-react';
import axiosSecure from '../lib/axiosSecure';

const SpinnerControlPanel = () => {
  const [prizes, setPrizes] = useState([]);
  const [jackpotSettings, setJackpotSettings] = useState({
    enabled: true,
    monthlyLimit: 1,
    lastHitDate: null,
  });
  const [loading, setLoading] = useState(true);
  const [spinnerId, setSpinnerId] = useState(null); 

  // Load existing spinner data
  useEffect(() => {
    const fetchSpinnerData = async () => {
      try {
        const res = await axiosSecure.get('/spinner/get-spinner');
        console.log(res.data.data[0].jackpotSettings);
        
        if (res.data && res.data.data[0]._id) {
          setPrizes(res.data.data[0].prizes || []);
          console.log(res.data);
          
          setJackpotSettings(res.data.data[0].jackpotSettings || {});
          setSpinnerId(res.data.data[0]._id);
        } else {
          setPrizes(defaultPrizes);
        }
      } catch (err) {
        console.error('Error loading spinner data:', err);
        setPrizes(defaultPrizes);
      } finally {
        setLoading(false);
      }
    };
    fetchSpinnerData();
  }, []);

  const defaultPrizes = [
    { id: 1, label: '0', value: 0, probability: 25, color: '#06b6d4' },
    { id: 2, label: 'ZERO', value: 0, probability: 25, color: '#8b5cf6' },
    { id: 3, label: '$1', value: 1, probability: 20, color: '#fbbf24' },
    { id: 4, label: '$2', value: 2, probability: 15, color: '#ef4444' },
    { id: 5, label: '$5', value: 5, probability: 10, color: '#8b5cf6' },
    { id: 6, label: '$25', value: 25, probability: 4, color: '#06b6d4' },
    { id: 7, label: '$50', value: 50, probability: 0.9, color: '#fbbf24' },
    { id: 8, label: 'JACKPOT', value: 'jackpot', probability: 0.1, color: '#ef4444' },
  ];

  const handlePrizeChange = (id, field, value) => {
    setPrizes((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, [field]: field === 'label' ? value : parseFloat(value) || 0 }
          : p
      )
    );
  };

  const handleSave = async () => {
    const totalProbability = prizes.reduce((sum, p) => sum + p.probability, 0);
    if (Math.abs(totalProbability - 100) > 0.1) {
      alert('⚠️ Total probability must equal 100%');
      return;
    }

    try {
      if (spinnerId) {
        // update existing
        await axiosSecure.put(`/spinner/update-spinner/${spinnerId}`, { prizes, jackpotSettings });
      } else {
        // create new
        const res = await axiosSecure.post('/spinner/create-spinner', { prizes, jackpotSettings });
        setSpinnerId(res.data._id);
      }
      alert('✅ Settings saved successfully!');
    } catch (err) {
      console.error('Error saving spinner settings:', err);
      alert('❌ Failed to save settings.');
    }
  };

  // const handleReset = () => {
  //   if (confirm('Reset to default values?')) setPrizes(defaultPrizes);
  // };

  if (loading) return <div className="text-white p-10">Loading spinner data...</div>;

  const totalProbability = prizes.reduce((sum, p) => sum + p.probability, 0);

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-6">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white text-2xl font-bold mb-2">Spinner Control Panel</h1>
          <p className="text-gray-400 text-sm">Configure prize values and probabilities for the lucky wheel</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Prize Configuration */}
          <div className="lg:col-span-2 space-y-4">
            {/* Warning Alert */}
            <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
              <div>
                <h3 className="text-yellow-500 font-semibold text-sm mb-1">Jackpot Monthly Limit</h3>
                <p className="text-yellow-200 text-xs">
                  The jackpot prize can only be won once per month to maintain balance and excitement. 
                  Last jackpot: {jackpotSettings.lastHitDate || 'Never'}
                </p>
              </div>
            </div>

            {/* Prize Configuration Table */}
            <div className="bg-[#1c1c1c] rounded-lg p-5 shadow-lg">
              <h2 className="text-white text-lg font-semibold mb-4">Prize Configuration</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-gray-400 text-left py-3 px-3 font-medium text-xs">COLOR</th>
                      <th className="text-gray-400 text-left py-3 px-3 font-medium text-xs">LABEL</th>
                      <th className="text-gray-400 text-left py-3 px-3 font-medium text-xs">VALUE ($)</th>
                      <th className="text-gray-400 text-left py-3 px-3 font-medium text-xs">PROBABILITY (%)</th>
                      {/* <th className="text-gray-400 text-left py-3 px-3 font-medium text-xs">ACTIONS</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {prizes.map((prize, idx) => (
                      <tr 
                        key={prize.id}
                        className={`${idx !== prizes.length - 1 ? 'border-b border-gray-800' : ''} hover:bg-[#252525] transition-colors`}
                      >
                        <td className="py-3 px-3">
                          <div 
                            className="w-8 h-8 rounded"
                            style={{ backgroundColor: prize.color }}
                          ></div>
                        </td>
                        <td className="py-3 px-3">
                          <input
                            type="text"
                            value={prize.label}
                            onChange={(e) => handlePrizeChange(prize.id, 'label', e.target.value)}
                            className="bg-[#0f0f0f] text-white text-sm px-3 py-1.5 rounded border border-gray-700 focus:border-blue-500 focus:outline-none w-28"
                          />
                        </td>
                        <td className="py-3 px-3">
                          <input
                            type="number"
                            value={prize.value}
                            onChange={(e) => handlePrizeChange(prize.id, 'value', e.target.value)}
                            className="bg-[#0f0f0f] text-white text-sm px-3 py-1.5 rounded border border-gray-700 focus:border-blue-500 focus:outline-none w-24"
                          />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              step="0.1"
                              value={prize.probability}
                              onChange={(e) => handlePrizeChange(prize.id, 'probability', e.target.value)}
                              className="bg-[#0f0f0f] text-white text-sm px-3 py-1.5 rounded border border-gray-700 focus:border-blue-500 focus:outline-none w-24"
                            />
                            <span className="text-gray-400 text-sm">%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-700">
                      <td colSpan="3" className="py-3 px-3 text-right">
                        <span className="text-white font-semibold text-sm">Total Probability:</span>
                      </td>
                      <td className="py-3 px-3">
                        <span 
                          className={`text-sm font-bold ${
                            Math.abs(totalProbability - 100) < 0.1 
                              ? 'text-green-400' 
                              : 'text-red-400'
                          }`}
                        >
                          {totalProbability.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {Math.abs(totalProbability - 100) > 0.1 && (
                <div className="mt-4 bg-red-500 bg-opacity-10 border border-red-500 rounded p-3">
                  <p className="text-red-400 text-xs">
                    ⚠️ Total probability must equal 100%. Current total: {totalProbability.toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-4">
            {/* Statistics Card */}
            <div className="bg-[#1c1c1c] rounded-lg p-5 shadow-lg">
              <h2 className="text-white text-lg font-semibold mb-4">Statistics</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <span className="text-gray-400 text-xs">Total Prizes</span>
                  <span className="text-white font-semibold text-sm">{prizes.length}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <span className="text-gray-400 text-xs">Highest Prize</span>
                  <span className="text-green-400 font-semibold text-sm">
                    {Math.max(...prizes.filter(p => typeof p.value === 'number').map(p => p.value))}$
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <span className="text-gray-400 text-xs">Lowest Win Chance</span>
                  <span className="text-yellow-400 font-semibold text-sm">
                    {Math.min(...prizes.map(p => p.probability)).toFixed(1)}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Highest Win Chance</span>
                  <span className="text-blue-400 font-semibold text-sm">
                    {Math.max(...prizes.map(p => p.probability)).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Jackpot Settings Card */}
            <div className="bg-[#1c1c1c] rounded-lg p-5 shadow-lg">
              <h2 className="text-white text-lg font-semibold mb-4">Jackpot Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Enable Jackpot</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={jackpotSettings.enabled}
                      onChange={(e) => setJackpotSettings({...jackpotSettings, enabled: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                <div>
                  <label className="text-gray-400 text-xs block mb-2">Monthly Limit</label>
                  <input
                    type="number"
                    min="1"
                    value={jackpotSettings.monthlyLimit}
                    onChange={(e) => setJackpotSettings({...jackpotSettings, monthlyLimit: parseInt(e.target.value)})}
                    className="bg-[#0f0f0f] text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none w-full"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-xs block mb-1">Last Jackpot Hit</label>
                  <p className="text-white text-sm">
                    {jackpotSettings.lastHitDate || 'Never'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleSave}
                className="w-full bg-[#E28B27] hover:bg-[#e08114] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium text-sm"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerControlPanel;