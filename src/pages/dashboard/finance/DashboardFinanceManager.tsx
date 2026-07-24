
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, TrendingUp, Users, Building, 
  CreditCard, Target, PieChart, BarChart3,
  Plus, Edit, Save, Download
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardFinanceManager = () => {
  const [featurePrices, setFeaturePrices] = useState({
    webDevelopment: 5999,
    mobileApp: 7999,
    windowsApps: 6999,
    gameDevelopment: 12999,
    roboticsAutomation: 15999,
    personalAI: 8999,
    enterpriseSoftware: 25999,
    iotSolutions: 11999
  });

  const [collaborationPrices, setCollaborationPrices] = useState({
    publishResearchPapers: 299,
    projectShowcase: 149,
    technicalWriting: 99,
    openSourceProjects: 79,
    innovationLabs: 499
  });

  const [salaries, setSalaries] = useState([
    { id: 1, name: "John CEO", role: "CEO", department: "Executive", salary: 150000, status: "paid" },
    { id: 2, name: "Alice HR", role: "HR Manager", department: "Human Resources", salary: 85000, status: "pending" },
    { id: 3, name: "Bob Tech", role: "HOD", department: "AI Development", salary: 120000, status: "paid" },
    { id: 4, name: "Carol Dev", role: "Employee", department: "Web Development", salary: 75000, status: "pending" },
  ]);

  const handlePriceUpdate = (category: string, type: string, value: number) => {
    if (type === 'features') {
      setFeaturePrices(prev => ({ ...prev, [category]: value }));
    } else {
      setCollaborationPrices(prev => ({ ...prev, [category]: value }));
    }
    toast(`${category} price updated successfully!`);
  };

  const handleSalaryPayment = (id: number) => {
    setSalaries(prev => prev.map(emp => 
      emp.id === id ? { ...emp, status: 'paid' } : emp
    ));
    toast("Salary payment processed successfully!");
  };

  return (
    <DashboardLayout title="Finance Management">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-white/10 border-green-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Finance Management Dashboard</h2>
                <p className="text-green-300">Manage pricing, salaries, and financial operations</p>
              </div>
              <DollarSign className="w-16 h-16 text-green-400" />
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white">$125,430</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Expenses</p>
                  <p className="text-2xl font-bold text-white">$89,250</p>
                </div>
                <BarChart3 className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Net Profit</p>
                  <p className="text-2xl font-bold text-white">$36,180</p>
                </div>
                <PieChart className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Payments</p>
                  <p className="text-2xl font-bold text-white">$12,450</p>
                </div>
                <CreditCard className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="features" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-black/20">
            <TabsTrigger value="features">Features Pricing</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration Pricing</TabsTrigger>
            <TabsTrigger value="salaries">Salary Management</TabsTrigger>
            <TabsTrigger value="investments">Investment</TabsTrigger>
          </TabsList>

          {/* Features Pricing */}
          <TabsContent value="features" className="space-y-4">
            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Features Pricing Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(featurePrices).map(([key, price]) => (
                    <Card key={key} className="bg-white/5 border-gray-600">
                      <CardContent className="p-4">
                        <h3 className="text-white font-semibold mb-2 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-gray-300">Price ($)</Label>
                            <Input
                              type="number"
                              value={price}
                              onChange={(e) => setFeaturePrices(prev => ({ 
                                ...prev, 
                                [key]: Number(e.target.value) 
                              }))}
                              className="bg-white/20 border-white/30 text-white"
                            />
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => handlePriceUpdate(key, 'features', price)}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Update Price
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collaboration Pricing */}
          <TabsContent value="collaboration" className="space-y-4">
            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Collaboration Pricing Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(collaborationPrices).map(([key, price]) => (
                    <Card key={key} className="bg-white/5 border-gray-600">
                      <CardContent className="p-4">
                        <h3 className="text-white font-semibold mb-2 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-gray-300">Price ($)</Label>
                            <Input
                              type="number"
                              value={price}
                              onChange={(e) => setCollaborationPrices(prev => ({ 
                                ...prev, 
                                [key]: Number(e.target.value) 
                              }))}
                              className="bg-white/20 border-white/30 text-white"
                            />
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => handlePriceUpdate(key, 'collaboration', price)}
                            className="w-full bg-green-600 hover:bg-green-700"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Update Price
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Salary Management */}
          <TabsContent value="salaries" className="space-y-4">
            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Salary Management
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Payroll
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salaries.map((employee) => (
                    <Card key={employee.id} className="bg-white/5 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">{employee.name}</h3>
                              <p className="text-gray-300 text-sm">{employee.role} - {employee.department}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-white font-semibold">${employee.salary.toLocaleString()}</p>
                              <Badge 
                                className={employee.status === 'paid' ? 'bg-green-600' : 'bg-yellow-600'}
                              >
                                {employee.status}
                              </Badge>
                            </div>
                            
                            {employee.status === 'pending' && (
                              <Button
                                size="sm"
                                onClick={() => handleSalaryPayment(employee.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Pay Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investment Management */}
          <TabsContent value="investments" className="space-y-4">
            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Investment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/5 border-gray-600">
                    <CardContent className="p-4">
                      <h3 className="text-white font-semibold mb-4">Investment Opportunities</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">AI Research Fund</span>
                          <Badge className="bg-blue-600">$50,000</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Equipment Upgrade</span>
                          <Badge className="bg-purple-600">$25,000</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Marketing Campaign</span>
                          <Badge className="bg-green-600">$15,000</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-gray-600">
                    <CardContent className="p-4">
                      <h3 className="text-white font-semibold mb-4">Investment Returns</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Q1 2024 Returns</span>
                          <Badge className="bg-green-600">+12.5%</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Annual Growth</span>
                          <Badge className="bg-blue-600">+18.2%</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Portfolio Value</span>
                          <Badge className="bg-purple-600">$485,000</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardFinanceManager;
