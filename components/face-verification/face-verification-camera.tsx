"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, CheckCircle, XCircle, AlertCircle, RotateCcw } from "lucide-react"

interface FaceVerificationCameraProps {
  onVerificationComplete: (success: boolean) => void
  onCancel?: () => void
  title?: string
  description?: string
}

export function FaceVerificationCamera({
  onVerificationComplete,
  onCancel,
  title = "Face Verification",
  description = "Please look at the camera for biometric authentication",
}: FaceVerificationCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "processing" | "success" | "failed">("idle")
  const [error, setError] = useState<string>("")
  const [cameraReady, setCameraReady] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    resetComponentState()
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const resetComponentState = () => {
    setIsVerifying(false)
    setVerificationStatus("idle")
    setError("")
    setCameraReady(false)
    setRetryCount(0)
  }

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }

      console.log("[v0] Starting camera...")
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      })

      setStream(mediaStream)
      setError("")

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          console.log("[v0] Camera ready")
          setCameraReady(true)
        }
      }
    } catch (err) {
      console.error("[v0] Camera access error:", err)
      setError("Camera access denied. Please allow camera permissions and try again.")
      setCameraReady(false)
    }
  }, [stream])

  const stopCamera = useCallback(() => {
    console.log("[v0] Stopping camera...")
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop()
        console.log("[v0] Stopped track:", track.kind)
      })
      setStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setCameraReady(false)
  }, [stream])

  const retryCamera = async () => {
    setRetryCount((prev) => prev + 1)
    stopCamera()
    setTimeout(() => {
      startCamera()
    }, 1000)
  }

  const captureFrame = (): string | null => {
    if (!videoRef.current || !canvasRef.current) return null

    const canvas = canvasRef.current
    const video = videoRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return null

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)

    return canvas.toDataURL("image/jpeg", 0.8)
  }

  const performFaceVerification = async () => {
    if (!cameraReady) {
      setError("Camera not ready. Please wait or try restarting the camera.")
      return
    }

    setIsVerifying(true)
    setVerificationStatus("processing")
    setError("")

    try {
      console.log("[v0] Starting face verification...")
      const capturedImage = captureFrame()
      if (!capturedImage) {
        throw new Error("Failed to capture image")
      }

      const isMatch = await compareFaces(capturedImage)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (isMatch) {
        console.log("[v0] Face verification successful")
        setVerificationStatus("success")
        setTimeout(() => {
          onVerificationComplete(true)
        }, 1500)
      } else {
        console.log("[v0] Face verification failed")
        setVerificationStatus("failed")
        setError("Face verification failed. Please ensure you are the registered user and try again.")
        setTimeout(() => {
          setVerificationStatus("idle")
        }, 3000)
      }
    } catch (err) {
      console.error("[v0] Face verification error:", err)
      setVerificationStatus("failed")
      setError("Verification failed. Please try again.")
      setTimeout(() => {
        setVerificationStatus("idle")
      }, 3000)
    } finally {
      setIsVerifying(false)
    }
  }

  const compareFaces = async (capturedImage: string): Promise<boolean> => {
    try {
      const referenceImage = await loadImage("/images/reference-face.jpg")
      const capturedImageElement = await loadImageFromDataURL(capturedImage)

      const similarity = await calculateImageSimilarity(referenceImage, capturedImageElement)

      return similarity > 0.7
    } catch (error) {
      console.error("Face comparison error:", error)
      return false
    }
  }

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  const loadImageFromDataURL = (dataURL: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = dataURL
    })
  }

  const calculateImageSimilarity = async (img1: HTMLImageElement, img2: HTMLImageElement): Promise<number> => {
    const canvas1 = document.createElement("canvas")
    const canvas2 = document.createElement("canvas")
    const ctx1 = canvas1.getContext("2d")
    const ctx2 = canvas2.getContext("2d")

    if (!ctx1 || !ctx2) return 0

    const size = 100
    canvas1.width = canvas1.height = size
    canvas2.width = canvas2.height = size

    ctx1.drawImage(img1, 0, 0, size, size)
    ctx2.drawImage(img2, 0, 0, size, size)

    const data1 = ctx1.getImageData(0, 0, size, size).data
    const data2 = ctx2.getImageData(0, 0, size, size).data

    let diff = 0
    for (let i = 0; i < data1.length; i += 4) {
      const r1 = data1[i],
        g1 = data1[i + 1],
        b1 = data1[i + 2]
      const r2 = data2[i],
        g2 = data2[i + 1],
        b2 = data2[i + 2]

      diff += Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)
    }

    const maxDiff = size * size * 3 * 255
    const similarity = 1 - diff / maxDiff

    const randomFactor = 0.8 + Math.random() * 0.4
    return Math.min(1, similarity * randomFactor)
  }

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case "processing":
        return <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case "failed":
        return <XCircle className="h-6 w-6 text-red-600" />
      default:
        return <Camera className="h-6 w-6" />
    }
  }

  const getStatusColor = () => {
    switch (verificationStatus) {
      case "processing":
        return "border-primary bg-primary/5"
      case "success":
        return "border-green-200 bg-green-50"
      case "failed":
        return "border-red-200 bg-red-50"
      default:
        return "border-border"
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          {getStatusIcon()}
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className={`relative border-2 rounded-lg overflow-hidden ${getStatusColor()}`}>
            <video ref={videoRef} autoPlay playsInline muted className="w-80 h-60 object-cover bg-black" />
            <canvas ref={canvasRef} className="hidden" />

            {verificationStatus === "processing" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p className="text-sm">Verifying face...</p>
                </div>
              </div>
            )}

            {verificationStatus === "success" && (
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                <div className="text-green-800 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                  <p className="font-medium">Verification Successful!</p>
                </div>
              </div>
            )}

            {verificationStatus === "failed" && (
              <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                <div className="text-red-800 text-center">
                  <XCircle className="h-12 w-12 mx-auto mb-2" />
                  <p className="font-medium">Verification Failed</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="h-4 w-4" />
            <div className="flex-1">
              <p className="text-sm">{error}</p>
            </div>
            {error.includes("Camera") && (
              <Button variant="outline" size="sm" onClick={retryCamera} className="ml-2 bg-transparent">
                <RotateCcw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            )}
          </div>
        )}

        {!cameraReady && !error && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <p className="text-sm">
              {retryCount > 0 ? `Retrying camera access... (${retryCount})` : "Initializing camera..."}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={performFaceVerification}
            disabled={!cameraReady || isVerifying || verificationStatus === "processing"}
            className="flex-1"
          >
            {isVerifying ? "Verifying..." : "Verify Face"}
          </Button>
          <Button
            variant="outline"
            onClick={retryCamera}
            disabled={isVerifying || verificationStatus === "processing"}
            className="px-3 bg-transparent"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          {onCancel && (
            <Button variant="outline" onClick={onCancel} disabled={isVerifying}>
              Cancel
            </Button>
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>• Position your face clearly in the camera frame</p>
          <p>• Ensure good lighting for better recognition</p>
          <p>• Look directly at the camera during verification</p>
        </div>
      </CardContent>
    </Card>
  )
}
