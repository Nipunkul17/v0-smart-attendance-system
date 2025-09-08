"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  GraduationCap,
  UserCheck,
  Shield,
  Calendar,
  MapPin,
  Wifi,
  FileText,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  BarChart3,
  Settings,
  Clock,
} from "lucide-react"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showClassDialog, setShowClassDialog] = useState(false)
  const [showEventDialog, setShowEventDialog] = useState(false)

  const adminData = {
    name: "Admin User",
    adminId: "ADMIN001",
    systemStats: {
      totalStudents: 187,
      totalFaculty: 12,
      totalClasses: 8,
      activeEvents: 3,
      pendingApprovals: 15,
      systemUptime: "99.8%",
    },
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@university.edu",
        role: "student",
        enrollmentNo: "CS2021001",
        class: "CS-2021-A",
        status: "active",
        lastLogin: "2024-01-10 09:30 AM",
      },
      {
        id: 2,
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@university.edu",
        role: "faculty",
        facultyId: "FAC001",
        department: "Computer Science",
        status: "active",
        lastLogin: "2024-01-10 08:15 AM",
      },
      {
        id: 3,
        name: "Jane Smith",
        email: "jane.smith@university.edu",
        role: "student",
        enrollmentNo: "CS2021002",
        class: "CS-2021-A",
        status: "inactive",
        lastLogin: "2024-01-08 02:45 PM",
      },
    ],
    classes: [
      {
        id: 1,
        name: "Computer Science 2021 - Section A",
        code: "CS-2021-A",
        room: "Room 101",
        wifiSSID: "CS_LAB_101",
        students: 45,
        faculty: "Dr. Sarah Johnson",
        coordinates: { lat: 40.7128, lng: -74.006 },
      },
      {
        id: 2,
        name: "Computer Science 2021 - Section B",
        code: "CS-2021-B",
        room: "Room 203",
        wifiSSID: "CS_LAB_203",
        students: 42,
        faculty: "Dr. Michael Brown",
        coordinates: { lat: 40.713, lng: -74.0062 },
      },
    ],
    events: [
      {
        id: 1,
        title: "Tech Symposium",
        date: "2024-01-15",
        startTime: "09:00",
        endTime: "17:00",
        associatedSubject: "Web Development",
        registeredStudents: 78,
        status: "upcoming",
      },
      {
        id: 2,
        title: "Coding Competition",
        date: "2024-01-20",
        startTime: "10:00",
        endTime: "16:00",
        associatedSubject: "Data Structures",
        registeredStudents: 65,
        status: "upcoming",
      },
    ],
    pendingApprovals: [
      {
        id: 1,
        type: "emergency_leave",
        studentName: "John Doe",
        enrollmentNo: "CS2021001",
        subject: "Data Structures",
        date: "2024-01-10",
        reason: "Medical emergency",
        submittedAt: "2024-01-10 08:30 AM",
        status: "pending",
      },
      {
        id: 2,
        type: "late_attendance",
        studentName: "Mike Johnson",
        enrollmentNo: "CS2021003",
        subject: "Database Systems",
        timestamp: "2024-01-10 09:15 AM",
        reason: "Late submission after code expired",
        status: "pending",
      },
    ],
    auditLogs: [
      {
        id: 1,
        action: "Attendance Marked",
        actor: "John Doe (CS2021001)",
        timestamp: "2024-01-10 09:05 AM",
        details: "Data Structures - Room 101",
        ipAddress: "192.168.1.100",
        status: "success",
      },
      {
        id: 2,
        action: "Code Generated",
        actor: "Dr. Sarah Johnson (FAC001)",
        timestamp: "2024-01-10 09:00 AM",
        details: "Code: 123456 - Valid until 09:10 AM",
        ipAddress: "192.168.1.50",
        status: "success",
      },
      {
        id: 3,
        action: "Failed Login Attempt",
        actor: "Unknown User",
        timestamp: "2024-01-10 08:45 AM",
        details: "Invalid credentials for CS2021999",
        ipAddress: "192.168.1.200",
        status: "failed",
      },
    ],
  }

  const handleUserAction = (action: string, userId?: number) => {
    console.log(`${action} user:`, userId)
    // Handle user management actions
  }

  const handleApproval = (approvalId: number, action: "approve" | "reject") => {
    console.log(`${action} approval:`, approvalId)
    // Handle approval actions
  }

  const exportReport = (type: string) => {
    console.log(`Exporting ${type} report`)
    // Handle report export
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "success":
        return "text-green-600"
      case "failed":
        return "text-red-600"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "student":
        return <GraduationCap className="h-4 w-4" />
      case "faculty":
        return <UserCheck className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">System administration and management</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              <Shield className="h-3 w-3 mr-1" />
              {adminData.adminId}
            </Badge>
            <Badge className="text-sm bg-red-100 text-red-800">Administrator</Badge>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{adminData.systemStats.totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{adminData.systemStats.totalFaculty}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{adminData.systemStats.totalClasses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{adminData.systemStats.activeEvents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{adminData.systemStats.pendingApprovals}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{adminData.systemStats.systemUptime}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="classes">Classes & Rooms</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage students, faculty, and admin users</CardDescription>
                  </div>
                  <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>Create a new user account</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Enter full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Enter email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="faculty">Faculty</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="id-number">ID Number</Label>
                          <Input id="id-number" placeholder="Enrollment/Faculty ID" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="class">Class (Students only)</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CS-2021-A">CS-2021-A</SelectItem>
                              <SelectItem value="CS-2021-B">CS-2021-B</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department (Faculty only)</Label>
                          <Input id="department" placeholder="Enter department" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setShowUserDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowUserDialog(false)}>Create User</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminData.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getRoleIcon(user.role)}
                            <span className="capitalize">{user.role}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.role === "student" ? user.enrollmentNo : user.facultyId}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes & Rooms */}
          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Classes & Room Configuration</CardTitle>
                    <CardDescription>Manage classrooms, Wi-Fi settings, and geolocation</CardDescription>
                  </div>
                  <Dialog open={showClassDialog} onOpenChange={setShowClassDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Class
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Class</DialogTitle>
                        <DialogDescription>Configure a new classroom</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="class-name">Class Name</Label>
                          <Input id="class-name" placeholder="e.g., Computer Science 2021 - Section A" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="class-code">Class Code</Label>
                          <Input id="class-code" placeholder="e.g., CS-2021-A" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="room">Room Number</Label>
                          <Input id="room" placeholder="e.g., Room 101" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="wifi-ssid">Wi-Fi SSID</Label>
                          <Input id="wifi-ssid" placeholder="e.g., CS_LAB_101" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="latitude">Latitude</Label>
                          <Input id="latitude" type="number" step="any" placeholder="40.7128" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="longitude">Longitude</Label>
                          <Input id="longitude" type="number" step="any" placeholder="-74.0060" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="assigned-faculty">Assigned Faculty</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select faculty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="FAC001">Dr. Sarah Johnson</SelectItem>
                              <SelectItem value="FAC002">Dr. Michael Brown</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="capacity">Student Capacity</Label>
                          <Input id="capacity" type="number" placeholder="50" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setShowClassDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowClassDialog(false)}>Create Class</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.classes.map((classItem) => (
                    <div key={classItem.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-medium">{classItem.name}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{classItem.room}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Wifi className="h-4 w-4 text-muted-foreground" />
                              <span>{classItem.wifiSSID}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{classItem.students} students</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <UserCheck className="h-4 w-4 text-muted-foreground" />
                              <span>{classItem.faculty}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Coordinates: {classItem.coordinates.lat}, {classItem.coordinates.lng}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Event Management</CardTitle>
                    <CardDescription>Manage events that count towards attendance</CardDescription>
                  </div>
                  <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Event</DialogTitle>
                        <DialogDescription>Set up an event that counts towards attendance</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="event-title">Event Title</Label>
                          <Input id="event-title" placeholder="e.g., Tech Symposium" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event-date">Date</Label>
                          <Input id="event-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="associated-subject">Associated Subject</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="data-structures">Data Structures</SelectItem>
                              <SelectItem value="database-systems">Database Systems</SelectItem>
                              <SelectItem value="web-development">Web Development</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="start-time">Start Time</Label>
                          <Input id="start-time" type="time" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-time">End Time</Label>
                          <Input id="end-time" type="time" />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="event-description">Description</Label>
                          <Textarea id="event-description" placeholder="Event description..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="max-participants">Max Participants</Label>
                          <Input id="max-participants" type="number" placeholder="100" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="Event location" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowEventDialog(false)}>Create Event</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.events.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{event.title}</h3>
                            <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                {event.startTime} - {event.endTime}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>{event.associatedSubject}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{event.registeredStudents} registered</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Approvals */}
          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Review and approve emergency leaves and late attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.pendingApprovals.map((approval) => (
                    <div key={approval.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{approval.studentName}</h3>
                            <Badge variant="outline">{approval.enrollmentNo}</Badge>
                            <Badge
                              className={
                                approval.type === "emergency_leave"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {approval.type === "emergency_leave" ? "Emergency Leave" : "Late Attendance"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>
                              <strong>Subject:</strong> {approval.subject}
                            </p>
                            {approval.type === "emergency_leave" ? (
                              <>
                                <p>
                                  <strong>Date:</strong> {approval.date}
                                </p>
                                <p>
                                  <strong>Reason:</strong> {approval.reason}
                                </p>
                                <p>
                                  <strong>Submitted:</strong> {approval.submittedAt}
                                </p>
                              </>
                            ) : (
                              <>
                                <p>
                                  <strong>Timestamp:</strong> {approval.timestamp}
                                </p>
                                <p>
                                  <strong>Reason:</strong> {approval.reason}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {approval.type === "emergency_leave" && (
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Proof
                            </Button>
                          )}
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproval(approval.id, "approve")}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleApproval(approval.id, "reject")}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs */}
          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>System activity and security logs</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Actor</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminData.auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-sm">{log.timestamp}</TableCell>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{log.actor}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{log.details}</TableCell>
                        <TableCell className="text-sm font-mono">{log.ipAddress}</TableCell>
                        <TableCell>
                          <span className={getStatusColor(log.status)}>{log.status}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
                <CardDescription>Generate and export various system reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Attendance Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        Comprehensive attendance data for all students and classes
                      </p>
                      <Button size="sm" className="w-full" onClick={() => exportReport("attendance")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">User Activity Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">Login patterns and system usage statistics</p>
                      <Button size="sm" className="w-full" onClick={() => exportReport("user-activity")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Audit Trail Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">Complete audit trail with security events</p>
                      <Button size="sm" className="w-full" onClick={() => exportReport("audit-trail")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export JSON
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Class Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">Class-wise attendance performance metrics</p>
                      <Button size="sm" className="w-full" onClick={() => exportReport("class-performance")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Excel
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Emergency Leaves</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">All emergency leave requests and approvals</p>
                      <Button size="sm" className="w-full" onClick={() => exportReport("emergency-leaves")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">System Analytics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">System performance and usage analytics</p>
                      <Button size="sm" className="w-full" onClick={() => exportReport("system-analytics")}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Dashboard
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
