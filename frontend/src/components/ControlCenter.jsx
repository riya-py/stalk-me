import { useState, useEffect } from "react"
import { Wifi, Bluetooth, Moon, Sun, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"

const ControlCenter = ({ onClose, isDarkMode, onToggleDarkMode, brightness, onBrightnessChange }) => {
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [volume, setVolume] = useState(75)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setIsFullscreen(!!document.fullscreenElement)

    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  const tileBase =
    "flex flex-col items-center justify-center p-3 rounded-xl transition-colors text-white"

  return (
    <div
      className="absolute top-12 right-4 w-80 bg-white/20 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4">
        <div className="grid grid-cols-4 gap-3 mb-4">
          <button
            type="button"
            className={`${tileBase} ${wifiEnabled ? "bg-blue-500" : "bg-black/30"}`}
            onClick={() => setWifiEnabled((v) => !v)}
          >
            <Wifi className="w-6 h-6 mb-1" />
            <span className="text-xs">Wi-Fi</span>
          </button>

          <button
            type="button"
            className={`${tileBase} ${bluetoothEnabled ? "bg-blue-500" : "bg-black/30"}`}
            onClick={() => setBluetoothEnabled((v) => !v)}
          >
            <Bluetooth className="w-6 h-6 mb-1" />
            <span className="text-xs">Bluetooth</span>
          </button>

          <button
            type="button"
            className={`${tileBase} ${isDarkMode ? "bg-blue-500" : "bg-black/30"}`}
            onClick={onToggleDarkMode}
          >
            {isDarkMode ? <Moon className="w-6 h-6 mb-1" /> : <Sun className="w-6 h-6 mb-1" />}
            <span className="text-xs">{isDarkMode ? "Dark" : "Light"}</span>
          </button>

          <button
            type="button"
            className={`${tileBase} ${isFullscreen ? "bg-blue-500" : "bg-black/30"}`}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize className="w-6 h-6 mb-1" /> : <Maximize className="w-6 h-6 mb-1" />}
            <span className="text-xs">{isFullscreen ? "Exit" : "Fullscreen"}</span>
          </button>
        </div>

        <div className="bg-black/30 rounded-xl p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm">Display</span>
            <span className="text-white text-sm">{brightness}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => onBrightnessChange(Number.parseInt(e.target.value))}
            className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="bg-black/30 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm">Volume</span>
            <span className="text-white text-sm">{volume}%</span>
          </div>
          <div className="flex items-center gap-2">
            {volume === 0 ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number.parseInt(e.target.value))}
              className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlCenter