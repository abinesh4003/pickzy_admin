'use client'
import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, X } from 'lucide-react'

// Global variables
let toastId = 0
let toastQueue = []
let updateToasts = () => {}

export function Toast() {
  const [toasts, setToasts] = useState([])

  // Connect the update function
  useEffect(() => {
    updateToasts = setToasts
    return () => { updateToasts = () => {} }
  }, [])

  return (
    <div className="fixed top-12 right-4 z-50 ">

      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            flex w-80 items-start gap-3 rounded-lg p-4 shadow-lg
            ${toast.variant === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'}
            animate-fade-in-up
          `}
        >
          <div className="mt-0.5">
            {toast.variant === 'success' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{toast.title}</h3>
            <p className="text-sm">{toast.description}</p>
          </div>
          <button 
            onClick={() => removeToast(toast.id)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Dismiss toast"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
   
  )
}

// Remove toast from queue
function removeToast(id) {
  toastQueue = toastQueue.filter(t => t.id !== id)
  updateToasts([...toastQueue])
}

// Show toast function
export function showToast(title, description, variant = 'success') {
  const id = ++toastId
  const toast = { id, title, description, variant }
  
  // Add to queue and update
  toastQueue.push(toast)
  updateToasts([...toastQueue])
  
  // Auto-dismiss after 5 seconds
  setTimeout(() => removeToast(id), 5000)
} 