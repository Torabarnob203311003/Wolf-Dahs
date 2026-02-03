const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
        <p className="text-gray-400 text-sm mb-1">Total Sponsors</p>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
        <p className="text-gray-400 text-sm mb-1">Platinum Tier</p>
        <p className="text-2xl font-bold text-gray-300">{stats.platinum}</p>
      </div>
      <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
        <p className="text-gray-400 text-sm mb-1">Gold Tier</p>
        <p className="text-2xl font-bold text-[#E7B20E]">{stats.gold}</p>
      </div>
      <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
        <p className="text-gray-400 text-sm mb-1">Silver Tier</p>
        <p className="text-2xl font-bold text-gray-400">{stats.silver}</p>
      </div>
    </div>
  );
};

export default Stats;
