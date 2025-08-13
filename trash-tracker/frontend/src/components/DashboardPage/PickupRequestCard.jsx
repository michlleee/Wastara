"use client";

import { MapPin, Trash2, Calendar, X } from "lucide-react";

const PickupRequestCard = ({
  trashDescription,
  placeDescription,
  status,
  index,
  date,
  showButton,
  onCancel,
}) => {
  const statusConfig = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      dot: "bg-amber-400",
    },
    "in-progress": {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-400",
    },
    completed: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      dot: "bg-emerald-400",
    },
    cancelled: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      dot: "bg-red-400",
    },
  };

  const currentStatus = statusConfig[status] || {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-400",
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm shadow-sm border border-slate-300 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl flex flex-col hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-400/80 transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex flex-col xs:flex-row justify-between items-start gap-3 xs:gap-0 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-slate-100 rounded-lg sm:rounded-xl group-hover:bg-slate-200 transition-colors">
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-base sm:text-lg">
              Pickup #{index + 1}
            </p>
            {date && (
              <div className="flex items-center gap-1.5 mt-1">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                <p className="text-xs sm:text-xs text-slate-500">{date}</p>
              </div>
            )}
          </div>
        </div>

        <div
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border self-start xs:self-auto ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}
        >
          <div
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${currentStatus.dot}`}
          ></div>
          <span className="text-xs font-medium capitalize">{status}</span>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-50/80 border border-slate-200/60 hover:bg-slate-100/80 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
            <p className="font-medium text-slate-900 text-sm">
              Trash Description
            </p>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed pl-5 sm:pl-6">
            {trashDescription || "No description provided."}
          </p>
        </div>

        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-50/80 border border-slate-200/60 hover:bg-slate-100/80 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
            <p className="font-medium text-slate-900 text-sm">
              Location Description
            </p>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed pl-5 sm:pl-6">
            {placeDescription || "No location description provided."}
          </p>
        </div>
      </div>

      {showButton && (
        <button
          onClick={onCancel}
          className="
            group/btn
            bg-red-50
            border
            border-red-200
            text-red-600
            px-3 sm:px-4
            py-2 sm:py-2.5
            rounded-lg sm:rounded-xl
            text-sm font-medium
            hover:bg-red-100
            hover:border-red-300
            hover:text-red-700
            transition-all
            duration-200
            shadow-sm
            hover:shadow-md
            focus:outline-none
            focus:ring-2
            focus:ring-red-200
            focus:ring-opacity-50
            self-start
            flex
            items-center
            gap-2
            w-full xs:w-auto
          "
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:rotate-90 transition-transform duration-200" />
          Cancel Request
        </button>
      )}
    </div>
  );
};

export default PickupRequestCard;
