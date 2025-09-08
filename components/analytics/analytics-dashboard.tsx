"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Users, BookOpen, Calendar, Download, Filter, AlertTriangle } from "lucide-react"

const attendanceData = [
  { month: "Jan", attendance: 85, target: 75 },
  { month: "Feb", attendance: 78, target: 75 },
  { month: "Mar", attendance: 92, target: 75 },
  { month: "Apr", attendance: 88, target: 75 },
  { month: "May", attendance: 76, target: 75 },
  { month: "Jun", attendance: 94, target: 75 },
]

const subjectData = [
  { subject: "Mathematics", attendance: 92, total: 45, present: 41, absent: 4 },
  { subject: "Physics", attendance: 78, total: 42, present: 33, absent: 9 },
  { subject: "Chemistry", attendance: 85, total: 40, present: 34, absent: 6 },
  { subject: "Computer Science", attendance: 96, total: 38, present: 36, absent: 2 },
  { subject: "English", attendance: 74, total: 35, present: 26, absent: 9 },
]

const dailyTrendData = [
  { day: "Mon", attendance: 88, events: 2 },
  { day: "Tue", attendance: 92, events: 1 },
  { day: "Wed", attendance: 85, events: 3 },
  { day: "Thu", attendance: 90, events: 1 },
  { day: "Fri", attendance: 78, events: 4 },
  { day: "Sat", attendance: 95, events: 0 },
]

const attendanceTypeData = [
  { name: "Regular", value: 75, color: "#10b981" },
  { name: "Event", value: 15, color: "#3b82f6" },
  { name: "Emergency", value: 8, color: "#f59e0b" },
  { name: "Proxy", value: 2, color: "#8b5cf6" },
]

const facultyPerformance = [
  { name: "Dr. Smith", classes: 45, avgAttendance: 92, onTime: 98 },
  { name: "Prof. Johnson", classes: 42, avgAttendance: 88, onTime: 95 },
  { name: "Dr. Williams", classes: 38, avgAttendance: 85, onTime: 92 },
  { name: "Prof. Brown", classes: 40, avgAttendance: 90, onTime: 97 },
]

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("semester")
  const [selectedClass, setSelectedClass] = useState("all")

  const exportReport = (type: string) => {
    console.log(`Exporting ${type} report...`)
    // Simulate report generation
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600">Comprehensive attendance insights and performance metrics</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">Semester</SelectItem>
              <SelectItem value="year">Academic Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="cs101">CS 101</SelectItem>
              <SelectItem value="math201">Math 201</SelectItem>
              <SelectItem value="phy301">Physics 301</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
                <p className="text-2xl font-bold text-gray-900">87.5%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-sm text-emerald-600">+2.3% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">+15 new this week</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes Today</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">38 completed</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">At Risk Students</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-sm text-amber-600">Below 75% attendance</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance Trend</CardTitle>
                <CardDescription>Attendance percentage vs target over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Attendance Pattern</CardTitle>
                <CardDescription>Weekly attendance distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Type Distribution</CardTitle>
                <CardDescription>Breakdown by attendance category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={attendanceTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {attendanceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Heatmap</CardTitle>
                <CardDescription>Peak attendance hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded ${
                        Math.random() > 0.7
                          ? "bg-emerald-500"
                          : Math.random() > 0.4
                            ? "bg-emerald-300"
                            : "bg-emerald-100"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-emerald-100 rounded"></div>
                    <div className="w-3 h-3 bg-emerald-300 rounded"></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                  </div>
                  <span>More</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
              <CardDescription>Attendance breakdown by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectData.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={subject.attendance >= 75 ? "default" : "destructive"}>
                          {subject.attendance}%
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {subject.present}/{subject.total}
                        </span>
                      </div>
                    </div>
                    <Progress value={subject.attendance} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Performance</CardTitle>
              <CardDescription>Teaching effectiveness metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {facultyPerformance.map((faculty) => (
                  <div key={faculty.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{faculty.name}</h4>
                      <p className="text-sm text-gray-600">{faculty.classes} classes conducted</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-emerald-600">{faculty.avgAttendance}%</p>
                        <p className="text-gray-600">Avg Attendance</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-blue-600">{faculty.onTime}%</p>
                        <p className="text-gray-600">On Time</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Reports</CardTitle>
                <CardDescription>Generate detailed attendance reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={() => exportReport("daily")} className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Daily Report
                </Button>
                <Button onClick={() => exportReport("weekly")} variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Weekly Report
                </Button>
                <Button onClick={() => exportReport("monthly")} variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Monthly Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Reports</CardTitle>
                <CardDescription>Individual student performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={() => exportReport("student-summary")} className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Student Summary
                </Button>
                <Button onClick={() => exportReport("at-risk")} variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  At-Risk Students
                </Button>
                <Button
                  onClick={() => exportReport("exam-eligibility")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exam Eligibility
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Faculty Reports</CardTitle>
                <CardDescription>Teaching performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={() => exportReport("faculty-performance")} className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Faculty Performance
                </Button>
                <Button
                  onClick={() => exportReport("class-efficiency")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Class Efficiency
                </Button>
                <Button onClick={() => exportReport("audit-log")} variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Audit Log
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Exam Eligibility Forecast</CardTitle>
                <CardDescription>Predicted eligibility based on current trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Students likely to qualify</span>
                    <Badge className="bg-green-100 text-green-800">1,156 (92.7%)</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                    <span>Students at risk</span>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      68 (5.5%)
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span>Students unlikely to qualify</span>
                    <Badge variant="destructive" className="bg-red-100 text-red-800">
                      23 (1.8%)
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Projection</CardTitle>
                <CardDescription>Expected attendance for remaining semester</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="attendance" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
