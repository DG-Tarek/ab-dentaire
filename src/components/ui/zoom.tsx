"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { X, ZoomIn, ZoomOut, RotateCw, Move } from "lucide-react"
import { Button } from "./button"

const zoomVariants = cva(
  "relative overflow-hidden rounded-lg cursor-zoom-in transition-all duration-200 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-background",
        outline: "border border-input",
      },
      size: {
        default: "w-full h-full",
        sm: "w-64 h-64",
        lg: "w-96 h-96",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ZoomProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof zoomVariants> {
  children: React.ReactNode
  onZoomChange?: (isZoomed: boolean) => void
  maxZoom?: number
  minZoom?: number
  zoomStep?: number
}

const Zoom = React.forwardRef<HTMLDivElement, ZoomProps>(
  ({ className, variant, size, children, onZoomChange, maxZoom = 3, minZoom = 0.5, zoomStep = 0.5, ...props }, ref) => {
    const [isZoomed, setIsZoomed] = React.useState(false)
    const [zoomLevel, setZoomLevel] = React.useState(1)
    const [rotation, setRotation] = React.useState(0)
    const [isDragging, setIsDragging] = React.useState(false)
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })
    const [position, setPosition] = React.useState({ x: 0, y: 0 })

    const handleZoomIn = () => {
      const newZoom = Math.min(zoomLevel + zoomStep, maxZoom)
      setZoomLevel(newZoom)
    }

    const handleZoomOut = () => {
      const newZoom = Math.max(zoomLevel - zoomStep, minZoom)
      setZoomLevel(newZoom)
    }

    const handleRotate = () => {
      setRotation((prev) => (prev + 90) % 360)
    }

    const handleReset = () => {
      setZoomLevel(1)
      setRotation(0)
      setPosition({ x: 0, y: 0 })
    }

    const handleMouseDown = (e: React.MouseEvent) => {
      if (zoomLevel > 1) {
        setIsDragging(true)
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
      }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging && zoomLevel > 1) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const handleWheel = (e: React.WheelEvent) => {
      e.preventDefault()
      if (e.deltaY < 0) {
        handleZoomIn()
      } else {
        handleZoomOut()
      }
    }

    const handleImageClick = () => {
      setIsZoomed(true)
      onZoomChange?.(true)
    }

    const handleCloseZoom = () => {
      setIsZoomed(false)
      handleReset()
      onZoomChange?.(false)
    }

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isZoomed) {
          handleCloseZoom()
        }
      }

      if (isZoomed) {
        document.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
      }

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }, [isZoomed, handleCloseZoom])

    return (
      <>
        <div
          ref={ref}
          className={cn(zoomVariants({ variant, size }), className)}
          onClick={handleImageClick}
          {...props}
        >
          {children}
        </div>

        {/* Zoom Modal */}
        {isZoomed && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleCloseZoom}
                className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Zoom Controls */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= maxZoom}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= minZoom}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRotate}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  <Move className="h-4 w-4" />
                </Button>
              </div>

              {/* Zoom Level Indicator */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-white text-sm">
                {Math.round(zoomLevel * 100)}%
              </div>

              {/* Zoomed Image Container */}
              <div
                className="w-full h-full flex items-center justify-center overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                style={{ cursor: isDragging ? "grabbing" : zoomLevel > 1 ? "grab" : "zoom-in" }}
              >
                <div
                  className="transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
                  }}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
)
Zoom.displayName = "Zoom"

const ZoomTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
      className
    )}
    {...props}
  />
))
ZoomTrigger.displayName = "ZoomTrigger"

const ZoomContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative", className)}
    {...props}
  />
))
ZoomContent.displayName = "ZoomContent"

const ZoomControls = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute top-2 left-2 flex gap-1 z-10", className)}
    {...props}
  />
))
ZoomControls.displayName = "ZoomControls"

export { Zoom, ZoomTrigger, ZoomContent, ZoomControls } 