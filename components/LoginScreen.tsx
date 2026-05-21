'use client'
import { useState } from 'react'
import { Player } from '@/app/page'
import AvatarSVG from './AvatarSVG'

const SKIN_TONES = ['#FDDBB4', '#F5C28A', '#D4956A', '#A0522D', '#5C3317']
const HAIR_COLORS = ['#1a1a1a', '#4a2900', '#8B4513', '#D2691E', '#DAA520', '#FFD700', '#FF69B4', '#9400D3', '#FF4500', '#E8E8E8']
const SHIRT_COLORS = ['#FF6B6B', '#FF8E53', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF', '#FF9FF3', '#00CEC9', '#FDCB6E', '#2D3436']
const PANTS_COLORS = ['#2C3E50', '#34495E', '#2980B9', '#1ABC9C', '#E74C3C', '#8E44AD', '#2ECC71', '#F39C12', '#ECF0F1', '#7F8C8D']
const SHOE_COLORS = ['#2C2C2C', '#FFFFFF', '#FF4444', '#4488FF', '#44CC44', '#FFD700', '#FF69B4', '#8B4513']
const SHIRT_STYLES: Array<{ value: Player['shirtStyle']; label: string; emoji: string }> = [
  { value: 'tshirt', label: 'T-Shirt', emoji: '👕' },
  { value: 'hoodie', label: 'Hoodie', emoji: '🧥' },
  { value: 'jacket', label: 'Jacket', emoji: '🥋' },
  { value: 'dress', label: 'Dress', emoji: '👗' },
]
const ACCESSORIES: Array<{ value: Player['accessory']; label: string; emoji: string }> = [
  { value: 'none', label: 'None', emoji: '✖️' },
  { value: 'hat', label: 'Hat', emoji: '🎩' },
  { value: 'bow', label: 'Bow', emoji: '🎀' },
  { value: 'glasses', label: 'Glasses', emoji: '👓' },
  { value: 'crown', label: 'Crown', emoji: '👑' },
]

interface Props { onLogin: (p: Player) => void }

export default function LoginScreen({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState<'boy' | 'girl'>('boy')
  const [skinTone, setSkinTone] = useState(SKIN_TONES[0])
  const [hairColor, setHairColor] = useState(HAIR_COLORS[2])
  const [outfitColor, setOutfitColor] = useState(SHIRT_COLORS[4])
  const [shirtStyle, setShirtStyle] = useState<Player['shirtStyle']>('tshirt')
  const [pantsColor, setPantsColor] = useState(PANTS_COLORS[0])
  const [accessory, setAccessory] = useState<Player['accessory']>('none')
  const [shoeColor, setShoeColor] = useState(SHOE_COLORS[0])
  const [error, setError] = useState('')

  const previewPlayer: Player = {
    id: 'preview',
    username: username || 'Preview',
    gender,
    skinTone,
    hairColor,
    outfitColor,
    shirtStyle,
    pantsColor,
    accessory,
    shoeColor,
    x: 0, y: 0,
    direction: 'right',
    isMoving: false,
    emoji: gender === 'boy' ? '👦' : '👧',
  }

  const handleSubmit = () => {
    if (!username.trim() || username.trim().length < 2) {
      setError('Username must be at least 2 characters!')
      return
    }
    if (username.trim().length > 16) {
      setError('Username max 16 characters!')
      return
    }
    const player: Player = {
      id: `player_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      username: username.trim(),
      gender,
      skinTone,
      hairColor,
      outfitColor,
      shirtStyle,
      pantsColor,
      accessory,
      shoeColor,
      x: 200 + Math.random() * 400,
      y: 200 + Math.random() * 200,
      direction: 'right',
      isMoving: false,
      emoji: gender === 'boy' ? '👦' : '👧',
    }
    onLogin(player)
  }

  const ColorPicker = ({ label, colors, value, onChange }: { label: string; colors: string[]; value: string; onChange: (c: string) => void }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 12, color: '#aaa', marginBottom: 5 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {colors.map(c => (
          <div
            key={c}
            onClick={() => onChange(c)}
            style={{
              width: 26, height: 26, borderRadius: '50%', background: c,
              cursor: 'pointer',
              border: value === c ? '3px solid #fff' : '2px solid transparent',
              boxShadow: value === c ? '0 0 0 2px #7C3AED' : '0 1px 3px rgba(0,0,0,0.4)',
              transition: 'all 0.15s',
              transform: value === c ? 'scale(1.2)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Segoe UI', sans-serif",
      padding: 20,
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '32px 28px',
        width: '100%', maxWidth: 720,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
      }}>
        {/* LEFT: Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', textAlign: 'center', lineHeight: 1.2 }}>
            🌟 Cute World
          </div>
          <div style={{
            background: 'linear-gradient(180deg, #a8edea 0%, #7ec8e3 40%, #6ab8d4 70%, #5a9db8 100%)',
            borderRadius: 20,
            width: 200, height: 220,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            padding: '0 0 16px 0',
            position: 'relative',
            boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.15)',
            overflow: 'hidden',
          }}>
            {/* Sky elements */}
            <div style={{ position: 'absolute', top: 12, left: 16, fontSize: 20 }}>☁️</div>
            <div style={{ position: 'absolute', top: 20, right: 14, fontSize: 14 }}>☀️</div>
            {/* Ground */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 50,
              background: 'linear-gradient(180deg, #90EE90 0%, #228B22 100%)',
              borderRadius: '0 0 20px 20px',
            }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <AvatarSVG player={previewPlayer} size={120} />
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, textAlign: 'center' }}>
            Your avatar preview<br />updates in real-time!
          </div>
        </div>

        {/* RIGHT: Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', maxHeight: 520 }}>
          {/* Username */}
          <div>
            <div style={{ fontSize: 12, color: '#aaa', marginBottom: 5 }}>Username</div>
            <input
              value={username}
              onChange={e => { setUsername(e.target.value); setError('') }}
              placeholder="Enter your name..."
              maxLength={16}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%', padding: '10px 14px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10, color: '#fff',
                fontSize: 15, outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {error && <div style={{ color: '#ff6b6b', fontSize: 12, marginTop: 4 }}>{error}</div>}
          </div>

          {/* Gender */}
          <div>
            <div style={{ fontSize: 12, color: '#aaa', marginBottom: 5 }}>Gender</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['boy', 'girl'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} style={{
                  flex: 1, padding: '8px 0',
                  background: gender === g ? 'linear-gradient(135deg, #7C3AED, #EC4899)' : 'rgba(255,255,255,0.07)',
                  border: 'none', borderRadius: 10, color: '#fff',
                  cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  transition: 'all 0.2s',
                }}>
                  {g === 'boy' ? '👦 Boy' : '👧 Girl'}
                </button>
              ))}
            </div>
          </div>

          {/* Shirt Style */}
          <div>
            <div style={{ fontSize: 12, color: '#aaa', marginBottom: 5 }}>Outfit Style</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {SHIRT_STYLES.map(s => (
                <button key={s.value} onClick={() => setShirtStyle(s.value)} style={{
                  padding: '7px 4px',
                  background: shirtStyle === s.value ? 'linear-gradient(135deg, #7C3AED, #EC4899)' : 'rgba(255,255,255,0.07)',
                  border: 'none', borderRadius: 8, color: '#fff',
                  cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  transition: 'all 0.2s',
                }}>
                  {s.emoji} {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accessory */}
          <div>
            <div style={{ fontSize: 12, color: '#aaa', marginBottom: 5 }}>Accessory</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {ACCESSORIES.map(a => (
                <button key={a.value} onClick={() => setAccessory(a.value)} title={a.label} style={{
                  padding: '5px 8px',
                  background: accessory === a.value ? 'linear-gradient(135deg, #7C3AED, #EC4899)' : 'rgba(255,255,255,0.07)',
                  border: 'none', borderRadius: 8, color: '#fff',
                  cursor: 'pointer', fontSize: 16,
                  transition: 'all 0.2s',
                }}>
                  {a.emoji}
                </button>
              ))}
            </div>
          </div>

          <ColorPicker label="Skin Tone" colors={SKIN_TONES} value={skinTone} onChange={setSkinTone} />
          <ColorPicker label="Hair Color" colors={HAIR_COLORS} value={hairColor} onChange={setHairColor} />
          <ColorPicker label="Outfit Color" colors={SHIRT_COLORS} value={outfitColor} onChange={setOutfitColor} />
          <ColorPicker label="Pants / Bottom Color" colors={PANTS_COLORS} value={pantsColor} onChange={setPantsColor} />
          <ColorPicker label="Shoe Color" colors={SHOE_COLORS} value={shoeColor} onChange={setShoeColor} />

          <button
            onClick={handleSubmit}
            style={{
              marginTop: 8,
              padding: '13px 0',
              background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
              border: 'none', borderRadius: 12,
              color: '#fff', fontSize: 16, fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
              transition: 'transform 0.15s',
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Enter the World 🚀
          </button>
        </div>
      </div>
    </div>
  )
}
