"use client"

import { useEffect, useState } from "react"
import PickupRequestCard from "./PickupRequestCard.jsx"
import axios from "axios"
import { Package, Loader2 } from "lucide-react"

const ActivePickups = () => {
  const [reports, setReports] = useState([])
  const [currStatus, setCurrStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getAllReports = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get("http://localhost:3000/api/user-dashboard/reports", { withCredentials: true })

      if (Array.isArray(data)) {
        setCurrStatus(true)
        setReports(data)
      } else if (data && typeof data.message === "string") {
        setCurrStatus(false)
        setReports([])
      } else {
        setCurrStatus(false)
        setReports([])
      }
    } catch (err) {
      setCurrStatus(false)
      setReports([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    console.log("clicked")
  }

  useEffect(() => {
    getAllReports()
  }, [])

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 min-h-[300px] max-h-[400px] sm:h-[360px] flex flex-col backdrop-blur-sm">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-xl">
          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
        </div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">Active Pickups</h3>
      </div>

      <div className="space-y-3 sm:space-y-4 overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
          </div>
        ) : currStatus ? (
          reports.map((report, index) => (
            <PickupRequestCard
              key={report._id || index}
              status={report.status}
              index={index}
              date={new Date(report.createdAt).toLocaleString()}
              trashDescription={report.trashDescription}
              placeDescription={report.placeDescription}
              showButton={report.status !== "in-progress"}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 bg-slate-100 rounded-full mb-4">
              <Package className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">No pickup requests made.</p>
            <p className="text-slate-400 text-sm mt-1">Your active pickups will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivePickups