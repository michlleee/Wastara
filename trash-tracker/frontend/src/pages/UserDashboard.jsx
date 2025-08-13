"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from "../components/DashboardPage/Sidebar"
import StatCard from "../components/DashboardPage/StatCard"
import ActivePickups from "../components/DashboardPage/ActivePickups"
import MonthlyReportCard from "../components/DashboardPage/MonthlyReportCard"
import ReportNowCard from "../components/DashboardPage/ReportNowCard"
import UserCard from "../components/DashboardPage/UserProfileCard"

const UserDashboard = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [reports, setReports] = useState([])

  const getAllReports = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/user-dashboard/reports", { withCredentials: true })

      if (Array.isArray(data)) {
        setReports(data)
      } else if (data && typeof data.message === "string") {
        setReports([])
      } else {
        setReports([])
      }
    } catch (err) {
      setReports([])
    }
  }

  const fetchUserData = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/me", {
        withCredentials: true,
      })

      setUserData(result.data)
    } catch (err) {
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
    getAllReports()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating circles */}
        <div
          className="absolute top-10 left-20 w-6 h-6 bg-emerald-200/30 rounded-full animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-32 right-16 w-8 h-8 bg-green-300/25 rounded-full animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "5s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 w-5 h-5 bg-teal-200/35 rounded-full animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-emerald-300/40 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
        ></div>
        <div
          className="absolute bottom-16 right-1/3 w-7 h-7 bg-green-200/20 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "6s" }}
        ></div>

        {/* Medium floating circles */}
        <div
          className="absolute top-60 left-1/2 w-3 h-3 bg-emerald-400/30 rounded-full animate-bounce"
          style={{ animationDelay: "3s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-60 right-20 w-4 h-4 bg-teal-300/25 rounded-full animate-bounce"
          style={{ animationDelay: "2.5s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-80 left-16 w-2.5 h-2.5 bg-green-400/35 rounded-full animate-bounce"
          style={{ animationDelay: "1.8s", animationDuration: "5.5s" }}
        ></div>

        {/* Small floating circles */}
        <div
          className="absolute top-20 left-1/4 w-2 h-2 bg-emerald-300/40 rounded-full animate-bounce"
          style={{ animationDelay: "0.3s", animationDuration: "3.2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-3/4 w-1.5 h-1.5 bg-green-300/45 rounded-full animate-bounce"
          style={{ animationDelay: "2.2s", animationDuration: "4.8s" }}
        ></div>
        <div
          className="absolute top-1/3 left-2/3 w-2 h-2 bg-teal-400/30 rounded-full animate-bounce"
          style={{ animationDelay: "1.2s", animationDuration: "3.8s" }}
        ></div>

        {/* Floating stars - various sizes */}
        <div
          className="absolute top-16 right-1/3 text-emerald-300/50 animate-pulse"
          style={{ animationDelay: "0s", animationDuration: "2.5s" }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div
          className="absolute bottom-1/3 left-20 text-green-300/45 animate-pulse"
          style={{ animationDelay: "1.5s", animationDuration: "3s" }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div
          className="absolute top-2/3 left-1/2 text-teal-300/40 animate-pulse"
          style={{ animationDelay: "2.8s", animationDuration: "2.2s" }}
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div
          className="absolute top-40 left-3/4 text-emerald-400/35 animate-pulse"
          style={{ animationDelay: "0.8s", animationDuration: "2.8s" }}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div
          className="absolute bottom-20 left-1/3 text-green-400/40 animate-pulse"
          style={{ animationDelay: "3.2s", animationDuration: "2.6s" }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        {/* Floating diamonds/squares */}
        <div
          className="absolute top-24 right-1/2 w-3 h-3 bg-emerald-200/30 rotate-45 animate-spin"
          style={{ animationDelay: "1s", animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-teal-300/35 rotate-45 animate-spin"
          style={{ animationDelay: "2.5s", animationDuration: "10s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-2.5 h-2.5 bg-green-300/25 rotate-45 animate-spin"
          style={{ animationDelay: "0.5s", animationDuration: "12s" }}
        ></div>

        {/* Floating triangles */}
        <div
          className="absolute top-36 left-2/3 text-emerald-300/30 animate-bounce"
          style={{ animationDelay: "1.8s", animationDuration: "4.2s" }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2 L22 20 L2 20 Z" />
          </svg>
        </div>
        <div
          className="absolute bottom-36 right-2/3 text-teal-300/35 animate-bounce"
          style={{ animationDelay: "2.3s", animationDuration: "3.7s" }}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2 L22 20 L2 20 Z" />
          </svg>
        </div>
      </div>

      <div className="flex min-h-screen relative z-10">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 p-4 space-y-6 md:ml-18 pt-16 md:pt-4">
          <div className="space-y-6">
            <UserCard name={userData.name} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Total trash reported:"
                value={reports.length}
                unit="trashes"
                icon={<span className="text-xl">😊</span>}
              />
              <StatCard
                title="Trash reported this month:"
                value={12}
                unit="trashes"
                bgColor="#C6D6B8"
                icon={
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13H1V7H3V13M9 13H7V9H9V13M15 13H13V11H15V13M21 13H19V8H21V13..." />
                  </svg>
                }
              />
              <StatCard
                title="Pickups Completed:"
                value={132}
                unit="trashes"
                icon={
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                  </svg>
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <ActivePickups />
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg shadow-emerald-100/20 border border-white/30 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 h-full">
                <ReportNowCard />
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg shadow-emerald-100/20 border border-white/30 hover:shadow-xl transition-all duration-300 h-full">
                <MonthlyReportCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
