export default function Nav() {
  return <>
  {/* Navbar */}
  <nav className="navbar bg-blue-800 rounded-lg ">
        <div className="flex-1 px-4">
          <div className="w-8 h-8">{/* Optional: Add logo here */}</div>
          <a className="btn btn-ghost text-xl text-white font-mono">Metro TV</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost mr-4 text-white font-bold">
            Sign In
          </button>
        </div>
      </nav>
  </>;
}
