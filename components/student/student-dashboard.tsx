"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Camera,
  User,
  Upload,
  FileText,
  TrendingUp,
  MapPin,
  Wifi,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { StudentAttendanceMarking } from "@/components/attendance/student-attendance-marking"

export function StudentDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [leaveReason, setLeaveReason] = useState("")
  const [showAttendanceMarking, setShowAttendanceMarking] = useState(false)

  const studentData = {
    name: "John Doe",
    enrollmentNo: "CS2021001",
    overallAttendance: 78,
    subjects: [
      {
        name: "Data Structures",
        attendance: 85,
        category: "Good",
        lectures: 34,
        attended: 29,
        breakdown: { normal: 25, event: 2, emergency: 2, proxy: 0 },
        required: 26, // 75% of 34
        canMiss: 3,
      },
      {
        name: "Database Systems",
        attendance: 72,
        category: "Average",
        lectures: 28,
        attended: 20,
        breakdown: { normal: 18, event: 1, emergency: 1, proxy: 0 },
        required: 21, // 75% of 28
        canMiss: 0,
        needMore: 1,
      },
      {
        name: "Web Development",
        attendance: 90,
        category: "Excellence",
        lectures: 25,
        attended: 23,
        breakdown: { normal: 20, event: 2, emergency: 1, proxy: 0 },
        required: 19, // 75% of 25
        canMiss: 4,
      },
      {
        name: "Machine Learning",
        attendance: 68,
        category: "Below Average",
        lectures: 30,
        attended: 20,
        breakdown: { normal: 17, event: 1, emergency: 2, proxy: 0 },
        required: 23, // 75% of 30
        canMiss: 0,
        needMore: 3,
      },
    ],
    attendanceTrend: [
      { week: "Week 1", percentage: 85 },
      { week: "Week 2", percentage: 82 },
      { week: "Week 3", percentage: 79 },
      { week: "Week 4", percentage: 78 },
      { week: "Week 5", percentage: 78 },
    ],
    upcomingEvents: [
      { name: "Tech Symposium", date: "2024-01-15", subject: "Web Development" },
      { name: "Coding Competition", date: "2024-01-20", subject: "Data Structures" },
    ],
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Excellence":
        return "bg-green-100 text-green-800 border-green-200"
      case "Good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Average":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Below Average":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-blue-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getBreakdownData = (breakdown: any) => [
    { name: "Regular", value: breakdown.normal, color: "#059669" },
    { name: "Events", value: breakdown.event, color: "#10b981" },
    { name: "Emergency", value: breakdown.emergency, color: "#f59e0b" },
    { name: "Proxy", value: breakdown.proxy, color: "#6b7280" },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const submitEmergencyLeave = () => {
    // Handle emergency leave submission
    console.log("Emergency leave submitted:", { file: selectedFile, reason: leaveReason })
    setSelectedFile(null)
    setLeaveReason("")
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {studentData.name}</p>
          </div>
          <Badge variant="outline" className="text-sm">
            <User className="h-3 w-3 mr-1" />
            {studentData.enrollmentNo}
          </Badge>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <div className={`text-2xl font-bold ${getAttendanceColor(studentData.overallAttendance)}`}>
                    {studentData.overallAttendance}%
                  </div>
                  <Progress value={studentData.overallAttendance} className="mt-2" />
                </div>
                {studentData.overallAttendance < 75 ? (
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                ) : (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Exam Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {studentData.overallAttendance >= 75 ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="font-medium">Eligible</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span className="font-medium">Not Eligible</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {studentData.overallAttendance >= 75
                    ? "You meet the 75% requirement"
                    : `Need ${75 - studentData.overallAttendance}% more attendance`}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm" onClick={() => setShowAttendanceMarking(true)}>
                <Camera className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Emergency Leave
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Submit Emergency Leave</DialogTitle>
                    <DialogDescription>Upload proof and provide reason for emergency leave</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="proof">Upload Proof (Image/PDF)</Label>
                      <Input
                        id="proof"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="mt-1"
                      />
                      {selectedFile && (
                        <p className="text-sm text-muted-foreground mt-1">Selected: {selectedFile.name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="reason">Reason</Label>
                      <Textarea
                        id="reason"
                        placeholder="Explain the reason for emergency leave..."
                        value={leaveReason}
                        onChange={(e) => setLeaveReason(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={submitEmergencyLeave} className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Submit Emergency Leave
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Attendance Trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {studentData.attendanceTrend[4].percentage > studentData.attendanceTrend[0].percentage
                    ? "Improving"
                    : "Declining"}
                </span>
              </div>
              <div className="h-16 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={studentData.attendanceTrend}>
                    <Line type="monotone" dataKey="percentage" stroke="#059669" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
            <CardDescription>Detailed breakdown of attendance across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {studentData.subjects.map((subject, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{subject.name}</h3>
                        <Badge className={getCategoryColor(subject.category)} variant="outline">
                          {subject.category}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Regular</p>
                          <p className="font-medium">{subject.breakdown.normal}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Events</p>
                          <p className="font-medium">{subject.breakdown.event}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Emergency</p>
                          <p className="font-medium">{subject.breakdown.emergency}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Proxy</p>
                          <p className="font-medium">{subject.breakdown.proxy}</p>
                        </div>
                      </div>
                      {subject.needMore && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                          <AlertTriangle className="h-4 w-4 inline mr-1" />
                          Need {subject.needMore} more lectures to reach 75%
                        </div>
                      )}
                      {subject.canMiss && subject.canMiss > 0 && (
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                          <CheckCircle className="h-4 w-4 inline mr-1" />
                          Can miss {subject.canMiss} more lectures
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={getBreakdownData(subject.breakdown)}
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={35}
                              dataKey="value"
                            >
                              {getBreakdownData(subject.breakdown).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className={`text-2xl font-bold ${getAttendanceColor(subject.attendance)}`}>
                        {subject.attendance}%
                      </div>
                    </div>
                  </div>
                  <Progress value={subject.attendance} className="w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Interface */}
        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Data Structures</p>
                        <p className="text-sm text-muted-foreground">9:00 AM - 10:00 AM</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Room 101</span>
                          <Wifi className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">CS_LAB_101</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => setShowAttendanceMarking(true)}>
                      <Camera className="h-4 w-4 mr-2" />
                      Mark
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Database Systems</p>
                        <p className="text-sm text-muted-foreground">11:00 AM - 12:00 PM</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Room 203</span>
                          <Wifi className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">CS_LAB_203</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Upcoming
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events that count towards attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{event.name}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                        <Badge variant="outline" className="mt-1">
                          {event.subject}
                        </Badge>
                      </div>
                      <Button size="sm">Register</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>Your attendance pattern over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentData.attendanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="percentage"
                        stroke="#059669"
                        strokeWidth={3}
                        dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Attendance Marking Dialog */}
        <StudentAttendanceMarking
          isOpen={showAttendanceMarking}
          onClose={() => setShowAttendanceMarking(false)}
          currentSubject="Data Structures"
          classRoom="Room 101"
          wifiSSID="CS_LAB_101"
        />
      </div>
    </div>
  )
}
