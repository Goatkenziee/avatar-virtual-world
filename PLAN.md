# Avatar Virtual World — PLAN.md

## Goal
Build a complete, single-file HTML online virtual world where users create cute boy/girl avatars with usernames, customize clothing/colors, and interact in a shared 2D world.

## Stack
- Single self-contained HTML file (no framework, no build step)
- Vanilla JS + Canvas 2D API for rendering
- CSS animations for UI polish
- localStorage for persistence
- Deploy: Vercel (mode=files, single index.html)

## File Tree
- `index.html` — entire game: avatar creator, world engine, chat, multiplayer simulation

## Features
1. **Avatar Creator**
   - Choose boy or girl base
   - Skin tone selector (6 tones)
   - Hair style + color (8 styles, 12 colors)
   - Outfit selector (8 outfits per gender, color tinted)
   - Username input
   - Live preview

2. **Virtual World**
   - 2D top-down world with grass, paths, trees, houses
   - Player avatar walks with WASD / arrow keys
   - Smooth animation (idle bounce, walk cycle)
   - Camera follows player

3. **Social Features**
   - NPC avatars (simulated other players) roaming the world
   - Press E near another player to "interact" (wave/chat bubble)
   - Chat bubble system
   - Player name tags above avatars

4. **UI Polish**
   - Cute pastel color scheme
   - Animated avatar creator with live preview
   - Mini-map
   - On-screen controls hint

## Data / API
- None (fully self-contained, localStorage for save)

## Open Questions
- Multiplayer: Real-time server not available → simulate with multiple NPC "players" that move around and have usernames. Sufficient for the demo.
- World size: 3000x3000 px virtual world with viewport pan
