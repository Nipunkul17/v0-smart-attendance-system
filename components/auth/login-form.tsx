"use client"

import type React from "react"
import { FaceVerificationCamera } from "@/components/face-verification/face-verification-camera"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, GraduationCap, UserCheck } from "lucide-react"

type UserRole = "student" | "faculty" | "admin"

export function LoginForm() {
  const [role, setRole] = useState<UserRole>("student")
  const [enrollmentNo, setEnrollmentNo] = useState("")
  const [password, setPassword] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [showFaceVerification, setShowFaceVerification] = useState(false)

  useEffect(() => {
    console.log("[v0] LoginForm mounted, resetting state")
    setShowFaceVerification(false)
    setIsVerifying(false)
    setEnrollmentNo("")
    setPassword("")
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login form submitted, showing face verification")
    setShowFaceVerification(true)
  }

  const handleFaceVerification = async () => {
    console.log("[v0] Face verification started")
    setIsVerifying(true)
    // Simulate face verification process
    setTimeout(() => {
      setIsVerifying(false)
      // Redirect based on role
      window.location.href = role === "student" ? "/student" : role === "faculty" ? "/faculty" : "/admin"
    }, 3000)
  }

  const handleVerificationCancel = () => {
    console.log("[v0] Face verification cancelled, resetting to login form")
    setShowFaceVerification(false)
    setIsVerifying(false)
  }

  const handleVerificationComplete = (success: boolean) => {
    console.log("[v0] Face verification completed:", success)
    if (success) {
      // Redirect based on role
      window.location.href = role === "student" ? "/student" : role === "faculty" ? "/faculty" : "/admin"
    } else {
      // Handle verification failure - reset to login form after delay
      setTimeout(() => {
        console.log("[v0] Verification failed, returning to login form")
        setShowFaceVerification(false)
        setIsVerifying(false)
      }, 2000)
    }
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "student":
        return <GraduationCap className="h-4 w-4" />
      case "faculty":
        return <UserCheck className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "student":
        return "bg-primary text-primary-foreground"
      case "faculty":
        return "bg-accent text-accent-foreground"
      case "admin":
        return "bg-destructive text-destructive-foreground"
    }
  }

  if (showFaceVerification) {
    return (
      <FaceVerificationCamera
        title="Login Face Verification"
        description="Please verify your identity to access the attendance system"
        onVerificationComplete={handleVerificationComplete}
        onCancel={handleVerificationCancel}
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Secure Login
        </CardTitle>
        <CardDescription>Enter your credentials to access the attendance system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Student
                  </div>
                </SelectItem>
                <SelectItem value="faculty">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Faculty
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Admin
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enrollment">
              {role === "student" ? "Enrollment Number" : role === "faculty" ? "Faculty ID" : "Admin ID"}
            </Label>
            <Input
              id="enrollment"
              type="text"
              placeholder={
                role === "student"
                  ? "Enter enrollment number"
                  : role === "faculty"
                    ? "Enter faculty ID"
                    : "Enter admin ID"
              }
              value={enrollmentNo}
              onChange={(e) => setEnrollmentNo(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Continue to Face Verification
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
