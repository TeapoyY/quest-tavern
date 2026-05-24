# Adventure Guild Quest Board — SPEC.md

## 1. Concept & Vision

A TODO list reimagined as a fantasy RPG quest board set inside a warm, candlelit tavern. Each task is a guild commission — complete it, earn gold, spend gold on tavern decorations and character equipment. The tone is cozy and nostalgic: worn parchment, flickering lanterns, the murmur of adventurers in a dimly lit inn. It should feel like opening a well-loved journal in a world that genuinely exists.

---

## 2. Design Language

### Aesthetic Direction
**Reference:** 《旅立ち书店》× 《八方美人庭》— warm paper textures, ink illustration style, soft light bleeding through lanterns. Not pixel art; warm hand-drawn illustration meets old book typography.

### Color Palette
| Role | Name | Hex |
|------|------|-----|
| Background | Tavern Dark Wood | `#1a0f05` |
| Surface | Worn Parchment | `#f5e6c8` |
| Surface Alt | Aged Paper | `#e8d4a8` |
| Primary | Burnished Gold | `#c9963a` |
| Primary Light | Candlelight | `#e8b84b` |
| Accent | Adventure Red | `#c04030` |
| Accent Muted | Crimson Ink | `#8b2e1e` |
| Text Dark | Ink Brown | `#2c1a0e` |
| Text Mid | Faded Ink | `#6b4a2a` |
| Text Light | Parchment Text | `#f0ddb0` |
| Border | Aged Wood | `#7a5a30` |

### Typography
- **Headings:** `Cinzel Decorative` (Google Fonts) — ornate serif, evokes old manuscripts
- **Body / UI:** `Crimson Text` (Google Fonts) — warm readable serif
- **Mono / Numbers:** `Courier Prime` — ledger-book feel for gold counts

### Spatial System
- Base unit: 8px
- Cards: 16px padding, 8px border-radius with subtle grain texture
- Sections: 32px between major blocks
- Max content width: 960px, centered

### Motion Philosophy
- **Entrance:** Staggered fade-up (opacity 0→1, translateY 12px→0, 350ms ease-out, 80ms stagger)
- **Hover:** Cards lift with shadow deepening (transform: translateY(-2px), 200ms)
- **Gold earn:** Coin burst animation — scale 1→1.2→1 with gold glow
- **Quest complete:** Stamp of "APPROVED" sweeps in (rotate -5°→0°, scale 0.8→1)
- **Ambient:** Subtle lantern flicker on borders (CSS keyframes, 4s infinite)
- All easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material ease-out feel, not mechanical)

### Visual Assets
- **Icons:** Inline SVG (custom) — sword, shield, scroll, coin, tankard, chair
- **Decorative:** Parchment texture via CSS noise gradient, torn-edge borders, wax seal accents
- **Background:** Layered dark wood gradient with subtle grain overlay
- **Borders:** Ornate corner flourishes as SVG pseudo-elements

---

## 3. Layout & Structure

```
┌─────────────────────────────────────────────────┐
│  [Tavern Header] "冒险家协会 · 第八酒馆"           │
│  Gold: 💰 120  |  Quests: 3/12 done              │
├──────────────────────┬──────────────────────────┤
│  QUEST BOARD         │  TAVERN SHOP             │
│  (left, 55%)         │  (right, 45%)            │
│                      │                           │
│  [Quest Card]        │  [Shop Tab: 装饰/装备]    │
│  [Quest Card]        │                           │
│  [Quest Card]        │  [Item Card]             │
│  [+ Add Quest]       │  [Item Card]             │
│                      │                           │
├──────────────────────┴──────────────────────────┤
│  CHARACTER PANEL (bottom, collapsible)          │
│  Avatar + Equipment Slots + Stats                │
└─────────────────────────────────────────────────┘
```

- **Responsive:** Below 768px, shop collapses to a slide-up drawer. Quest board goes full-width.
- **Scrolling:** Quest board scrolls independently; page-level scroll for the whole app.
- **Character panel:** Toggleable drawer from the bottom — shows equipped items and stats.

---

## 4. Features & Interactions

### Quest Board
- **Add quest:** Click "+ 接受新委托" → inline input field expands below the last card; pressing Enter or "Confirm" creates the quest
- **Quest card states:** `available` (grey border) / `in_progress` (gold border, glowing) / `completed` (stamped, dimmed)
- **Start quest:** Click card → "accept" animation → state changes to `in_progress`
- **Complete quest:** Click the ⚔️ Complete button → "APPROVED" stamp sweeps in → +gold animation → card dims to completed
- **Delete quest:** Hover card → ❌ appears top-right → click → fade out. Only available for completed quests (keeping the flow: accept → do → complete → optionally delete)
- **Edit quest:** Click the quest title (not the card) → inline edit
- **Quest data:** Title, description (optional), gold reward (10-100), difficulty tag (简单/普通/困难)

