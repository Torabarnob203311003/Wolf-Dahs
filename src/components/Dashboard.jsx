import { useState } from 'react';
import { Users, Ticket, Package, Trophy, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const MetricCard = ({ title, value, icon: Icon, bgColor, isCompleted = false }) => {
  return (
    <div className="bg-[#1c1c1c] rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <span className="text-gray-400 text-xs font-normal">{title}</span>
          {isCompleted ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium inline-block w-fit">
              Completed
            </span>
          ) : (
            <span className="text-white text-2xl font-semibold">
              {value?.toLocaleString()}
            </span>
          )}
        </div>
        <div className={`${bgColor} rounded-md p-2 shadow-md`}>
          <Icon className="text-white" size={18} />
        </div>
      </div>
    </div>
  );
};

const ChartCard = () => {
  const [activeTab, setActiveTab] = useState('Monthly');
  
  const chartData = [
    { month: 'Jan', new: 100, old: 150 },
    { month: 'Feb', new: 200, old: 180 },
    { month: 'Mar', new: 350, old: 280 },
    { month: 'Apr', new: 300, old: 250 },
    { month: 'May', new: 400, old: 320 },
    { month: 'Jun', new: 380, old: 300 },
    { month: 'Jul', new: 420, old: 350 },
    { month: 'Aug', new: 450, old: 380 },
    { month: 'Sep', new: 380, old: 320 },
    { month: 'Oct', new: 420, old: 360 },
    { month: 'Nov', new: 460, old: 400 },
    { month: 'Dec', new: 500, old: 450 }
  ];

  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  return (
    <div className="bg-[#1c1c1c] rounded-lg p-5 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-white text-lg font-semibold mb-0.5">Dashboard</h2>
          <p className="text-gray-500 text-xs">Overview of Latest Month</p>
          <div className="mt-3">
            <span className="text-gray-500 text-xs">User Growth</span>
            <div className="text-green-400 text-base font-semibold">+15%</div>
          </div>
        </div>
        <div className="flex gap-0.5 bg-[#0f0f0f] rounded-md p-0.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeTab === tab
                  ? 'bg-[#2a2a2a] text-white'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
          <span className="text-gray-500 text-xs">New</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
          <span className="text-gray-500 text-xs">Old</span>
        </div>
      </div>

      <div className="h-56 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#2a2a2a" 
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 11 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              domain={[0, 500]}
              ticks={[0, 100, 200, 300, 400, 500]}
            />
            <Line 
              type="monotone" 
              dataKey="new" 
              stroke="#fb923c" 
              strokeWidth={2.5}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="old" 
              stroke="#60a5fa" 
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
    </div>
  );
};

const RecentActivityTable = () => {
  const activities = [
    {
      id: 1,
      name: "Savannah Nguyen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c927aba5?w=32&h=32&fit=crop&crop=face&auto=format",
      ticketId: "#000095",
      purchaseDate: "10am - 10/04/2025",
      amount: "$23"
    },
    {
      id: 2,
      name: "Annette Black",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face&auto=format",
      ticketId: "#087423",
      purchaseDate: "5:00pm - 20/05/2025",
      amount: "$13"
    },
    {
      id: 3,
      name: "Cody Fisher",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format",
      ticketId: "#006468",
      purchaseDate: "4:00pm - 05/04/2025",
      amount: "$10"
    },
    {
      id: 4,
      name: "Brooklyn Simmons",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face&auto=format",
      ticketId: "#006684",
      purchaseDate: "3:00pm - 17/04/2025",
      amount: "$23"
    },
    {
      id: 5,
      name: "Ralph Edwards",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format",
      ticketId: "#006548",
      purchaseDate: "10:05pm - 08/08/2025",
      amount: "$23"
    }
  ];

  return (
    <div className="bg-[#1c1c1c] rounded-lg p-5 shadow-lg">
      <h3 className="text-white text-base font-semibold mb-4">Recent Activity</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-gray-500 text-left py-2.5 px-3 font-medium text-xs">NO</th>
              <th className="text-gray-500 text-left py-2.5 px-3 font-medium text-xs">Name</th>
              <th className="text-gray-500 text-left py-2.5 px-3 font-medium text-xs">Ticket ID</th>
              <th className="text-gray-500 text-left py-2.5 px-3 font-medium text-xs">Purchase Date</th>
              <th className="text-gray-500 text-left py-2.5 px-3 font-medium text-xs">Amount</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr 
                key={activity.id} 
                className={`${idx !== activities.length - 1 ? 'border-b border-gray-800' : ''} hover:bg-[#252525] transition-colors`}
              >
                <td className="py-3 px-3">
                  <span className="text-white text-xs">{activity.id}</span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={activity.avatar} 
                      alt={activity.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-white text-xs">{activity.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="text-white text-xs">{activity.ticketId}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-white text-xs">{activity.purchaseDate}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-white text-xs">{activity.amount}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function Dashboard() {
  const metrics = [
    {
      title: 'Total User',
      value: 45586,
      icon: Users,
      bgColor: 'bg-yellow-500'
    },
    {
      title: 'Total Tickets Sold',
      value: 5454,
      icon: Ticket,
      bgColor: 'bg-red-500'
    },
    {
      title: 'Available Tickets',
      value: 26845,
      icon: Package,
      bgColor: 'bg-blue-500'
    }
  ];

  const additionalMetrics = [
    {
      title: 'Total Winner',
      value: 58320,
      icon: Trophy,
      bgColor: 'bg-yellow-500'
    },
    {
      title: 'Total Earning',
      value: 152181180,
      icon: DollarSign,
      bgColor: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen w-full p-4">
      {/* Top Metrics Row - 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            bgColor={metric.bgColor}
            isCompleted={metric.isCompleted}
          />
        ))}
      </div>

      {/* Chart and Additional Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <ChartCard />
        </div>
        <div className="flex flex-col gap-3 h-full">
          {additionalMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              bgColor={metric.bgColor}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity Table */}
      <RecentActivityTable />
    </div>
  );
}

export default Dashboard;