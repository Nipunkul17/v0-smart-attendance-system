"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { QrCode, Camera, MapPin, Wifi, Timer, Users, CheckCircle, Copy } from "lucide-react"
import { FaceVerificationCamera } from "@/components/face-verification/face-verification-camera"

interface CodeSession {
  code: string
  validUntil: Date
  studentsMarked: string[]
  subject: string
  room: string
  wifi: string
}

export function FacultyCodeGenerator({
  isOpen,
  onClose,
  subject = "Data Structures",
  room = "Room 101",
  wifi = "CS_LAB_101",
}: {
  isOpen: boolean
  onClose: () => void
  subject?: string
  room?: string
  wifi?: string
}) {
  const [currentSession, setCurrentSession] = useState<CodeSession | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStep, setVerificationStep] = useState<"face" | "location" | "wifi" | "complete">("face")
  const [timeRemaining, setTimeRemaining] = useState<string>("")
  const [showFaceVerification, setShowFaceVerification] = useState(false)

  // Update timer every second
  useEffect(() => {
    if (currentSession) {
      const timer = setInterval(() => {
        const now = new Date()
        const diff = currentSession.validUntil.getTime() - now.getTime()

        if (diff <= 0) {
          setTimeRemaining("Expired")
          clearInterval(timer)
        } else {
          const minutes = Math.floor(diff / 60000)
          const seconds = Math.floor((diff % 60000) / 1000)
          setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, "0")}`)
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [currentSession])

  const startVerification = async () => {
    setShowFaceVerification(true)
  }

  const handleFaceVerificationComplete = (success: boolean) => {
    setShowFaceVerification(false)

    if (success) {
      // Continue with location and wifi verification
      continueVerificationProcess()
    } else {
      setIsVerifying(false)
      setVerificationStep("face")
    }
  }

  const continueVerificationProcess = async () => {
    setIsVerifying(true)
    setVerificationStep("location")

    // Simulate location verification
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setVerificationStep("wifi")

    // Simulate Wi-Fi verification
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setVerificationStep("complete")

    // Generate code after successful verification
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const validUntil = new Date()
    validUntil.setMinutes(validUntil.getMinutes() + 10) // 10 minutes validity

    setCurrentSession({
      code,
      validUntil,
      studentsMarked: [],
      subject,
      room,
      wifi,
    })

    setIsVerifying(false)
  }

  const submitAttendance = () => {
    // Handle attendance submission
    setCurrentSession(null)
    alert("Attendance submitted successfully! Late submissions will go to pending queue.")
    onClose()
  }

  const copyCode = () => {
    if (currentSession) {
      navigator.clipboard.writeText(currentSession.code)
    }
  }

  const mockStudentsMarked = ["John Doe (CS2021001)", "Jane Smith (CS2021002)", "Mike Johnson (CS2021003)"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Generate Attendance Code
          </DialogTitle>
          <DialogDescription>Verify your identity and location to generate attendance code</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Face Verification Modal */}
          {showFaceVerification && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="max-w-md w-full mx-4">
                <FaceVerificationCamera
                  title="Faculty Face Verification"
                  description="Verify your identity to generate attendance code"
                  onVerificationComplete={handleFaceVerificationComplete}
                  onCancel={() => setShowFaceVerification(false)}
                />
              </div>
            </div>
          )}

          {/* Class Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Class Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subject:</span>
                <span className="font-medium">{subject}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Room:</span>
                <span className="font-medium">{room}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Wi-Fi Network:</span>
                <span className="font-medium">{wifi}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{new Date().toLocaleTimeString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Verification Process */}
          {isVerifying && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Faculty Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      verificationStep === "face"
                        ? "bg-primary/10 border border-primary/20"
                        : ["location", "wifi", "complete"].includes(verificationStep)
                          ? "bg-green-50 border border-green-200"
                          : "bg-muted"
                    }`}
                  >
                    {verificationStep === "face" ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    <div>
                      <p className="font-medium">Face Verification</p>
                      <p className="text-sm text-muted-foreground">Verifying faculty identity</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      verificationStep === "location"
                        ? "bg-primary/10 border border-primary/20"
                        : ["wifi", "complete"].includes(verificationStep)
                          ? "bg-green-50 border border-green-200"
                          : "bg-muted"
                    }`}
                  >
                    {verificationStep === "location" ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    ) : verificationStep === "face" ? (
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    <div>
                      <p className="font-medium">Location Verification</p>
                      <p className="text-sm text-muted-foreground">Confirming classroom location</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      verificationStep === "wifi"
                        ? "bg-primary/10 border border-primary/20"
                        : verificationStep === "complete"
                          ? "bg-green-50 border border-green-200"
                          : "bg-muted"
                    }`}
                  >
                    {verificationStep === "wifi" ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    ) : verificationStep === "complete" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Wifi className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">Wi-Fi Verification</p>
                      <p className="text-sm text-muted-foreground">Checking network connection</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Code */}
          {currentSession && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Attendance Code Generated</span>
                  <Badge variant={timeRemaining === "Expired" ? "destructive" : "default"}>
                    <Timer className="h-3 w-3 mr-1" />
                    {timeRemaining}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl font-mono font-bold text-primary mb-2">{currentSession.code}</div>
                  <Button onClick={copyCode} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Students Marked ({mockStudentsMarked.length})
                  </h4>
                  <div className="space-y-1">
                    {mockStudentsMarked.map((student, index) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        {student}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={submitAttendance} className="flex-1">
                    Submit Attendance
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentSession(null)}>
                    Cancel Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Start Button */}
          {!isVerifying && !currentSession && (
            <Button onClick={startVerification} className="w-full" size="lg">
              <Camera className="h-5 w-5 mr-2" />
              Start Faculty Verification
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
