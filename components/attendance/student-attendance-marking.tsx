"use client"

import type React from "react"
import { FaceVerificationCamera } from "@/components/face-verification/face-verification-camera"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Camera, MapPin, Wifi, Shield, CheckCircle, XCircle } from "lucide-react"

interface AttendanceStep {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "failed"
  icon: React.ReactNode
}

export function StudentAttendanceMarking({
  isOpen,
  onClose,
  currentSubject = "Data Structures",
  classRoom = "Room 101",
  wifiSSID = "CS_LAB_101",
}: {
  isOpen: boolean
  onClose: () => void
  currentSubject?: string
  classRoom?: string
  wifiSSID?: string
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [teacherCode, setTeacherCode] = useState("")
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showFaceVerification, setShowFaceVerification] = useState(false)
  const [currentFaceStep, setCurrentFaceStep] = useState<"initial" | "final">("initial")

  const [steps, setSteps] = useState<AttendanceStep[]>([
    {
      id: "face-verify-1",
      title: "Initial Face Verification",
      description: "Verify your identity to begin attendance marking",
      status: "pending",
      icon: <Camera className="h-5 w-5" />,
    },
    {
      id: "location",
      title: "Location Verification",
      description: `Confirm you are in ${classRoom}`,
      status: "pending",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      id: "wifi",
      title: "Wi-Fi Verification",
      description: `Connect to ${wifiSSID} network`,
      status: "pending",
      icon: <Wifi className="h-5 w-5" />,
    },
    {
      id: "teacher-code",
      title: "Teacher Code",
      description: "Enter the 6-digit code from your teacher",
      status: "pending",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: "face-verify-2",
      title: "Final Face Verification",
      description: "Final identity confirmation",
      status: "pending",
      icon: <Camera className="h-5 w-5" />,
    },
  ])

  const updateStepStatus = (stepId: string, status: AttendanceStep["status"]) => {
    setSteps((prev) => prev.map((step) => (step.id === stepId ? { ...step, status } : step)))
  }

  const handleStepAction = async (stepIndex: number) => {
    const step = steps[stepIndex]
    setIsProcessing(true)
    updateStepStatus(step.id, "in-progress")

    switch (step.id) {
      case "face-verify-1":
        setCurrentFaceStep("initial")
        setShowFaceVerification(true)
        setIsProcessing(false)
        break

      case "location":
        // Request location permission
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
              // Simulate location verification (in real app, check against classroom coordinates)
              updateStepStatus(step.id, "completed")
              setCurrentStep(2)
            },
            (error) => {
              updateStepStatus(step.id, "failed")
            },
          )
        } else {
          updateStepStatus(step.id, "failed")
        }
        break

      case "wifi":
        // Simulate Wi-Fi verification (in real app, check actual Wi-Fi SSID)
        updateStepStatus(step.id, "completed")
        setCurrentStep(3)
        break

      case "teacher-code":
        if (teacherCode.length === 6) {
          // Simulate code verification
          updateStepStatus(step.id, "completed")
          setCurrentStep(4)
        } else {
          updateStepStatus(step.id, "failed")
        }
        break

      case "face-verify-2":
        setCurrentFaceStep("final")
        setShowFaceVerification(true)
        setIsProcessing(false)
        break
    }
  }

  const handleFaceVerificationComplete = (success: boolean) => {
    setShowFaceVerification(false)

    if (success) {
      if (currentFaceStep === "initial") {
        updateStepStatus("face-verify-1", "completed")
        setCurrentStep(1)
      } else {
        updateStepStatus("face-verify-2", "completed")
        // Mark attendance as successful
        setTimeout(() => {
          alert("Attendance marked successfully!")
          onClose()
        }, 1000)
      }
    } else {
      if (currentFaceStep === "initial") {
        updateStepStatus("face-verify-1", "failed")
      } else {
        updateStepStatus("face-verify-2", "failed")
      }
    }
  }

  const getStepIcon = (step: AttendanceStep) => {
    switch (step.status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "in-progress":
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
      default:
        return step.icon
    }
  }

  const getStepColor = (step: AttendanceStep) => {
    switch (step.status) {
      case "completed":
        return "border-green-200 bg-green-50"
      case "failed":
        return "border-red-200 bg-red-50"
      case "in-progress":
        return "border-primary bg-primary/5"
      default:
        return "border-border"
    }
  }

  const completedSteps = steps.filter((step) => step.status === "completed").length
  const progress = (completedSteps / steps.length) * 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Mark Attendance - {currentSubject}
          </DialogTitle>
          <DialogDescription>Complete all verification steps to mark your attendance</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Face Verification Modal */}
          {showFaceVerification && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="max-w-md w-full mx-4">
                <FaceVerificationCamera
                  title={currentFaceStep === "initial" ? "Initial Face Verification" : "Final Face Verification"}
                  description={
                    currentFaceStep === "initial"
                      ? "Verify your identity to begin attendance marking"
                      : "Final verification to complete attendance"
                  }
                  onVerificationComplete={handleFaceVerificationComplete}
                  onCancel={() => {
                    setShowFaceVerification(false)
                    if (currentFaceStep === "initial") {
                      updateStepStatus("face-verify-1", "pending")
                    } else {
                      updateStepStatus("face-verify-2", "pending")
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>
                {completedSteps}/{steps.length} completed
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className={`p-4 border rounded-lg ${getStepColor(step)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStepIcon(step)}
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  {index === currentStep && step.status === "pending" && (
                    <div className="flex items-center gap-2">
                      {step.id === "teacher-code" && (
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Enter 6-digit code"
                            value={teacherCode}
                            onChange={(e) => setTeacherCode(e.target.value)}
                            maxLength={6}
                            className="w-32"
                          />
                        </div>
                      )}
                      <Button onClick={() => handleStepAction(index)} disabled={isProcessing} size="sm">
                        {step.id === "face-verify-1" || step.id === "face-verify-2"
                          ? "Verify Face"
                          : step.id === "location"
                            ? "Get Location"
                            : step.id === "wifi"
                              ? "Check Wi-Fi"
                              : "Verify Code"}
                      </Button>
                    </div>
                  )}

                  {step.status === "completed" && <Badge className="bg-green-100 text-green-800">Verified</Badge>}

                  {step.status === "failed" && <Badge variant="destructive">Failed</Badge>}
                </div>

                {/* Additional info for specific steps */}
                {step.id === "location" && location && step.status === "completed" && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Location verified: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </div>
                )}

                {step.id === "wifi" && step.status === "completed" && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                    <Wifi className="h-4 w-4 inline mr-1" />
                    Connected to {wifiSSID}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Current Class Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Current Class Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subject:</span>
                <span className="font-medium">{currentSubject}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Room:</span>
                <span className="font-medium">{classRoom}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Wi-Fi Network:</span>
                <span className="font-medium">{wifiSSID}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{new Date().toLocaleTimeString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
