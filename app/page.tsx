'use client'
import { useState, useEffect } from 'react'
import LoginScreen from '@/components/LoginScreen'
import GameWorld from '@/components/GameWorld'

export interface Player {
  id: string
  username: string
  gender: 'boy' | 'girl'
  skinTone: string
  hairColor: string
  outfitColor: string
  shirtStyle: 'tshirt' | 'hoodie' | 'dress' | 'jacket'
  pantsColor: string
  accessory: 'none' | 'hat' | 'bow' | 'glasses' | 'crown'
  shoeColor: string
  x: number
  y: number
  direction: 'left' | 'right'
  isMoving: boolean
  emoji: string
}

export default function Home() {
  const [player, setPlayer] = useState<Player | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('cute-world-player')
    if (saved) {
      try {
        const p = JSON.parse(saved)
        setPlayer(p)
      } catch {}
    }
  }, [])

  const handleLogin = (p: Player) => {
    localStorage.setItem('cute-world-player', JSON.stringify(p))
    setPlayer(p)
  }

  const handleLogout = () => {
    localStorage.removeItem('cute-world-player')
    setPlayer(null)
  }

  if (!player) return <LoginScreen onLogin={handleLogin} />
  return <GameWorld player={player} onLogout={handleLogout} />
}
