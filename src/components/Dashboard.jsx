import { useEffect, useState } from 'react';
import { Users, Ticket, Package, Trophy, DollarSign, Loader2, Activity, TrendingUp, Zap, Clock  } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import axiosSecure from '../lib/axiosSecure';

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
  const [activeTab, setActiveTab] = useState("Monthly");
  const [chartData, setChartData] = useState([]);
  const [growth, setGrowth] = useState("0%");
  const tabs = ["Daily", "Weekly", "Monthly", "Yearly"];

  // 🔹 Fetch user growth data
  const fetchUserGrowth = async (range) => {
    try {
      const response = await axiosSecure.get(`/overview/user-growth?range=${range.toLowerCase()}`);
      const { stats, growthPercentage } = response.data.data;
      console.log(stats, growthPercentage);
      
      // Normalize for Recharts (ensure consistent key names)
      const formatted = stats.map((item) => ({
        month: item.period,
        new: item.new,
        old: item.old,
      }));

      setChartData(formatted);
      setGrowth(growthPercentage);
    } catch (err) {
      console.error("❌ Cannot fetch user growth:", err);
      setChartData([]);
      setGrowth("0%");
    }
  };

  // 🔹 Fetch on mount & tab change
  useEffect(() => {
    fetchUserGrowth(activeTab);
  }, [activeTab]);

  return (
    <div className="bg-[#1c1c1c] rounded-lg p-5 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-white text-lg font-semibold mb-0.5">Dashboard</h2>
          <p className="text-gray-500 text-xs">Overview of Latest Month</p>
          <div className="mt-3">
            <span className="text-gray-500 text-xs">User Growth</span>
            <div className="text-green-400 text-base font-semibold">{growth}</div>
          </div>
        </div>
        <div className="flex gap-0.5 bg-[#0f0f0f] rounded-md p-0.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeTab === tab
                  ? "bg-[#2a2a2a] text-white"
                  : "text-gray-500 hover:text-white"
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
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 11 }}
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





const RecentActivityFeed = () => {
  const [activitiesData, setActivitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Get icon, color and extracted info based on activity title/message
  const getActivityConfig = (title, message) => {
    const lowerTitle = title.toLowerCase();
    const lowerMessage = message.toLowerCase();
    
    // Extract user name from message
    const userNameMatch = message.match(/^(.+?)\s+has/);
    const userName = userNameMatch ? userNameMatch[1] : 'User';
    
    // Extract amount if present
    const amountMatch = message.match(/(\d+)\s+credit/);
    const amount = amountMatch ? amountMatch[1] : null;
    
    if (lowerTitle.includes('top up') || lowerMessage.includes('top up')) {
      return {
        icon: <Zap size={20} />,
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/30',
        text: 'Topped up credits',
        category: 'Top Up',
        userName,
        amount
      };
    } else if (lowerTitle.includes('ticket') || lowerMessage.includes('ticket')) {
      return {
        icon: <Ticket size={20} />,
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
        text: 'Purchased tickets',
        category: 'Ticket',
        userName,
        amount
      };
    } else if (lowerTitle.includes('spin') || lowerMessage.includes('spin')) {
      return {
        icon: <Activity size={20} />,
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
        text: 'Spun the wheel',
        category: 'Spin',
        userName,
        amount
      };
    } else if (lowerTitle.includes('sign up') || lowerMessage.includes('sign up')) {
      return {
        icon: <Users size={20} />,
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        text: 'Joined the platform',
        category: 'Sign Up',
        userName,
        amount
      };
    } else {
      return {
        icon: <TrendingUp size={20} />,
        color: 'from-gray-500 to-gray-600',
        bgColor: 'bg-gray-500/10',
        borderColor: 'border-gray-500/30',
        text: 'Activity',
        category: 'General',
        userName,
        amount
      };
    }
  };

  // Format timestamp to relative time
  const getRelativeTime = (dateString) => {
    const now = new Date();
    const activityDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - activityDate) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return activityDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const fetchRecentActivity = async () => {
    try {
      setLoading(true);
      const data = await axiosSecure.get(`/recent-activities`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setActivitiesData(data.data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-lg font-semibold">Recent Activity</h3>
        </div>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-yellow-500" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
            <Activity className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">Recent Activity</h3>
            <p className="text-gray-400 text-xs">Live updates from your platform</p>
          </div>
        </div>
        {/* <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs font-medium">Live</span>
        </div> */}
      </div>
      
      {/* Activities List */}
      {activitiesData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Activity className="text-gray-600 mb-3" size={48} />
          <p className="text-gray-400 text-sm">No recent activities</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activitiesData.map((activity) => {
            const config = getActivityConfig(activity.title, activity.message);
            
            return (
              <div 
                key={activity._id}
                className="bg-gradient-to-r from-[#252525] to-[#1f1f1f] rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 group relative overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative flex items-start gap-4">
                  {/* Activity Icon */}
                  <div className={`bg-gradient-to-br ${config.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {config.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                            {config.category}
                          </span>
                        </div>
                        <p className="text-white font-medium text-sm leading-tight">
                          <span className="text-yellow-400">{config.userName}</span>
                          <span className="text-gray-400 ml-1">{config.text}</span>
                        </p>
                      </div>
                      
                      {/* Amount Badge */}
                      {config.amount && (
                        <div className={`${config.bgColor} border ${config.borderColor} px-3 py-1 rounded-lg`}>
                          <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent font-bold text-sm`}>
                            {config.amount} credits
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Message */}
                    <p className="text-gray-400 text-xs leading-relaxed mb-3">
                      {activity.message}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{getRelativeTime(activity.createdAt)}</span>
                      </div>
                      
                      {/* Status Indicator */}
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-green-400 text-xs font-medium">Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    
    </div>
  );
};

function Dashboard() {
  const [metricData, setMetricData] = useState();

  const metrics = [
    {
      title: 'Total User',
      value: metricData?.totalUsers,
      icon: Users,
      bgColor: 'bg-yellow-500'
    },
    {
      title: 'Total Tickets Sold',
      value: metricData?.totalTicketSold,
      icon: Ticket,
      bgColor: 'bg-red-500'
    },
    {
      title: 'Available Tickets',
      value: metricData?.totalAvailableTickets,
      icon: Package,
      bgColor: 'bg-blue-500'
    }
  ];

  const additionalMetrics = [
    {
      title: 'Total Winner',
      value: metricData?.totalWinner,
      icon: Trophy,
      bgColor: 'bg-yellow-500'
    },
    {
      title: 'Total Earning',
      value: metricData?.totalEarnings,
      icon: DollarSign,
      bgColor: 'bg-green-500'
    }
  ];

  const fetchMetrics = async () =>{
    try {
      const response = await axiosSecure.get('/overview');
      setMetricData(response.data.data);
    }catch(err){
      console.error("Error fetching metrics:", err);
    }
  }

  useEffect(()=>{
    fetchMetrics();
  }, []);

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
      <RecentActivityFeed />
    </div>
  );
}

export default Dashboard;