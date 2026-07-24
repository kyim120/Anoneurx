import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Award, 
  UserPlus, 
  Calendar, 
  FileText, 
  BarChart3,
  Plus,
  Crown,
  Target,
  Zap
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

const DashboardCEO = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  const companyStats = {
    totalEmployees: 500,
    totalRevenue: 50000000,
    activeProjects: 25,
    departments: 6,
    clientSatisfaction: 4.8,
    monthlyGrowth: 15,
    marketValue: 250000000
  };

  const departments = [
    { name: 'AI Development', head: 'Dr. Sarah Chen', employees: 85, budget: 12000000 },
    { name: 'Web/Mobile Dev', head: 'Mike Johnson', employees: 120, budget: 8500000 },
    { name: 'Robotics', head: 'Dr. Alex Rivera', employees: 65, budget: 15000000 },
    { name: 'Cybersecurity', head: 'Emma Wilson', employees: 45, budget: 6000000 },
    { name: 'Blockchain', head: 'David Kim', employees: 35, budget: 4500000 },
    { name: 'Networking', head: 'Lisa Anderson', employees: 40, budget: 5500000 }
  ];

  const recentActivities = [
    { type: 'hire', message: 'New department head hired for AI Development', time: '2 hours ago' },
    { type: 'project', message: 'Major client project completed ahead of schedule', time: '4 hours ago' },
    { type: 'revenue', message: 'Q4 revenue target exceeded by 20%', time: '1 day ago' },
    { type: 'partnership', message: 'Strategic partnership signed with tech giant', time: '2 days ago' }
  ];

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast("Please fill in all required fields");
      return;
    }

    // CEO can create any role
    const user = {
      id: Date.now(),
      ...newUser,
      createdAt: new Date().toISOString(),
      status: "active"
    };

    // Store user in localStorage (in production, this would be API call)
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    existingUsers.push(user);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    toast(`${newUser.role.toUpperCase()} ${newUser.name} created successfully!`);
    setNewUser({
      name: '',
      email: '',
      role: '',
      department: '',
      salary: ''
    });
    setIsAddUserOpen(false);
  };

  const allRoles = [
    { value: "ceo", label: "CEO" },
    { value: "hod", label: "Head of Department" },
    { value: "hr", label: "HR" },
    { value: "finance-manager", label: "Finance Manager" },
    { value: "content-manager", label: "Content Manager" },
    { value: "project-manager", label: "Project Manager" },
    { value: "employee", label: "Employee" },
    { value: "intern", label: "Intern" },
    { value: "student", label: "Student" },
    { value: "client", label: "Client" },
    { value: "research-collaborator", label: "Research Collaborator" },
    { value: "auditor", label: "Auditor" }
  ];

  const allDepartments = [
    { value: "ai-dev", label: "AI Development" },
    { value: "web-mobile", label: "Web & Mobile Development" },
    { value: "blockchain", label: "Blockchain" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "robotics", label: "Robotics" },
    { value: "networking", label: "Networking & Space Tech" },
    { value: "research", label: "Research & Development" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "Human Resources" },
    { value: "operations", label: "Operations" },
    { value: "marketing", label: "Marketing" }
  ];

  return (
    <div className="space-y-6">
        {/* CEO Header */}
        <Card className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-yellow-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
                  <Crown className="w-8 h-8 mr-3 text-yellow-400" />
                  Chief Executive Officer
                </h2>
                <p className="text-yellow-300 text-lg">
                  Leading Anoneurx's vision and strategic direction
                </p>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 text-sm">Company Valuation</p>
                <p className="text-white text-2xl font-bold">${(companyStats.marketValue / 1000000).toFixed(0)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-bold text-xl">{companyStats.totalEmployees}</p>
                  <p className="text-white text-sm">Total Employees</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-bold text-xl">${(companyStats.totalRevenue / 1000000).toFixed(0)}M</p>
                  <p className="text-white text-sm">Annual Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white font-bold text-xl">{companyStats.activeProjects}</p>
                  <p className="text-white text-sm">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-white font-bold text-xl">{companyStats.monthlyGrowth}%</p>
                  <p className="text-white text-sm">Monthly Growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-black/40 backdrop-blur-xl border border-gray-700/50 flex-wrap">
            <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-600">Overview</TabsTrigger>
            <TabsTrigger value="departments" className="data-[state=active]:bg-yellow-600">Departments</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-yellow-600">User Management</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-yellow-600">Analytics</TabsTrigger>
            <TabsTrigger value="kpis" className="data-[state=active]:bg-yellow-600">Strategic KPIs</TabsTrigger>
            <TabsTrigger value="hackathon" className="data-[state=active]:bg-yellow-600">Hackathon</TabsTrigger>
            <TabsTrigger value="opportunities" className="data-[state=active]:bg-yellow-600">Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Recent Company Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.message}</p>
                        <p className="text-gray-400 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Executive Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full justify-start bg-yellow-600 hover:bg-yellow-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create New User Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-white">Create New User</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-white">Full Name *</Label>
                          <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <Label htmlFor="role" className="text-white">Role *</Label>
                          <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              {allRoles.map((role) => (
                                <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="department" className="text-white">Department</Label>
                          <Select value={newUser.department} onValueChange={(value) => setNewUser({...newUser, department: value})}>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              {allDepartments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="salary" className="text-white">Salary (Optional)</Label>
                          <Input
                            id="salary"
                            type="number"
                            value={newUser.salary}
                            onChange={(e) => setNewUser({...newUser, salary: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="Annual salary"
                          />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsAddUserOpen(false)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddUser}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white"
                          >
                            Create User
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button className="w-full justify-start" variant="outline">
                    <Building2 className="w-4 h-4 mr-2" />
                    Add New Department
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Company Reports
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    Strategic Planning
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <div className="grid gap-4">
              {departments.map((dept, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{dept.name}</h3>
                        <p className="text-gray-400 text-sm mb-3">Head: {dept.head}</p>
                        <div className="flex gap-6 text-sm">
                          <span className="text-gray-400">
                            <Users className="w-4 h-4 inline mr-1" />
                            {dept.employees} employees
                          </span>
                          <span className="text-gray-400">
                            <DollarSign className="w-4 h-4 inline mr-1" />
                            ${(dept.budget / 1000000).toFixed(1)}M budget
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-white/20 text-white">
                          View Details
                        </Button>
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  As CEO, you can create and manage all user accounts across the organization.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-800/50 border-gray-600">
                    <CardContent className="p-4 text-center">
                      <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <h4 className="text-white font-semibold">CEO Access</h4>
                      <p className="text-gray-400 text-sm">Full system access</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/50 border-gray-600">
                    <CardContent className="p-4 text-center">
                      <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <h4 className="text-white font-semibold">Department Heads</h4>
                      <p className="text-gray-400 text-sm">Can manage their teams</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/50 border-gray-600">
                    <CardContent className="p-4 text-center">
                      <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h4 className="text-white font-semibold">HR Teams</h4>
                      <p className="text-gray-400 text-sm">Employee management</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Company Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Revenue Growth</span>
                      <span className="text-green-400 font-semibold">+{companyStats.monthlyGrowth}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Client Satisfaction</span>
                      <span className="text-yellow-400 font-semibold">{companyStats.clientSatisfaction}/5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Project Success Rate</span>
                      <span className="text-blue-400 font-semibold">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Strategic Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Market Position</span>
                      <span className="text-purple-400 font-semibold">Top 3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Innovation Index</span>
                      <span className="text-cyan-400 font-semibold">8.7/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Employee Retention</span>
                      <span className="text-green-400 font-semibold">95%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="kpis" className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Strategic KPIs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-300 mb-4">View comprehensive company KPIs and metrics</p>
                  <Button asChild className="bg-yellow-600 hover:bg-yellow-700">
                    <Link to="/dashboard/strategic-kpis">View Strategic KPIs Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hackathon" className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Hackathon Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-300 mb-4">Manage hackathon applications and participants</p>
                  <Button asChild className="bg-yellow-600 hover:bg-yellow-700">
                    <Link to="/dashboard/hackathon">Go to Hackathon Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Other Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button asChild variant="outline" className="border-white/20">
                    <Link to="/opportunities/fellowships">Fellowships</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/20">
                    <Link to="/opportunities/research-grants">Research Grants</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/20">
                    <Link to="/opportunities/tech-partnerships">Tech Partnerships</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/20">
                    <Link to="/opportunities/startup-incubation">Startup Incubation</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/20">
                    <Link to="/opportunities/global-exchange">Global Exchange</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </div>
  );
};

export default DashboardCEO;