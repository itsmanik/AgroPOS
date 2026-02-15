import React, { useState, useEffect } from 'react';

const DashboardPage = () => {
  // State for dashboard data (ready for API)
  const [dashboardData, setDashboardData] = useState({
    todaySales: 12450,
    billsToday: 42,
    gstCollected: 2241,
    lowStockCount: 8,
    recentBills: [
      { id: 1, billNo: '#INV-001', customer: 'Rajesh Kumar', amount: 1250, status: 'Paid', time: '10:30 AM' },
      { id: 2, billNo: '#INV-002', customer: 'Priya Singh', amount: 3450, status: 'Paid', time: '11:15 AM' },
      { id: 3, billNo: '#INV-003', customer: 'Amit Patel', amount: 850, status: 'Pending', time: '12:00 PM' },
      { id: 4, billNo: '#INV-004', customer: 'Neha Gupta', amount: 2100, status: 'Paid', time: '01:45 PM' },
      { id: 5, billNo: '#INV-005', customer: 'Vikram Mehta', amount: 950, status: 'Cancelled', time: '02:30 PM' },
      { id: 6, billNo: '#INV-006', customer: 'Sunil Kumar', amount: 1850, status: 'Paid', time: '03:15 PM' },
      { id: 6, billNo: '#INV-006', customer: 'Sunil Kumar', amount: 1850, status: 'Paid', time: '03:15 PM' },
      { id: 6, billNo: '#INV-006', customer: 'Sunil Kumar', amount: 1850, status: 'Paid', time: '03:15 PM' },
      { id: 6, billNo: '#INV-006', customer: 'Sunil Kumar', amount: 1850, status: 'Paid', time: '03:15 PM' },
      { id: 6, billNo: '#INV-006', customer: 'Sunil Kumar', amount: 1850, status: 'Paid', time: '03:15 PM' },
      { id: 6, billNo: '#INV-006', customer: 'Sunil Kumar', amount: 1850, status: 'Paid', time: '03:15 PM' },
      { id: 6, billNo: '#INV-006', customer: 'Sunil Kumar', amount: 1850, status: 'Paid', time: '03:15 PM' },
      { id: 7, billNo: '#INV-007', customer: 'Anita Desai', amount: 3200, status: 'Pending', time: '03:45 PM' },
      { id: 8, billNo: '#INV-008', customer: 'Rahul Verma', amount: 750, status: 'Paid', time: '04:00 PM' },
    ],
    lowStockItems: [
      { id: 1, name: 'Pizza Base', stock: 5, minRequired: 20, severity: 'critical' },
      { id: 2, name: 'Tomato Sauce', stock: 8, minRequired: 15, severity: 'low' },
      { id: 3, name: 'Cheese Blocks', stock: 10, minRequired: 25, severity: 'low' },
      { id: 4, name: 'Cold Drinks', stock: 12, minRequired: 30, severity: 'critical' },
      { id: 5, name: 'Chicken Wings', stock: 7, minRequired: 25, severity: 'critical' },
      { id: 6, name: 'French Fries', stock: 15, minRequired: 40, severity: 'low' },
      { id: 7, name: 'Burger Buns', stock: 20, minRequired: 50, severity: 'low' },
      { id: 8, name: 'Lettuce', stock: 5, minRequired: 15, severity: 'critical' },
    ]
  });

  // API fetch function
  const fetchDashboardData = async () => {
    try {
      // const response = await fetch('/api/dashboard');
      // const data = await response.json();
      // setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Paid: 'bg-green-100 text-green-600',
      Pending: 'bg-yellow-100 text-yellow-600',
      Cancelled: 'bg-red-100 text-red-600'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status]}`}>
        {status}
      </span>
    );
  };

  // Severity badge for low stock
  const SeverityBadge = ({ severity }) => {
    const config = {
      critical: 'bg-red-100 text-red-600',
      low: 'bg-orange-100 text-orange-600'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${config[severity]}`}>
        {severity === 'critical' ? 'Critical' : 'Low'}
      </span>
    );
  };

  // Stats Card Component with your color
  const StatCard = ({ title, value, icon, subtitle }) => {
    const primaryColor = '#2b5d45';
    
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 hover:shadow-md transition-all duration-200" style={{ borderColor: primaryColor }}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            {subtitle && <span className="text-sm" style={{ color: primaryColor }}>{subtitle}</span>}
          </div>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
            {icon}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Today Sales" 
          value={`₹${dashboardData.todaySales}`}
          icon="💰"
          subtitle="↑ 8% from yesterday"
        />
        <StatCard 
          title="Bills Today" 
          value={dashboardData.billsToday}
          icon="🧾"
          subtitle="↑ 12 from yesterday"
        />
        <StatCard 
          title="GST Collected" 
          value={`₹${dashboardData.gstCollected}`}
          icon="📊"
          subtitle="Includes CGST & SGST"
        />
        <StatCard 
          title="Low Stock Alert" 
          value={`${dashboardData.lowStockCount} items`}
          icon="⚠️"
          subtitle="Need reorder"
        />
      </div>

      {/* Recent Bills & Low Stock Items - Scrollable */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bills - Scrollable */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Bills</h2>
              <button className="text-sm font-medium hover:underline" style={{ color: '#2b5d45' }}>
                View All
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[400px] pr-2">
              <table className="w-full">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="pb-3">Bill No.</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {dashboardData.recentBills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-gray-50">
                      <td className="py-3 font-medium">{bill.billNo}</td>
                      <td>{bill.customer}</td>
                      <td>₹{bill.amount}</td>
                      <td><StatusBadge status={bill.status} /></td>
                      <td>{bill.time}</td>
                      <td>
                        <button className="hover:opacity-70 transition" style={{ color: '#2b5d45' }}>
                          <span className="text-lg">🖨️</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Low Stock Items - Now in place of Quick Actions, Scrollable */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Low Stock Items</h2>
              <button className="text-sm font-medium hover:underline" style={{ color: '#2b5d45' }}>
                Manage
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[350px] pr-2 space-y-3">
              {dashboardData.lowStockItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-3 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <SeverityBadge severity={item.severity} />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Stock: {item.stock} units</p>
                      <p className="text-xs text-gray-500">Min: {item.minRequired}</p>
                    </div>
                    <button className="text-xs font-medium hover:underline px-2 py-1" style={{ color: '#2b5d45' }}>
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;