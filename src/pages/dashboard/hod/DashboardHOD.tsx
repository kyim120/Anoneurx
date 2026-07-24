import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, DollarSign, TrendingUp, Target, Award, UserPlus, Calendar, FileText, BarChart3, Clock } from "lucide-react";
import { toast } from "@/components/ui/sonner";
const DashboardHOD = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    role: '',
    salary: ''
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);
  const getDepartmentName = (deptId: string) => {
    const departments: Record<string, string> = {
      'web-mobile': 'Web/Mobile Development',
      'ai-dev': 'AI Development',
      'robotics': 'Robotics',
      'networking': 'Networking',
      'cybersecurity': 'Cybersecurity',
      'blockchain': 'Blockchain'
    };
    return departments[deptId] || 'Unknown Department';
  };
  const departmentStats = {
    totalStaff: 15,
    hrStaff: 2,
    employees: 13,
    monthlyBudget: 350000,
    utilizationRate: 87,
    activeProjects: 4,
    avgPerformance: 4.2
  };
  const staff = [{
    id: 1,
    name: 'Alice Johnson',
    role: 'hr',
    email: 'alice@company.com',
    performance: 94,
    salary: 65000
  }, {
    id: 2,
    name: 'Bob Smith',
    role: 'employee',
    email: 'bob@company.com',
    performance: 89,
    salary: 75000
  }, {
    id: 3,
    name: 'Carol Davis',
    role: 'employee',
    email: 'carol@company.com',
    performance: 92,
    salary: 82000
  }, {
    id: 4,
    name: 'David Wilson',
    role: 'hr',
    email: 'david@company.com',
    performance: 88,
    salary: 68000
  }];
  const projects = [{
    name: 'Project Alpha',
    progress: 75,
    budget: 120000,
    team: 6,
    deadline: '2024-12-30'
  }, {
    name: 'Project Beta',
    progress: 60,
    budget: 95000,
    team: 4,
    deadline: '2025-01-15'
  }, {
    name: 'Project Gamma',
    progress: 90,
    budget: 80000,
    team: 3,
    deadline: '2024-12-25'
  }];
  const interns = [{
    id: 1,
    name: 'Emma Brown',
    university: 'MIT',
    startDate: '2024-06-01',
    mentor: 'Bob Smith',
    performance: 85
  }, {
    id: 2,
    name: 'Frank Miller',
    university: 'Stanford',
    startDate: '2024-07-01',
    mentor: 'Carol Davis',
    performance: 90
  }, {
    id: 3,
    name: 'Grace Lee',
    university: 'Berkeley',
    startDate: '2024-08-01',
    mentor: 'Bob Smith',
    performance: 88
  }];
  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.role) {
      toast("Please fill in all required fields");
      return;
    }

    // Simulate adding staff
    toast(`${newStaff.role.toUpperCase()} ${newStaff.name} added successfully!`);
    setNewStaff({
      name: '',
      email: '',
      role: '',
      salary: ''
    });
    setIsAddStaffOpen(false);
  };
  return <DashboardLayout title={`HOD Dashboard - ${userInfo?.department ? getDepartmentName(userInfo.department) : 'Department'}`}>
      <div className="space-y-6">
        {/* Department Header */}
        <Card className="bg-white/10 border-purple-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Head of {userInfo?.department ? getDepartmentName(userInfo.department) : 'Department'}
                </h2>
                <p className="text-purple-300">
                  Managing departmental operations, staff, and projects
                </p>
              </div>
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white font-bold text-xl">{departmentStats.totalStaff}</p>
                  <p className="text-white text-sm">Total Staff</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-bold text-xl">${(departmentStats.monthlyBudget / 1000).toFixed(0)}K</p>
                  <p className="text-white text-sm">Monthly Budget</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-bold text-xl">{departmentStats.activeProjects}</p>
                  <p className="text-white text-sm">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-white font-bold text-xl">{departmentStats.avgPerformance}/5</p>
                  <p className="text-white text-sm">Avg Performance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/10 border-gray-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="hackathon">Hackathon</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Department Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {staff.map((member) => (
                      <div key={member.id} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">{member.name}</p>
                          <p className="text-gray-400 text-sm">{member.role}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                          {member.performance}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects.map((project, idx) => (
                      <div key={idx} className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-white font-semibold">{project.name}</p>
                          <span className="text-gray-400 text-sm">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Department Staff Management</h3>
              <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Staff
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add New Staff Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input
                        id="name"
                        value={newStaff.name}
                        onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newStaff.email}
                        onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role" className="text-white">Role</Label>
                      <Select value={newStaff.role} onValueChange={(value) => setNewStaff({...newStaff, role: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="employee">Employee</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="salary" className="text-white">Salary</Label>
                      <Input
                        id="salary"
                        type="number"
                        value={newStaff.salary}
                        onChange={(e) => setNewStaff({...newStaff, salary: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>Cancel</Button>
                      <Button onClick={handleAddStaff} className="bg-purple-600 hover:bg-purple-700">Add Staff</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Card className="bg-white/10 border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {staff.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="text-white font-semibold">{member.name}</p>
                        <p className="text-gray-400 text-sm">{member.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">{member.role}</Badge>
                        <span className="text-green-400">${member.salary.toLocaleString()}</span>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hackathon" className="space-y-6">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Hackathon Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-300 mb-4">View and manage hackathon participants from your department</p>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <Link to="/dashboard/hackathon">Go to Hackathon Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Department Opportunities</CardTitle>
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>;
};
export default DashboardHOD;