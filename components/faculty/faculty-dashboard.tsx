"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  QrCode,
  FileText,
  Eye,
  MapPin,
  Wifi,
  Timer,
  UserCheck,
} from "lucide-react"
import { FacultyCodeGenerator } from "@/components/attendance/faculty-code-generator"

export function FacultyDashboard() {
  const [activeCode, setActiveCode] = useState<string | null>(null)
  const [codeExpiry, setCodeExpiry] = useState<Date | null>(null)
  const [selectedClass, setSelectedClass] = useState("CS-2021-A")
  const [showCodeGenerator, setShowCodeGenerator] = useState(false)

  const facultyData = {
    name: "Dr. Sarah Johnson",
    facultyId: "FAC001",
    role: "Professor",
    classes: [
      { id: "CS-2021-A", name: "Computer Science 2021 - Section A", students: 45 },
      { id: "CS-2021-B", name: "Computer Science 2021 - Section B", students: 42 },
    ],
    subjects: [
      { id: "DS", name: "Data Structures", code: "CS301" },
      { id: "DB", name: "Database Systems", code: "CS302" },
    ],
    todaySchedule: [
      {
        subject: "Data Structures",
        class: "CS-2021-A",
        time: "9:00 AM - 10:00 AM",
        room: "Room 101",
        wifi: "CS_LAB_101",
        status: "upcoming",
      },
      {
        subject: "Database Systems",
        class: "CS-2021-B",
        time: "11:00 AM - 12:00 PM",
        room: "Room 203",
        wifi: "CS_LAB_203",
        status: "upcoming",
      },
    ],
    pendingLeaves: [
      {
        id: 1,
        studentName: "John Doe",
        enrollmentNo: "CS2021001",
        subject: "Data Structures",
        date: "2024-01-10",
        reason: "Medical emergency",
        proofUrl: "/proof1.pdf",
        status: "pending",
      },
      {
        id: 2,
        studentName: "Jane Smith",
        enrollmentNo: "CS2021002",
        subject: "Database Systems",
        date: "2024-01-09",
        reason: "Family emergency",
        proofUrl: "/proof2.jpg",
        status: "pending",
      },
    ],
    pendingAttendance: [
      {
        id: 1,
        studentName: "Mike Johnson",
        enrollmentNo: "CS2021003",
        subject: "Data Structures",
        timestamp: "2024-01-10 09:15 AM",
        reason: "Late submission after teacher code expired",
      },
    ],
    classAttendance: [
      {
        enrollmentNo: "CS2021001",
        name: "John Doe",
        subjects: {
          "Data Structures": { attended: 29, total: 34, percentage: 85 },
          "Database Systems": { attended: 20, total: 28, percentage: 72 },
        },
      },
      {
        enrollmentNo: "CS2021002",
        name: "Jane Smith",
        subjects: {
          "Data Structures": { attended: 32, total: 34, percentage: 94 },
          "Database Systems": { attended: 25, total: 28, percentage: 89 },
        },
      },
      {
        enrollmentNo: "CS2021003",
        name: "Mike Johnson",
        subjects: {
          "Data Structures": { attended: 25, total: 34, percentage: 74 },
          "Database Systems": { attended: 21, total: 28, percentage: 75 },
        },
      },
    ],
  }

  const generateAttendanceCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setActiveCode(code)
    const expiry = new Date()
    expiry.setMinutes(expiry.getMinutes() + 10) // 10 minutes validity
    setCodeExpiry(expiry)
  }

  const submitAttendance = () => {
    setActiveCode(null)
    setCodeExpiry(null)
    // Handle attendance submission logic
  }

  const approveLeave = (leaveId: number) => {
    // Handle leave approval logic
    console.log("Approved leave:", leaveId)
  }

  const rejectLeave = (leaveId: number) => {
    // Handle leave rejection logic
    console.log("Rejected leave:", leaveId)
  }

  const approvePendingAttendance = (attendanceId: number) => {
    // Handle pending attendance approval
    console.log("Approved attendance:", attendanceId)
  }

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-blue-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const formatTimeRemaining = (expiry: Date) => {
    const now = new Date()
    const diff = expiry.getTime() - now.getTime()
    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Faculty Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {facultyData.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              <UserCheck className="h-3 w-3 mr-1" />
              {facultyData.facultyId}
            </Badge>
            <Badge className="text-sm">{facultyData.role}</Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{facultyData.classes.length}</div>
              <p className="text-xs text-muted-foreground">
                {facultyData.classes.reduce((sum, cls) => sum + cls.students, 0)} students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{facultyData.pendingLeaves.length}</div>
              <p className="text-xs text-muted-foreground">Require approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{facultyData.pendingAttendance.length}</div>
              <p className="text-xs text-muted-foreground">Late submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Code</CardTitle>
            </CardHeader>
            <CardContent>
              {activeCode ? (
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-green-600 font-mono">{activeCode}</div>
                  <p className="text-xs text-muted-foreground">
                    Expires in {codeExpiry && formatTimeRemaining(codeExpiry)}
                  </p>
                </div>
              ) : (
                <div className="text-2xl font-bold text-muted-foreground">None</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {facultyData.todaySchedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{schedule.subject}</p>
                      <p className="text-sm text-muted-foreground">{schedule.time}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{schedule.room}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Wifi className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{schedule.wifi}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {schedule.class}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!activeCode ? (
                      <Button onClick={() => setShowCodeGenerator(true)} size="sm">
                        <QrCode className="h-4 w-4 mr-2" />
                        Generate Code
                      </Button>
                    ) : (
                      <Button onClick={submitAttendance} size="sm" variant="outline">
                        Submit Attendance
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Interface */}
        <Tabs defaultValue="attendance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="attendance">Class Attendance</TabsTrigger>
            <TabsTrigger value="leaves">Emergency Leaves</TabsTrigger>
            <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Class Attendance Overview</CardTitle>
                <CardDescription>Monitor student attendance across subjects</CardDescription>
                <div className="flex items-center gap-2">
                  <Label htmlFor="class-select">Select Class:</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {facultyData.classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Enrollment No.</TableHead>
                      <TableHead>Data Structures</TableHead>
                      <TableHead>Database Systems</TableHead>
                      <TableHead>Overall</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facultyData.classAttendance.map((student) => {
                      const dsAttendance = student.subjects["Data Structures"]
                      const dbAttendance = student.subjects["Database Systems"]
                      const overall = Math.round((dsAttendance.percentage + dbAttendance.percentage) / 2)

                      return (
                        <TableRow key={student.enrollmentNo}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.enrollmentNo}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={getAttendanceColor(dsAttendance.percentage)}>
                                {dsAttendance.percentage}%
                              </span>
                              <span className="text-xs text-muted-foreground">
                                ({dsAttendance.attended}/{dsAttendance.total})
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={getAttendanceColor(dbAttendance.percentage)}>
                                {dbAttendance.percentage}%
                              </span>
                              <span className="text-xs text-muted-foreground">
                                ({dbAttendance.attended}/{dbAttendance.total})
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={getAttendanceColor(overall)}>{overall}%</span>
                              {overall < 75 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaves">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Leave Requests</CardTitle>
                <CardDescription>Review and approve emergency leave applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {facultyData.pendingLeaves.map((leave) => (
                    <div key={leave.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{leave.studentName}</h3>
                            <Badge variant="outline">{leave.enrollmentNo}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Subject:</strong> {leave.subject}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Date:</strong> {leave.date}
                          </p>
                          <p className="text-sm">
                            <strong>Reason:</strong> {leave.reason}
                          </p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            View Proof
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => approveLeave(leave.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button onClick={() => rejectLeave(leave.id)} size="sm" variant="destructive">
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

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Attendance Approvals</CardTitle>
                <CardDescription>Late attendance submissions requiring approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {facultyData.pendingAttendance.map((attendance) => (
                    <div key={attendance.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{attendance.studentName}</h3>
                            <Badge variant="outline">{attendance.enrollmentNo}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Subject:</strong> {attendance.subject}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Timestamp:</strong> {attendance.timestamp}
                          </p>
                          <p className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                            <Timer className="h-4 w-4 inline mr-1" />
                            {attendance.reason}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => approvePendingAttendance(attendance.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
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

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Reports</CardTitle>
                <CardDescription>Generate and export attendance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-class">Select Class</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose class" />
                        </SelectTrigger>
                        <SelectContent>
                          {facultyData.classes.map((cls) => (
                            <SelectItem key={cls.id} value={cls.id}>
                              {cls.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="report-subject">Select Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {facultyData.subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button variant="outline">Export CSV</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Faculty Code Generator Dialog */}
        <FacultyCodeGenerator
          isOpen={showCodeGenerator}
          onClose={() => setShowCodeGenerator(false)}
          subject="Data Structures"
          room="Room 101"
          wifi="CS_LAB_101"
        />
      </div>
    </div>
  )
}