### Gold System
- Gold persists in `localStorage`
- Earning gold: coin burst animation on the gold counter
- Spending gold: counter decrements with a slight shake
- Starting gold: 50

### Tavern Shop
- **Two tabs:** "装饰" (decorations) and "装备" (equipment)
- **Decorations:** Tavern wall art, table centerpieces, banners, lantern styles — purely visual
- **Equipment:** Adventurer's sword, shield, armor, accessory — changes the character panel avatar
- **Purchase:** Click item → if enough gold, gold deducted, item marked as "owned" — badge "已拥有"
- **Already owned:** Click owned item → equipped/unequipped toggle
- **Cannot afford:** Gold counter flashes red briefly

### Character Panel
- Avatar: A simple illustrated adventurer silhouette
- Equipment slots: Weapon, Armor, Accessory — clicking an equipped item unequips it
- Stats display: Total gold earned (all time), quests completed, decorations owned, equipment count

### Empty States
- No quests: "酒馆暂时没有委托… 或许你是第一个揭榜的勇者？"
- Empty shop tab: "老板说这类商品暂时缺货…"

---

## 5. Component Inventory

### `<QuestCard>`
- **Default:** Parchment card, quest title, description, gold reward badge, difficulty tag
- **Hover:** Slight lift, shadow deepens, ⚔️ "接受委托" button fades in
- **In-progress:** Gold glowing border, progress indicator
- **Completed:** "APPROVED" stamp overlay, desaturated, checkmark
- **Deleting:** Fade + scale down (300ms)

### `<ShopItem>`
- **Default:** Item icon (SVG), name, gold price, "购买" button
- **Owned:** Green "已拥有" badge, "卸下/装备" toggle button
- **Equipped:** Gold border, ✦ indicator
- **Cannot afford:** Greyed, gold price in red

### `<GoldCounter>`
- Coin SVG + animated number
- On increase: number rolls up, gold glow pulse
- On decrease: number rolls down, slight shake

### `<CharacterPanel>`
- Drawer that slides up from bottom
- Avatar illustration area with equipped items overlaid
- Stats: gold earned, quests done, items owned
- Toggle button always visible at bottom of screen

### `<AddQuestForm>`
- Collapsible inline form at bottom of quest board
- Input: quest title, description, gold, difficulty dropdown
- "确认" / "取消" buttons

---

## 6. Technical Approach

- **Framework:** React 18 + Vite (TypeScript)
- **Styling:** CSS Modules + CSS custom properties (no Tailwind)
- **State:** React `useState` + `useReducer` for quest logic; `localStorage` for persistence
- **Animations:** CSS transitions + `@keyframes` (no Framer Motion dependency)
- **Fonts:** Google Fonts via `@import` in CSS
- **Icons:** Inline SVG components (no icon library dependency)
- **Data:** All state in-memory, persisted to `localStorage` on every change via `useEffect`
- **No backend:** Fully client-side

### Data Model
```typescript
interface Quest {
  id: string;
  title: string;
  description: string;
  gold: number;       // 10-100
  difficulty: 'simple' | 'normal' | 'hard';
  status: 'available' | 'in_progress' | 'completed';
  createdAt: number;
}

interface ShopItem {
  id: string;
  name: string;
  category: 'decoration' | 'equipment';
  slot?: 'weapon' | 'armor' | 'accessory';
  price: number;
  description: string;
}

interface PlayerState {
  gold: number;
  completedQuests: string[]; // quest IDs
  ownedItems: string[];      // item IDs
  equippedItems: string[];   // item IDs (subset of owned)
  totalGoldEarned: number;
}
```

### File Structure
```
src/
  App.tsx
  main.tsx
  index.css          # global styles, fonts, CSS variables
  types.ts           # Quest, ShopItem, PlayerState interfaces
  data/
    shopItems.ts     # static shop inventory
    seedQuests.ts    # initial demo quests
  components/
    QuestBoard.tsx
    QuestCard.tsx
    AddQuestForm.tsx
    TavernShop.tsx
    ShopItem.tsx
    CharacterPanel.tsx
    GoldCounter.tsx
    Header.tsx
  hooks/
    useLocalStorage.ts
    useQuests.ts
    usePlayer.ts
```# Quest Tavern
# built Sun May 24 13:50:04 CST 2026
