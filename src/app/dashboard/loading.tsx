export default function DashboardLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 rounded-full border-2 border-[#E8002D] border-t-transparent animate-spin" />
        <p className="text-sm text-gray-400">Loading dashboard...</p>
      </div>
    </div>
  );
}
