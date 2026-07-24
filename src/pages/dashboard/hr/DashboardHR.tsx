import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import RoleManagement from "@/components/RoleManagement";
import InternshipManagement from "@/components/InternshipManagement";
import { 
  Users, UserPlus, Calendar, Clock, TrendingUp, Award, DollarSign, 
  FileText, AlertTriangle, Check, X, GraduationCap, Banknote, RefreshCw 
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { staffApi, leaveApi, applicationApi, paymentApi } from "@/services/api";
import { SkeletonCard, SkeletonTable } from "@/components/ui/skeleton-loaders";

interface LeaveRequest {
  _id: string;
  employeeId: string;
  employeeName?: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
}

interface Employee {
  _id: string;
  name: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  email?: string;
  phone?: string;
}

const DashboardHR = () => {
  const [user] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : { role: 'hr' };
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [hrStats, setHrStats] = useState({
    totalEmployees: 0,
    newHires: 0,
    pendingLeaves: 0,
    openPositions: 15,
    satisfaction: 4.2,
    activeInterns: 0,
    monthlyPayroll: 0
  });

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    position: '',
    salary: '',
    email: '',
    phone: ''
  });

  const [recentActivities] = useState([
    { id: 1, type: 'hire', message: 'New employee onboarded', time: '2 hours ago' },
    { id: 2, type: 'leave', message: 'Leave request submitted', time: '4 hours ago' },
    { id: 3, type: 'promotion', message: 'Performance review completed', time: '1 day ago' },
    { id: 4, type: 'review', message: 'Q4 reports finalized', time: '2 days ago' }
  ]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);

      const [staffRes, leaveRes, internsRes, payrollRes] = await Promise.all([
        staffApi.getAll({ limit: 100 }),
        leaveApi.getAll({ status: 'pending' }),
        applicationApi.getAll({ formType: 'internship', status: 'accepted' }),
        paymentApi.getStats()
      ]);

      if (staffRes.success && staffRes.data) {
        const staffData = staffRes.data as any;
        const staffList = staffData.staff || staffData.data || [];
        setEmployees(staffList);
        
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        const newHiresCount = staffList.filter(
          (e: Employee) => new Date(e.joinDate).getTime() > thirtyDaysAgo
        ).length;

        setHrStats(prev => ({
          ...prev,
          totalEmployees: staffData.total || staffList.length,
          newHires: newHiresCount
        }));
      }

      if (leaveRes.success && leaveRes.data) {
        const leaveData = leaveRes.data as any;
        setLeaveRequests(leaveData.leaves || leaveData.data || []);
        setHrStats(prev => ({
          ...prev,
          pendingLeaves: leaveData.total || 0
        }));
      }

      if (internsRes.success && internsRes.data) {
        const internsData = internsRes.data as any;
        setHrStats(prev => ({
          ...prev,
          activeInterns: internsData.total || 0
        }));
      }

      if (payrollRes.success && payrollRes.data) {
        setHrStats(prev => ({
          ...prev,
          monthlyPayroll: payrollRes.data.totalRevenue || 0
        }));
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  const handleLeaveAction = async (id: string, action: 'approved' | 'rejected') => {
    try {
      const response = await leaveApi.updateStatus(id, { status: action });
      
      if (response.success) {
        toast(`Leave request ${action} successfully!`);
        fetchDashboardData();
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      toast('Failed to update leave request');
    }
  };

  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.department || !newEmployee.position) {
      toast("Please fill in all required fields");
      return;
    }

    try {
      const response = await staffApi.create({
        name: newEmployee.name,
        email: newEmployee.email,
        phone: newEmployee.phone,
        departmentId: newEmployee.department,
        position: newEmployee.position,
        salary: parseFloat(newEmployee.salary) || 0,
        status: 'active',
        joinDate: new Date().toISOString()
      });

      if (response.success) {
        toast("Employee added successfully!");
        setIsAddEmployeeOpen(false);
        setNewEmployee({ name: '', department: '', position: '', salary: '', email: '', phone: '' });
        fetchDashboardData();
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      toast('Failed to add employee');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {[...Array(7)].map((_, i) => (
            <SkeletonCard key={i} className="h-24" />
          ))}
        </div>
        <SkeletonTable rows={5} columns={4} />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive/50 p-6">
        <div className="flex flex-col items-center gap-4">
          <AlertTriangle className="w-12 h-12 text-destructive" />
          <p className="text-destructive">{error}</p>
          <Button onClick={fetchDashboardData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-foreground font-bold text-xl">{hrStats.totalEmployees}</p>
                <p className="text-muted-foreground text-sm">Total Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserPlus className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-foreground font-bold text-xl">{hrStats.newHires}</p>
                <p className="text-muted-foreground text-sm">New Hires</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-foreground font-bold text-xl">{hrStats.pendingLeaves}</p>
                <p className="text-muted-foreground text-sm">Pending Leaves</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-foreground font-bold text-xl">{hrStats.openPositions}</p>
                <p className="text-muted-foreground text-sm">Open Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-foreground font-bold text-xl">{hrStats.satisfaction}/5</p>
                <p className="text-muted-foreground text-sm">Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-foreground font-bold text-xl">{hrStats.activeInterns}</p>
                <p className="text-muted-foreground text-sm">Active Interns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Banknote className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-foreground font-bold text-lg">
                  ${hrStats.monthlyPayroll > 0 ? (hrStats.monthlyPayroll / 1000000).toFixed(1) + 'M' : '0'}
                </p>
                <p className="text-muted-foreground text-sm">Monthly Payroll</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-card/50 border-border flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="internships">Internships</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent HR Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-foreground text-sm">{activity.message}</p>
                      <p className="text-muted-foreground text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start" variant="outline">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add New Employee
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Add New Employee</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                        <Input
                          id="name"
                          value={newEmployee.name}
                          onChange={e => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="department" className="text-foreground">Department *</Label>
                          <select
                            id="department"
                            value={newEmployee.department}
                            onChange={e => setNewEmployee(prev => ({ ...prev, department: e.target.value }))}
                            className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                          >
                            <option value="">Select Department</option>
                            <option value="Web Development">Web Development</option>
                            <option value="AI Development">AI Development</option>
                            <option value="Robotics">Robotics</option>
                            <option value="Networking">Networking</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Blockchain">Blockchain</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="position" className="text-foreground">Position *</Label>
                          <Input
                            id="position"
                            value={newEmployee.position}
                            onChange={e => setNewEmployee(prev => ({ ...prev, position: e.target.value }))}
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-foreground">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newEmployee.email}
                            onChange={e => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-foreground">Phone</Label>
                          <Input
                            id="phone"
                            value={newEmployee.phone}
                            onChange={e => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))}
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="salary" className="text-foreground">Salary</Label>
                        <Input
                          id="salary"
                          type="number"
                          value={newEmployee.salary}
                          onChange={e => setNewEmployee(prev => ({ ...prev, salary: e.target.value }))}
                          className="bg-background border-border text-foreground"
                          placeholder="Annual salary"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddEmployee} className="bg-primary hover:bg-primary/90">
                          Add Employee
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Process Payroll
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-6">
          <Card className="bg-card/50 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Leave Requests</CardTitle>
              <Button variant="outline" size="sm" onClick={fetchDashboardData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No pending leave requests</p>
                ) : (
                  leaveRequests.map(request => (
                    <div key={request._id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <p className="text-foreground font-medium">{request.employeeName || 'Employee'}</p>
                        <p className="text-muted-foreground text-sm">
                          {request.type} • {request.startDate} - {request.endDate}
                        </p>
                        {request.reason && (
                          <p className="text-muted-foreground text-xs mt-1">{request.reason}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          request.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                          request.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }>
                          {request.status}
                        </Badge>
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-400 border-green-400/30 hover:bg-green-400/10"
                              onClick={() => handleLeaveAction(request._id, 'approved')}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                              onClick={() => handleLeaveAction(request._id, 'rejected')}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <Card className="bg-card/50 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Employee Directory</CardTitle>
              <Button onClick={() => setIsAddEmployeeOpen(true)} className="bg-primary hover:bg-primary/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 text-muted-foreground font-medium">Name</th>
                      <th className="text-left p-3 text-muted-foreground font-medium">Department</th>
                      <th className="text-left p-3 text-muted-foreground font-medium">Position</th>
                      <th className="text-left p-3 text-muted-foreground font-medium">Salary</th>
                      <th className="text-left p-3 text-muted-foreground font-medium">Join Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center p-8 text-muted-foreground">
                          No employees found
                        </td>
                      </tr>
                    ) : (
                      employees.map(emp => (
                        <tr key={emp._id} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="p-3 text-foreground">{emp.name}</td>
                          <td className="p-3 text-foreground">{emp.department}</td>
                          <td className="p-3 text-foreground">{emp.position}</td>
                          <td className="p-3 text-foreground">${emp.salary?.toLocaleString() || 0}</td>
                          <td className="p-3 text-muted-foreground">
                            {new Date(emp.joinDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <RoleManagement currentUserRole={user.role} currentUserDepartment={user.department} />
        </TabsContent>

        <TabsContent value="internships" className="space-y-6">
          <InternshipManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardHR;
