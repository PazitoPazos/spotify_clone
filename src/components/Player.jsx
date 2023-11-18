import { usePlayerStore } from '@/store/playerStore'
import { useEffect, useRef, useState } from 'react'
import { Slider } from '@/components/Slider'

export const Pause = () => (
  <svg role="img" aria-hidden="true" viewBox="0 0 16 16" height="24" width="24" className="h-4 w-4">
  <path
    d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
)

export const Play = () => (
  <svg role="img" aria-hidden="true" viewBox="0 0 16 16" height="24" width="24" className="h-4 w-4">
    <path
    d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
)

export const NoVolume = () => (
  <svg fill="currentColor" data-encore-id="icon" role="presentation" aria-label="Volumen apagado" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" className="h-4 w-4">
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z">
    </path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
  </svg>
)

export const LowVolume = () => (
  <svg fill="currentColor" data-encore-id="icon" role="presentation" aria-label="Volumen bajo" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" className="h-4 w-4">
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
  </svg>
)

export const MediumVolume = () => (
  <svg fill="currentColor" data-encore-id="icon" role="presentation" aria-label="Volumen medio" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" className="h-4 w-4">
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path>
  </svg>
)

export const HighVolume = () => (
  <svg fill="currentColor" data-encore-id="icon" role="presentation" aria-label="Volumen alto" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" className="h-4 w-4">
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
  </svg>
)

const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className={'flex items-center gap-5 relative overflow-hidden'}>
      <picture className='w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden'>
        <img src={image} alt={title} />
      </picture>

      <div className='flex flex-col'>
        <h3 className='font-semibold text-sm block'>
          {title}
        </h3>
        <span className='text-xs opacity-80'>
          {artists?.join(', ')}
        </span>
      </div>
    </div>
  )
}

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime)
  }

  const formatTime = time => {
    if (time == null) return '0:00'

    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const duration = audio?.current?.duration

  return (
    <div className='flex gap-x-3 text-xs pt-2'>
      <span className='opacity-50 w-12 text-right'>
        {formatTime(currentTime)}
      </span>

      <Slider
        max={audio?.current?.duration ?? 0}
        min={0}
        step={1}
        value={[currentTime]}
        className='w-96'
        onValueChange={(value) => {
          audio.current.currentTime = value
        }}
      />
      
      <span className='opacity-50 w-12'>
        {duration ? formatTime(duration) : '0:00'}
      </span>
    </div>
  )
}

const VolumeControl = () => {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)
  const previousVolumeRef = useRef(volume)

  const isVolumeSilenced = volume === 0
  const isVolumeLow = volume > 0 && volume <= 0.3
  const isVolumeMedium = volume > 0.3 && volume <= 0.6
  const isVolumeHigh = volume > 0.6

  const handleClickVolume = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumeRef.current)
    } else {
      previousVolumeRef.current = volume
      setVolume(0)
    }
  }
  return (
    <div className='flex justify-center gap-x-2 text-white'>
      <button className='opacity-70 hover:opacity-100 transition' onClick={handleClickVolume}>
        {isVolumeSilenced && <NoVolume />}
        {isVolumeLow && <LowVolume />}
        {isVolumeMedium && <MediumVolume />}
        {isVolumeHigh && <HighVolume />}
      </button>

      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        step={1}
        value={[volume * 100]}
        className='w-24'
        onValueChange={(value) => {
          const [newVolume] = value
          const volumeValue = newVolume / 100
          setVolume(volumeValue)
        }}
        />
    </div>
  )
}

export function Player() {
  const { isPlaying, currentMusic, setIsPlaying, volume } = usePlayerStore(state => state)
  const audioRef = useRef()

  useEffect(() => {
    isPlaying
      ? audioRef.current.play()
      : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const { song, playlist, songs } = currentMusic

    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.volume = volume
      audioRef.current.play()
    }

  }, [currentMusic])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className='flex flex-row justify-between w-full px-1 z-50'>
      <div className='w-40'>
        <CurrentSong {...currentMusic.song} />
      </div>

      <div className='grid place-content-center gap-4 flex-1'>
        <div className='flex justify-center flex-col items-center'>
          <button className='bg-white rounded-full p-2' onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControl audio={audioRef} />
          <audio ref={audioRef} />
        </div>
      </div>

      <div className='grid place-content-center'>
        <VolumeControl audioRef={audioRef} />
      </div>
    </div>
  )
}