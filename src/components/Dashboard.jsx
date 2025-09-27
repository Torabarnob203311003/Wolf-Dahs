import React, { useState } from 'react';
import { Users, Ticket, Package, Trophy, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const MetricCard = ({ title, value, icon: Icon, bgColor, isCompleted = false }) => {
  return (
    <div className="bg-[#282727] border border-gray-600 rounded-lg p-4 h-28">
      <div className="flex justify-between items-start h-full">
        <div className="flex flex-col justify-between h-full">
          <span className="text-gray-400 text-sm">{title}</span>
          {isCompleted ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Completed
            </span>
          ) : (
            <span className="text-white text-2xl font-bold">
              {value.toLocaleString()}
            </span>
          )}
        </div>
        <div className={`${bgColor} rounded-lg p-2 w-10 h-10 flex items-center justify-center`}>
          <Icon className="text-white" size={20} />
        </div>
      </div>
    </div>
  );
};

const ChartCard = () => {
  const [activeTab, setActiveTab] = useState('Monthly');
  
  const chartData = [
    { month: 'Jan', new: 280, old: 200 },
    { month: 'Feb', new: 320, old: 220 },
    { month: 'Mar', new: 450, old: 280 },
    { month: 'Apr', new: 380, old: 250 },
    { month: 'May', new: 480, old: 300 },
    { month: 'Jun', new: 420, old: 280 },
    { month: 'Jul', new: 380, old: 250 },
    { month: 'Aug', new: 350, old: 220 },
    { month: 'Sep', new: 320, old: 200 },
    { month: 'Oct', new: 400, old: 260 },
    { month: 'Nov', new: 450, old: 300 },
    { month: 'Dec', new: 480, old: 320 }
  ];

  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  return (
    <div className="bg-[#282727] border border-gray-600 rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-white text-xl font-semibold mb-1">Dashboard</h2>
          <p className="text-gray-400 text-sm">Overview of Latest Month</p>
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-400 text-sm">User Growth</span>
            </div>
            <span className="text-green-400 text-lg font-semibold">+15%</span>
          </div>
        </div>
        <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-gray-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-400"></div>
          <span className="text-gray-400 text-sm">New</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          <span className="text-gray-400 text-sm">Old</span>
        </div>
      </div>

      <div className="h-64 bg-[#282727] rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              domain={[0, 500]}
              ticks={[0, 100, 200, 300, 400, 500]}
            />
            <Line 
              type="monotone" 
              dataKey="new" 
              stroke="#FB923C" 
              strokeWidth={3}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="old" 
              stroke="#60A5FA" 
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <button className="mt-4 bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors">
        Last Month Summary
      </button>
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
    <div className="bg-[#282727] border border-gray-600 rounded-lg p-6">
      <h3 className="text-white text-lg font-semibold mb-6">Recent Activity</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-gray-400 text-left py-3 px-4 font-medium text-sm">NO</th>
              <th className="text-gray-400 text-left py-3 px-4 font-medium text-sm">Name</th>
              <th className="text-gray-400 text-left py-3 px-4 font-medium text-sm">Ticket ID</th>
              <th className="text-gray-400 text-left py-3 px-4 font-medium text-sm">Purchase Date</th>
              <th className="text-gray-400 text-left py-3 px-4 font-medium text-sm">Amount</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                <td className="py-4 px-4">
                  <span className="text-white text-sm">{activity.id}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={activity.avatar} 
                      alt={activity.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-white text-sm">{activity.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-white text-sm">{activity.ticketId}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-white text-sm">{activity.purchaseDate}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-white text-sm">{activity.amount}</span>
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
    },
    {
      title: 'Winner Announcement',
      value: 0,
      icon: Trophy,
      bgColor: 'bg-yellow-500',
      isCompleted: true
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
    <div className="h-full min-h-screen w-full p-2">
      {/* Top Metrics Row */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ChartCard />
        </div>
        <div className="space-y-6">
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
      <div className="mt-6">
        <RecentActivityTable />
      </div>
    </div>
  );
}

export default Dashboard;