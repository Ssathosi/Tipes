# 🎨 TIPES - Design Specification Document

**Version:** 1.0  
**Created:** June 2024  
**Design System:** TIPES Design System v1  
**Target Platform:** Web PWA (Responsive Mobile-First)

---

## **TABLE OF CONTENTS**

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Grid](#spacing--grid)
5. [Components Library](#components-library)
6. [Animation Guidelines](#animation-guidelines)
7. [Icon System](#icon-system)
8. [Screen Designs](#screen-designs)
9. [Dark Mode Guidelines](#dark-mode-guidelines)

---

## **DESIGN PHILOSOPHY**

**TIPES Design System Pillars:**
- **Modern** - Clean, contemporary design with purpose
- **Playful** - Friendly, approachable, not corporate
- **Minimalist** - Essential elements only, no clutter
- **Soft** - Gentle colors, smooth interactions, calming vibe

**Design Principle:** *"Make tracking money as easy and pleasant as possible"*

---

## **COLOR SYSTEM**

### **1. Light Mode Palette**

#### **Primary Colors**
```
Primary Blue (CTA, Actions)
HEX: #5B7FFF
RGB: 91, 127, 255
Usage: Buttons, links, active states, highlights

Accent Green (Income, Positive)
HEX: #7FD5B1
RGB: 127, 213, 177
Usage: Income amounts, positive indicators, success states

Accent Pink (Expense, Warning)
HEX: #F5A5BE
RGB: 245, 165, 190
Usage: Expense amounts, warnings, alerts

Accent Yellow (Secondary Action)
HEX: #FFD77B
RGB: 255, 215, 123
Usage: Secondary buttons, highlights, badges
```

#### **Neutral Colors**
```
White/Background
HEX: #FFFFFF
RGB: 255, 255, 255
Usage: Main background, cards

Gray 50
HEX: #F9FAFB
RGB: 249, 250, 251
Usage: Secondary backgrounds, hover states

Gray 100
HEX: #F3F4F6
RGB: 243, 244, 246
Usage: Input backgrounds, dividers

Gray 300
HEX: #D1D5DB
RGB: 209, 213, 219
Usage: Borders, disabled states

Gray 600
HEX: #4B5563
RGB: 75, 85, 99
Usage: Secondary text, labels

Gray 900
HEX: #1F2937
RGB: 31, 41, 55
Usage: Primary text, headings
```

#### **Gradient Backgrounds (Optional)**
```
Soft Blue-Purple Gradient
From: #5B7FFF (20% opacity)
To: #7FD5B1 (20% opacity)
Angle: 135deg
Usage: Page backgrounds, card backgrounds for emphasis

Soft Pink-Yellow Gradient
From: #F5A5BE (15% opacity)
To: #FFD77B (15% opacity)
Angle: 45deg
Usage: Accent areas, promotional cards
```

#### **Category Colors** (for transaction categorization)
```
Food/Makanan: #FF8C42 (Warm Orange)
Transport/Transportasi: #5B7FFF (Blue)
Shopping/Belanja: #F5A5BE (Pink)
Entertainment/Hiburan: #7FD5B1 (Green)
Health/Kesehatan: #FFD77B (Yellow)
Utilities/Utilitas: #B4A7D6 (Purple)
Income/Pemasukan: #7FD5B1 (Green)
Other/Lainnya: #D1D5DB (Gray)
```

---

### **2. Dark Mode Palette**

#### **Primary Colors (Dark)**
```
Dark Background (Main)
HEX: #0F1419
RGB: 15, 20, 25
Usage: Page background

Dark Surface (Secondary)
HEX: #1F2937
RGB: 31, 41, 55
Usage: Cards, modals, containers

Primary Blue (Same as Light)
HEX: #5B7FFF
RGB: 91, 127, 255
Usage: Buttons, links, active states

Accent Green (Slightly Brighter)
HEX: #8BE5C4
RGB: 139, 229, 196
Usage: Income, positive states

Accent Pink (Slightly Brighter)
HEX: #FF9DBF
RGB: 255, 157, 191
Usage: Expense, alerts

Accent Yellow (Same)
HEX: #FFD77B
RGB: 255, 215, 123
Usage: Secondary actions
```

#### **Dark Mode Text Colors**
```
Primary Text (Headings)
HEX: #FFFFFF
RGB: 255, 255, 255

Secondary Text (Body)
HEX: #D1D5DB
RGB: 209, 213, 219

Tertiary Text (Labels)
HEX: #9CA3AF
RGB: 156, 163, 175
```

#### **Dark Mode Gradients**
```
Dark Gradient Background
From: #1F2937
To: #0F1419
Angle: 135deg
Usage: Page backgrounds
```

---

## **TYPOGRAPHY**

### **Font Family**
**Primary Font:** "DM Sans"
- Import from Google Fonts
- Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- Weight options: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)

### **Type Scale**

#### **Headings**
```
H1 - Page Title
Font Size: 32px
Font Weight: 700 (Bold)
Line Height: 40px (1.25)
Letter Spacing: -0.5px
Margin Bottom: 24px
Usage: Page titles, onboarding

Example: "Your Spending Today"

---

H2 - Section Title
Font Size: 24px
Font Weight: 600 (Semi-Bold)
Line Height: 32px (1.33)
Letter Spacing: -0.25px
Margin Bottom: 16px
Usage: Section headers, card titles

Example: "Weekly Summary"

---

H3 - Card Title
Font Size: 18px
Font Weight: 600 (Semi-Bold)
Line Height: 28px (1.55)
Letter Spacing: 0px
Margin Bottom: 12px
Usage: Card titles, subsection headers

Example: "Makanan"

---

H4 - Label/Caption
Font Size: 14px
Font Weight: 600 (Semi-Bold)
Line Height: 20px (1.43)
Letter Spacing: 0.25px
Usage: Form labels, category names

Example: "Amount"
```

#### **Body Text**
```
Body Large
Font Size: 16px
Font Weight: 400 (Regular)
Line Height: 24px (1.5)
Letter Spacing: 0px
Usage: Transaction descriptions, main content, descriptions

Example: "Starbucks Coffee"

---

Body Regular
Font Size: 14px
Font Weight: 400 (Regular)
Line Height: 20px (1.43)
Letter Spacing: 0px
Usage: Body text, transaction items, general content

Example: "Jan 26, 2023"

---

Body Small
Font Size: 12px
Font Weight: 400 (Regular)
Line Height: 16px (1.33)
Letter Spacing: 0px
Usage: Helper text, timestamps, metadata

Example: "+2.3%"
```

#### **Button Text**
```
Button Text
Font Size: 16px
Font Weight: 600 (Semi-Bold)
Line Height: 24px (1.5)
Letter Spacing: 0.25px
Uppercase: No (keep natural case)
Usage: CTA buttons, action buttons

Example: "Save Transaction"
```

---

## **SPACING & GRID**

### **Spacing Scale**
Base Unit: **8px**

```
Spacing Values:
xs:  4px   (0.5x)
sm:  8px   (1x)
md:  16px  (2x)
lg:  24px  (3x)
xl:  32px  (4x)
2xl: 40px  (5x)
3xl: 48px  (6x)
4xl: 56px  (7x)
5xl: 64px  (8x)
```

### **Grid System**
**Mobile Grid:** 4-column grid (375px width)
```
Column width: 80px
Gutter (margin between columns): 16px
Side margin: 16px
```

**Tablet Grid:** 8-column grid (768px width)
```
Column width: 80px
Gutter: 16px
Side margin: 32px
```

**Desktop Grid:** 12-column grid (1440px width)
```
Column width: 100px
Gutter: 24px
Side margin: 48px
```

---

## **COMPONENTS LIBRARY**

### **1. BUTTONS**

#### **Button - Primary (Large)**
```
State: Default
Background: Linear gradient #5B7FFF to #6B8FFF
Text Color: White (#FFFFFF)
Font Size: 16px
Font Weight: 600
Padding: 16px 24px
Border Radius: 12px
Border: None

State: Hover
Background: Darker shade #4B6FFF
Box Shadow: 0 4px 12px rgba(91, 127, 255, 0.3)

State: Active/Pressed
Background: #3B5FFF
Transform: scale(0.95)
Transition: all 0.2s ease-in-out

State: Disabled
Background: #D1D5DB
Text Color: #9CA3AF
Cursor: not-allowed

AI Prompt for Stitch/Visual Generation:
"A large rounded button with text 'SAVE TRANSACTION', 
gradient background from soft blue (#5B7FFF) to slightly darker blue, 
white text, 12px border radius, 
clean modern design, 
soft subtle shadow beneath"
```

#### **Button - Secondary**
```
State: Default
Background: #F3F4F6 (Light Gray)
Text Color: #1F2937 (Dark Gray)
Border: 1px solid #D1D5DB
Padding: 14px 20px
Border Radius: 12px
Font Size: 16px
Font Weight: 600

State: Hover
Background: #E5E7EB
Box Shadow: 0 2px 8px rgba(0, 0, 0, 0.08)

State: Active
Background: #D1D5DB
Transform: scale(0.95)

Dark Mode:
Background: #2D3748
Text Color: #F3F4F6
Border: 1px solid #4B5563
```

#### **Button - Icon/FAB (Floating Action Button)**
```
Size: 56px x 56px
Background: Linear gradient #5B7FFF to #6B8FFF
Border Radius: 12px
Icon Color: White
Icon Size: 28px
Icon Type: Plus/Add icon (stroke 2.5)
Box Shadow: 0 8px 20px rgba(91, 127, 255, 0.25)

State: Active
Transform: scale(0.92)
Transition: all 0.15s ease-out

Position: Bottom-right corner
Margin: 16px from bottom, 16px from right
```

#### **Button - Text Only (Link)**
```
Text Color: #5B7FFF (Primary Blue)
Font Size: 14px
Font Weight: 500
Text Decoration: None
Padding: 8px 0px

State: Hover
Text Color: #3B5FFF (Darker Blue)
Text Decoration: underline

State: Active
Opacity: 0.7
```

---

### **2. INPUT FIELDS**

#### **Text Input - Default**
```
Height: 48px
Padding: 12px 16px
Background: #F9FAFB (Light Gray)
Border: 1px solid #D1D5DB
Border Radius: 12px
Font Size: 16px
Font Weight: 400
Font Family: DM Sans

Label:
Font Size: 14px
Font Weight: 600
Color: #1F2937
Margin Bottom: 8px

State: Focus
Border Color: #5B7FFF
Box Shadow: 0 0 0 3px rgba(91, 127, 255, 0.1)
Transition: all 0.2s ease-in-out

State: Error
Border Color: #F5A5BE (Pink)
Box Shadow: 0 0 0 3px rgba(245, 165, 190, 0.1)
Error Message Color: #F5A5BE

State: Filled
Background: #FFFFFF
Border Color: #D1D5DB

State: Disabled
Background: #F3F4F6
Color: #9CA3AF
Cursor: not-allowed

Dark Mode:
Background (Default): #2D3748
Border Color: #4B5563
Focus Border: #5B7FFF
```

#### **Number Input (For Amount)**
```
Same as Text Input but:
Text Align: Right
Font Size: 18px
Font Weight: 600
Padding Right: 20px (for currency symbol if needed)

Type Attribute: number
Min: 0
Step: 1
Auto-format: Add comma separator (25000 → 25,000)

Placeholder: "0"
Placeholder Color: #9CA3AF
```

---

### **3. CARDS**

#### **Transaction Card**
```
Background: #FFFFFF
Border Radius: 12px
Padding: 16px
Margin Bottom: 12px
Border: None
Box Shadow: 0 2px 8px rgba(0, 0, 0, 0.06)

State: Hover
Box Shadow: 0 4px 16px rgba(0, 0, 0, 0.12)
Transform: translateY(-2px)
Transition: all 0.2s ease-out

Layout (Flexbox):
- Left: Icon (40x40px) + Category name (left)
- Right: Amount + Date (right)

Icon Background: Category color with 10% opacity
Icon Size: 24px
Category Name Font: Body Regular (14px)
Date Font: Body Small (12px), Color: Gray 600
Amount Font: Body Large (16px, 600 weight), Color: Depends on type (expense: Pink, income: Green)

Dark Mode:
Background: #1F2937
Box Shadow: 0 2px 8px rgba(0, 0, 0, 0.3)
```

#### **Summary Card (Large)**
```
Background: Linear gradient from #5B7FFF (20% opacity) to #7FD5B1 (20% opacity)
Border Radius: 12px
Padding: 24px
Margin Bottom: 24px
Border: None

Layout:
- Title: "Today's Spending" (H3, color: Gray 900)
- Amount: "Rp 245.000" (32px, Bold, color: Primary Blue)
- Subtitle: "2 transactions" (Body Small, color: Gray 600)

Dark Mode:
Background: Linear gradient on dark surface
Gradient opacity adjusted to 30%
Title/Amount colors adjusted for dark contrast
```

#### **Preset Card/Chip**
```
Background: Category color with 15% opacity
Border: 1px solid Category color with 30% opacity
Border Radius: 12px
Padding: 12px 16px
Margin Right: 8px
Margin Bottom: 8px

Layout:
- Icon (16px) + Label (14px, 600 weight)
- Category color text

State: Selected
Background: Category color with 30% opacity
Border: 2px solid Category color
Box Shadow: 0 2px 8px rgba(Category color, 0.2)

State: Hover
Background: Category color with 25% opacity
Cursor: pointer

Transition: all 0.15s ease-in-out
```

---

### **4. TABS & NAVIGATION**

#### **Bottom Navigation Bar**
```
Height: 64px
Background: #FFFFFF
Border Top: 1px solid #E5E7EB
Position: Fixed bottom
Padding Top: 8px
Padding Bottom: 16px
Display: Flex, space-around

Tab Item:
- Icon (24px) + Label (10px, font weight 500)
- Color (Default): #9CA3AF
- Color (Active): #5B7FFF
- Spacing: 8px between icon and label

State: Active Tab
Icon Color: #5B7FFF
Label Color: #5B7FFF
Icon Background: #E0E7FF (Light blue with 20% opacity)
Border Radius on Icon: 8px
Icon Padding: 8px

Transition: all 0.3s ease-in-out

Dark Mode:
Background: #1F2937
Border Top: 1px solid #4B5563
Icon (Default): #9CA3AF
Icon (Active): #5B7FFF
Icon Background: #2D3F5F (darker blue)
```

#### **Tab Switcher (Top)**
```
Background: Transparent
Height: 48px
Display: Flex
Border Bottom: 1px solid #E5E7EB

Tab Item:
Font Size: 14px
Font Weight: 500
Color: #6B7280
Padding: 12px 16px
Border Bottom: 2px solid transparent
Cursor: pointer

State: Active Tab
Color: #5B7FFF
Border Bottom: 2px solid #5B7FFF
Transition: all 0.2s ease-out

Dark Mode:
Border Bottom (inactive): #4B5563
Color (active): #5B7FFF
Border Bottom (active): #5B7FFF
```

---

### **5. MODALS & DIALOGS**

#### **Bottom Sheet Modal (for Quick Input)**
```
Background: #FFFFFF
Border Radius: 24px 24px 0px 0px (top corners only)
Width: 100% (full width on mobile)
Height: Auto (max 85vh)
Position: Fixed, bottom
Z-index: 1000
Padding: 20px 16px 32px

Backdrop:
Background: rgba(0, 0, 0, 0.5)
Transition: all 0.3s ease-out
Opacity on open: 1
Opacity on closed: 0

Handle Bar (Top):
Height: 4px
Width: 40px
Background: #D1D5DB
Border Radius: 2px
Margin Bottom: 16px
Center aligned

Animation on Open:
Transform: translateY(100%) → translateY(0)
Duration: 300ms
Easing: ease-out

Dark Mode:
Background: #1F2937
Handle: #4B5563
```

---

## **ANIMATION GUIDELINES**

### **Animation Principles**
- **Duration:** Subtle (200-300ms for micro-interactions, 300-500ms for major transitions)
- **Easing:** Smooth linear easing (cubic-bezier(0.25, 0.46, 0.45, 0.94))
- **Transform:** Use transform and opacity only (for performance)
- **Hardware Acceleration:** will-change: transform, opacity

### **Common Animations**

#### **Button Tap Animation**
```
Trigger: On mousedown/touchstart
Transform: scale(1) → scale(0.95)
Duration: 150ms
Easing: ease-out
Transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)

Reverse: On mouseup/touchend
Transform: scale(0.95) → scale(1)
Duration: 200ms
```

#### **Card Hover Animation**
```
Trigger: On hover (desktop only)
Transform: translateY(0px) → translateY(-4px)
Box Shadow: 0 2px 8px... → 0 8px 24px...
Duration: 300ms
Easing: ease-out
Transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

#### **Input Focus Animation**
```
Trigger: On focus
Border Color: #D1D5DB → #5B7FFF
Box Shadow: none → 0 0 0 3px rgba(91, 127, 255, 0.1)
Duration: 200ms
Easing: ease-out
Transition: all 0.2s ease-out
```

#### **Modal Open Animation**
```
Trigger: Open modal
Transform: translateY(100%) → translateY(0)
Opacity: 0 → 1
Duration: 300ms
Easing: ease-out
Transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

#### **Fade In Animation (Page Transition)**
```
Trigger: Page enter
Opacity: 0 → 1
Duration: 300ms
Easing: ease-in-out
Transition: opacity 0.3s ease-in-out
```

#### **Slide In Animation (Sidebar/Drawer)**
```
Trigger: Drawer open
Transform: translateX(-100%) → translateX(0)
Duration: 350ms
Easing: ease-out
Transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

#### **Pulse Animation (Loading/Skeleton)**
```
Animation: pulse
From: opacity 1
To: opacity 0.5
Duration: 2s
Iteration: infinite
Easing: ease-in-out
```

---

## **ICON SYSTEM**

### **Icon Style Guidelines**

#### **Line Icons (Feather-style)**
- **Stroke Width:** 2px (for 20-24px icons), 1.5px (for 16px icons)
- **Corner Radius:** 2px (for modern look)
- **Color:** Inherit from text color or explicitly set
- **Size Options:** 16px, 20px, 24px, 28px, 32px
- **Consistency:** All icons follow same visual weight

#### **Filled Icons (Solid)**
- **Style:** Solid fill, no strokes
- **Color:** Category colors or status colors
- **Size Options:** Same as line icons
- **Use Cases:** Category indicators, status badges, emphasis

#### **Icon Library**
Use combination of:
- **Heroicons** (line style, open-source) - https://heroicons.com
- **Feather Icons** (line style, minimal) - https://feathericons.com
- **Custom SVG Icons** (for unique category icons)

### **Category Icons (Custom)**
```
Food/Makanan: Fork and spoon
Transport: Car or Bus silhouette
Shopping: Shopping bag
Entertainment: Star or Music note
Health: Heart
Utilities: Zap/Lightning bolt
Income: Plus/Up arrow
Other: Ellipsis/More
```

### **Common Icons (Feather)**
```
Close: X
Menu: Menu (3 horizontal lines)
Settings: Settings/Gear
Profile: User circle
Home: Home
Search: Search/Magnifying glass
Add: Plus
Delete: Trash
Edit: Pencil
Back: Chevron left
Forward: Chevron right
Calendar: Calendar
Clock: Clock
Filter: Filter
Export: Download/Share
Eye: Eye (for password visibility)
Bell: Bell (for notifications)
```

---

## **SCREEN DESIGNS**

### **Screen 1: Authentication - Sign Up**

#### **Visual Description:**
Light gradient background (soft blue-purple), centered card with sign-up form.

#### **Layout Structure:**
```
├─ Top: App logo (40x40px) centered, margin-top: 48px
├─ Heading: "Create Account" (H1, centered)
├─ Subheading: "Start tracking your money today" (Body Small, gray)
├─ Spacing: 40px
├─ Form Section:
│  ├─ Input: Email (placeholder: "your@email.com")
│  ├─ Spacing: 16px
│  ├─ Input: Password (placeholder: "••••••••", type: password)
│  ├─ Spacing: 24px
│  └─ Button: "Create Account" (Primary, full width, 48px height)
├─ Spacing: 24px
├─ Divider: "Or continue with" (centered text with lines on both sides)
├─ Spacing: 24px
├─ Button Group:
│  ├─ Button: "Continue with Google" (Secondary, full width, 48px)
│  ├─ Spacing: 12px
│  └─ Button: "Continue with Apple" (Secondary, full width, 48px)
├─ Spacing: 32px
├─ Link: "Already have account? Login" (Text link, centered)
└─ Bottom padding: 32px
```

#### **AI Prompt for Stitch/Visual Generation:**
```
"Sign up screen for a financial tracking app called TIPES.
Light mode with soft gradient background (light purple to light blue).
Centered white card (border-radius 16px) containing:
- Small app logo at top
- Large heading 'Create Account' in dark gray (32px bold)
- Subheading 'Start tracking your money today' in lighter gray (14px)
- Email input field (placeholder text, light gray background, 12px border-radius)
- Password input field below
- Large gradient button 'Create Account' (blue gradient, white text, 48px height)
- Light divider with 'Or continue with' text in center
- Two secondary buttons: 'Continue with Google' and 'Continue with Apple'
- Small text link 'Already have account? Login' at bottom
Clean, minimal design, soft pastel colors, modern aesthetic."
```

---

### **Screen 2: Home Dashboard**

#### **Visual Description:**
Clean light background with spacious card-based layout. Summary card at top, transaction list below, FAB button in bottom-right.

#### **Layout Structure:**
```
├─ Header (Fixed, 56px):
│  ├─ Left: Greeting "Hello, Rani" (Body Large)
│  ├─ Right: Bell icon (notification) + Profile icon (circular avatar)
│  └─ Background: #FFFFFF with shadow
├─ Content (with safe area for header):
│  ├─ Date Display: "Sabtu, 15 Juni" (Body Small, gray, padding: 16px)
│  ├─ Summary Card:
│  │  ├─ Title: "Today's Spending" (H3, dark gray)
│  │  ├─ Amount: "Rp 245.000" (32px, bold, primary blue)
│  │  ├─ Subtitle: "2 transactions today" (Body Small, gray)
│  │  └─ Gradient background with 20% opacity
│  ├─ Spacing: 24px
│  ├─ Section Title: "By Category" (H3)
│  ├─ Category Breakdown:
│  │  ├─ Card 1: "🍽️ Makanan" "Rp 100.000" (transaction card format)
│  │  ├─ Card 2: "🚗 Transport" "Rp 80.000"
│  │  └─ Card 3: "🎮 Hiburan" "Rp 65.000"
│  ├─ Spacing: 32px
│  ├─ Streak Display:
│  │  ├─ Icon: 🔥 (or flame SVG)
│  │  ├─ Text: "15 day streak" (H3)
│  │  └─ Card with semi-transparent background
│  ├─ Spacing: 32px
│  ├─ Section Title: "Recent Transactions" (H3)
│  ├─ Transaction List:
│  │  ├─ Transaction 1: [Icon] "Starbucks Coffee" | "Rp 65.000" | "Jan 26"
│  │  ├─ Transaction 2: [Icon] "BRT Payment" | "Rp 80.000" | "Jan 26"
│  │  └─ Transaction 3: [Icon] "Cinema Ticket" | "Rp 100.000" | "Jan 25"
│  └─ Bottom padding: 80px (for FAB + nav bar)
├─ FAB Button:
│  ├─ Position: Fixed, bottom-right
│  ├─ Size: 56x56px
│  ├─ Icon: Plus (+)
│  ├─ Gradient blue background
│  └─ Margin: 16px from edges
└─ Bottom Navigation: (see Tab bar component)
```

#### **Dark Mode Adjustments:**
- Background: #0F1419
- Cards: #1F2937
- Text: #FFFFFF and #D1D5DB
- Gradient overlay: 30% opacity on dark surface

#### **AI Prompt for Stitch/Visual Generation:**
```
"Home dashboard screen for TIPES financial tracking app.
Light mode with clean white background.
Top header with greeting 'Hello, Rani' and icons (bell, profile).
Below header:
- Date display 'Sabtu, 15 Juni'
- Large summary card with soft gradient background (blue-purple), 
  showing 'Today's Spending' title and 'Rp 245.000' amount in large bold text
- 'By Category' section with three transaction cards:
  * Food category: Rp 100.000
  * Transport category: Rp 80.000  
  * Entertainment category: Rp 65.000
- Flame emoji with '15 day streak' indicator
- 'Recent Transactions' section listing 3 recent transactions with:
  * Category icons on left
  * Transaction name and amount
  * Date on right
- Bottom: Fixed FAB button (floating action button) with blue gradient, plus icon in bottom-right
- Bottom navigation bar with 4 icons (home, trends, analytics, settings)
Soft pastel colors, 12px border radius on cards, spacious padding, 
modern minimal aesthetic, smooth shadows."
```

---

### **Screen 3: Quick Input Modal**

#### **Visual Description:**
Bottom sheet modal with numeric input, category selector, and save button.

#### **Layout Structure:**
```
├─ Handle Bar: (4px height, light gray, centered at top)
├─ Header:
│  ├─ Title: "Tambah Pengeluaran" or "Add Expense" (H2, left-aligned)
│  └─ Close Button: X icon (top-right)
├─ Spacing: 24px
├─ Amount Input Section:
│  ├─ Display: Large number field showing entered amount
│  │  ├─ Placeholder: "0"
│  │  ├─ Text align: Right
│  │  ├─ Font size: 36px, bold
│  │  ├─ Color: Primary blue
│  │  └─ Currency: "Rp" text on left (Body Large, gray)
│  ├─ Spacing: 24px
├─ Numeric Keypad:
│  ├─ Layout: 3x4 grid (rows 1-3 with 1-9, row 4 with 0, delete, clear)
│  ├─ Button size: Equal width/height
│  ├─ Border radius: 12px
│  ├─ Background: Light gray (#F3F4F6)
│  ├─ Spacing between buttons: 8px
│  └─ Font: 18px, bold
├─ Spacing: 24px
├─ Category Selector:
│  ├─ Title: "Kategori" (H4, label)
│  ├─ Layout: Horizontal scroll (chips)
│  ├─ Chips:
│  │  ├─ Food: with fork icon
│  │  ├─ Transport: with car icon
│  │  ├─ Shopping: with bag icon
│  │  ├─ Entertainment: with star icon
│  │  └─ Others
│  ├─ Selected chip: Darker background, 2px border
│  └─ Spacing: 8px between chips
├─ Spacing: 24px
├─ Description Input (Optional):
│  ├─ Placeholder: "Add note (optional)"
│  ├─ Height: 40px
│  └─ Single line text field
├─ Spacing: 32px
├─ Button: "Save Transaction" (Primary, full width, 48px)
└─ Bottom padding: 24px
```

#### **Interactions:**
- Tapping numbers updates amount field
- Backspace/delete removes last digit
- Category selection highlights chip
- Save button disabled if amount = 0
- On save: Modal closes, transaction added to list, brief toast confirmation

#### **AI Prompt for Stitch/Visual Generation:**
```
"Quick input modal (bottom sheet) for adding a transaction in TIPES app.
Bottom sheet with rounded top corners (24px radius).
Header with 'Tambah Pengeluaran' title and close X button.
Main content:
- Large amount input field showing 'Rp ________' with placeholder
  Text size 36px bold, right-aligned, color blue
- Numeric keypad below (grid layout with 0-9, delete button)
  Light gray backgrounds on buttons, 12px border radius,
  button spacing 8px
- Category selector section with horizontal scrollable chips
  (Food, Transport, Shopping, Entertainment, Other)
  Chips have category icon, 12px radius, light colored backgrounds
  Selected chip has darker background and border
- Optional description input field
- Large 'Save Transaction' button (gradient blue, white text, 48px height)
Light background, soft shadows, minimal design, 
spacious padding, modern aesthetic, smooth interactions."
```

---

### **Screen 4: Presets Management**

#### **Visual Description:**
Settings-like screen with list of saved presets, ability to add/edit/delete.

#### **Layout Structure:**
```
├─ Header:
│  ├─ Back button: Chevron left (left)
│  ├─ Title: "Presets" (H2, center)
│  └─ Add button: Plus icon (right)
├─ Content:
│  ├─ Spacing: 24px
│  ├─ Section Title: "Your Quick Shortcuts" (H4, gray)
│  ├─ Spacing: 16px
│  ├─ Preset List:
│  │  ├─ Preset Card 1:
│  │  │  ├─ Icon: Category icon (filled, 32px)
│  │  │  ├─ Label: "Kopi" (H4)
│  │  │  ├─ Amount: "Rp 25.000" (Body Regular, blue)
│  │  │  ├─ Category: "Makanan" (Body Small, gray)
│  │  │  ├─ Right: Edit icon + Delete icon (on swipe or hover)
│  │  │  └─ Background: Light colored card
│  │  │
│  │  ├─ Spacing: 12px
│  │  │
│  │  ├─ Preset Card 2:
│  │  │  ├─ Icon: "☕"
│  │  │  ├─ Label: "Lunch"
│  │  │  ├─ Amount: "Rp 45.000"
│  │  │  └─ Category: "Makanan"
│  │  │
│  │  ├─ Spacing: 12px
│  │  │
│  │  └─ Preset Card 3:
│  │     ├─ Icon: "⛽"
│  │     ├─ Label: "Bensin"
│  │     ├─ Amount: "Rp 50.000"
│  │     └─ Category: "Transport"
│  │
│  ├─ Spacing: 32px
│  ├─ Button: "+ Add New Preset" (Secondary, full width, 48px)
│  └─ Bottom padding: 24px
└─ Navigation: Bottom bar
```

#### **Interactions:**
- Tap on preset card to edit
- Swipe left on card reveals delete button
- Tap + button to add new preset
- Double-tap preset to use it quickly

#### **AI Prompt for Stitch/Visual Generation:**
```
"Presets management screen for TIPES app.
Top header with back button, 'Presets' title, and plus icon.
Content shows 'Your Quick Shortcuts' section header.
Below: List of preset cards, each containing:
- Category icon on left (32px, filled style)
- Preset label (e.g., 'Kopi', 'Lunch', 'Bensin')
- Amount in blue text (e.g., 'Rp 25.000')
- Category name in smaller gray text below
- Subtle background color matching category (light opacity)
- Cards have 12px border radius, spacious padding
Cards are stacked vertically with 12px spacing.
Bottom: '+ Add New Preset' secondary button (full width, 48px height).
Light background, clean minimal design, soft shadows,
spacious padding, modern aesthetic, smooth interactions."
```

---

### **Screen 5: Analytics/Summary**

#### **Visual Description:**
Monthly overview with pie chart, top spending categories, trend indicators.

#### **Layout Structure:**
```
├─ Header:
│  ├─ Back button
│  ├─ Title: "Monthly Summary" (H2)
│  └─ Month selector (June 2024) with left/right arrows
├─ Content:
│  ├─ Spacing: 24px
│  ├─ Summary Cards (3 columns on mobile, horizontal scroll):
│  │  ├─ Card 1:
│  │  │  ├─ Label: "Total Spend" (Body Small, gray)
│  │  │  ├─ Amount: "Rp 2.538.790" (H2, pink/red)
│  │  │  ├─ Indicator: "↑ 12% vs last month" (Body Small, red)
│  │  │  └─ Background: Light pink (#FFE6E6)
│  │  │
│  │  ├─ Card 2:
│  │  │  ├─ Label: "Total Income" (Body Small)
│  │  │  ├─ Amount: "Rp 1.500.000" (H2, green)
│  │  │  ├─ Indicator: "↑ 5% vs last month" (Body Small, green)
│  │  │  └─ Background: Light green (#E6F9F0)
│  │  │
│  │  └─ Card 3:
│  │     ├─ Label: "Net Balance" (Body Small)
│  │     ├─ Amount: "-Rp 1.038.790" (H2, red)
│  │     ├─ Indicator: "↓ More spending" (Body Small)
│  │     └─ Background: Light red
│  │
│  ├─ Spacing: 32px
│  ├─ Pie Chart Section:
│  │  ├─ Title: "Spending by Category" (H3)
│  │  ├─ Pie Chart (centered, 280px diameter):
│  │  │  ├─ Colors: Category colors (food orange, transport blue, etc)
│  │  │  ├─ Center text: "Rp 2.538.790" (amount)
│  │  │  └─ Animated on page load
│  │  │
│  │  └─ Legend below chart:
│  │     ├─ Food: 35% (Rp 888K) - with colored square
│  │     ├─ Transport: 25% (Rp 635K)
│  │     ├─ Shopping: 20% (Rp 508K)
│  │     ├─ Entertainment: 15% (Rp 381K)
│  │     └─ Other: 5% (Rp 127K)
│  │
│  ├─ Spacing: 32px
│  ├─ Top Movers Section:
│  │  ├─ Title: "Top Spending Categories" (H3)
│  │  ├─ Spacing: 16px
│  │  ├─ Category 1:
│  │  │  ├─ Icon + Name: "🍽️ Makanan"
│  │  │  ├─ Amount: "Rp 888.000" (H4, orange)
│  │  │  ├─ Percentage: "35% of total"
│  │  │  └─ Progress bar below (35% filled with orange)
│  │  │
│  │  ├─ Category 2:
│  │  │  ├─ Icon + Name: "🚗 Transport"
│  │  │  ├─ Amount: "Rp 635.000"
│  │  │  ├─ Percentage: "25% of total"
│  │  │  └─ Progress bar (25% filled)
│  │  │
│  │  └─ Category 3:
│  │     ├─ Icon + Name: "🛍️ Belanja"
│  │     ├─ Amount: "Rp 508.000"
│  │     ├─ Percentage: "20% of total"
│  │     └─ Progress bar (20% filled)
│  │
│  └─ Bottom padding: 32px
└─ Navigation: Bottom bar
```

#### **Dark Mode Adjustments:**
- Card backgrounds adjusted to dark shades
- Chart colors remain similar but with better contrast
- Text colors inverted

#### **AI Prompt for Stitch/Visual Generation:**
```
"Analytics/summary screen for TIPES financial tracking app.
Top header with back button, 'Monthly Summary' title, 
and month selector (June 2024 with navigation arrows).

Content shows:
- Three summary stat cards displayed horizontally:
  * 'Total Spend: Rp 2.538.790' with red/pink indicator '↑ 12% vs last month'
  * 'Total Income: Rp 1.500.000' with green indicator '↑ 5% vs last month'  
  * 'Net Balance: -Rp 1.038.790' with red trend indicator
  Cards have light background colors (light pink, light green, light red)

- 'Spending by Category' section with donut/pie chart:
  Chart shows segments in category colors (orange for food, blue for transport, etc)
  Center displays total amount 'Rp 2.538.790'
  Below chart: Legend with percentages for each category

- 'Top Spending Categories' section showing top 3:
  Each category listed with icon, name, amount, percentage,
  and horizontal progress bar

Light mode, soft pastel colors, 12px border radius on cards,
spacious padding, clean minimal design, soft shadows,
smooth chart animations, modern aesthetic."
```

---

### **Screen 6: Settings/Profile**

#### **Visual Description:**
Vertical list of settings options, user profile info at top, logout at bottom.

#### **Layout Structure:**
```
├─ Header:
│  ├─ Back button
│  ├─ Title: "Settings" (H2)
│  └─ Empty right space
├─ Content:
│  ├─ Profile Section:
│  │  ├─ Avatar: Circular (64px, initials or image)
│  │  ├─ Name: "Rani Wijaya" (H3)
│  │  ├─ Email: "rani@email.com" (Body Small, gray)
│  │  ├─ Background: Light gradient
│  │  └─ Padding: 24px all around
│  │
│  ├─ Spacing: 32px
│  ├─ Settings Section Title: "Preferences" (H4, gray)
│  ├─ Spacing: 16px
│  ├─ Settings Items (each clickable):
│  │  ├─ Item 1:
│  │  │  ├─ Label: "Monthly Budget" (H4)
│  │  │  ├─ Value: "Rp 5.000.000" (Body Regular, gray, right-aligned)
│  │  │  ├─ Icon: Chevron right (right)
│  │  │  ├─ Background: #F9FAFB
│  │  │  ├─ Padding: 16px
│  │  │  ├─ Border radius: 12px
│  │  │  └─ Margin bottom: 12px
│  │  │
│  │  ├─ Item 2:
│  │  │  ├─ Label: "Theme"
│  │  │  ├─ Value: "Light" (or toggle switch on right)
│  │  │  └─ Similar styling
│  │  │
│  │  ├─ Item 3:
│  │  │  ├─ Label: "Notifications"
│  │  │  ├─ Value: "On" (or toggle switch)
│  │  │  └─ Similar styling
│  │  │
│  │  ├─ Item 4:
│  │  │  ├─ Label: "Currency"
│  │  │  ├─ Value: "IDR (Rp)"
│  │  │  └─ Similar styling
│  │  │
│  │  └─ Item 5:
│  │     ├─ Label: "Categories"
│  │     ├─ Icon: Chevron right
│  │     └─ Similar styling
│  │
│  ├─ Spacing: 32px
│  ├─ Settings Section Title: "App" (H4, gray)
│  ├─ Spacing: 16px
│  ├─ App Items:
│  │  ├─ Item 1:
│  │  │  ├─ Label: "About TIPES"
│  │  │  ├─ Value: "Version 1.0.0" (Body Small, gray, right)
│  │  │  └─ Similar styling
│  │  │
│  │  ├─ Item 2:
│  │  │  ├─ Label: "Privacy Policy"
│  │  │  ├─ Icon: Chevron right
│  │  │  └─ Similar styling
│  │  │
│  │  └─ Item 3:
│  │     ├─ Label: "Terms of Service"
│  │     ├─ Icon: Chevron right
│  │     └─ Similar styling
│  │
│  ├─ Spacing: 40px
│  ├─ Logout Section:
│  │  ├─ Button: "Logout" (Secondary/Danger style, full width, 48px)
│  │  ├─ Text Color: Pink/Red (#F5A5BE)
│  │  ├─ Background: Light pink (#FFE6E6)
│  │  ├─ Border: 1px solid pink
│  │  └─ Icon: Sign out icon (left of text)
│  │
│  └─ Bottom padding: 32px
└─ Navigation: Bottom bar
```

#### **AI Prompt for Stitch/Visual Generation:**
```
"Settings screen for TIPES app.
Top header with back button and 'Settings' title.

Content includes:
- Profile section at top with:
  * Circular avatar (64px, light blue background with initials)
  * User name 'Rani Wijaya' in large text
  * Email 'rani@email.com' in smaller gray text
  * Light gradient background on entire section

- 'Preferences' section header followed by settings items:
  * Monthly Budget: Rp 5.000.000 (right-aligned)
  * Theme: Light (or toggle switch)
  * Notifications: On
  * Currency: IDR (Rp)
  * Categories (with chevron indicating it's clickable)
  Each item in light gray background box with 12px radius,
  clickable chevron icon on right

- 'App' section with items:
  * About TIPES (Version 1.0.0)
  * Privacy Policy
  * Terms of Service
  Same styling as preferences

- At bottom: Red/pink 'Logout' button with sign-out icon

Light background, soft gray accents, 12px border radius,
spacious padding, minimal design, soft shadows, modern aesthetic."
```

---

## **DARK MODE GUIDELINES**

### **Color Scheme Conversion**

**Light Mode to Dark Mode Mapping:**

| Light Mode | Dark Mode | Use Case |
|-----------|-----------|----------|
| #FFFFFF (White) | #0F1419 (Dark) | Page backgrounds |
| #F9FAFB (Gray 50) | #1F2937 (Dark Surface) | Card backgrounds |
| #F3F4F6 (Gray 100) | #2D3748 (Dark 2) | Secondary backgrounds |
| #1F2937 (Gray 900) | #FFFFFF (White) | Primary text |
| #6B7280 (Gray 600) | #D1D5DB (Gray 300) | Secondary text |
| #E5E7EB (Gray 200) | #4B5563 (Gray 700) | Borders/dividers |

**Accent Colors:** Remain the same in both modes (#5B7FFF, #7FD5B1, #F5A5BE, #FFD77B)

### **Shadow Adjustments**

**Light Mode Shadows:**
```css
shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.16);
```

**Dark Mode Shadows:**
```css
shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.6);
```

### **Text Contrast in Dark Mode**
- Primary text: #FFFFFF (for headings)
- Secondary text: #D1D5DB (for body text)
- Tertiary text: #9CA3AF (for labels/captions)
- All text must meet WCAG AA contrast ratio (4.5:1 for body, 3:1 for large text)

### **Transition Between Modes**
```css
transition: background-color 0.3s ease-in-out,
            color 0.3s ease-in-out,
            border-color 0.3s ease-in-out,
            box-shadow 0.3s ease-in-out;
```

---

## **RESPONSIVE DESIGN BREAKPOINTS**

```
Mobile: 375px - 599px (Primary)
Tablet: 600px - 1024px
Desktop: 1025px+

Mobile-first approach:
- Design for mobile first
- Enhance for tablet/desktop
- Bottom navigation on mobile
- Side navigation on tablet/desktop
```

---

## **ACCESSIBILITY GUIDELINES**

### **Color Contrast**
- Text on background: Minimum 4.5:1 ratio (WCAG AA)
- Large text (18px+): Minimum 3:1 ratio
- UI components: Minimum 3:1 ratio

### **Touch Targets**
- Minimum size: 44px x 44px
- Spacing between targets: 8px minimum

### **Focus States**
- All interactive elements need visible focus indicator
- Focus ring: 3px border with primary color or high-contrast color
- Focus-visible: Only show on keyboard navigation

### **Text Sizing**
- Minimum font size: 12px (for captions only)
- Body text: 14px minimum
- Headings: 18px minimum

### **Motion**
- Respect prefers-reduced-motion media query
- Remove animations for users with motion sensitivity
- Default: Animations enabled, but provide option to disable

---

## **IMPLEMENTATION CHECKLIST**

### **Before Development:**
- [ ] Review all color codes with accessibility tool
- [ ] Test Dark Mode contrast ratios
- [ ] Verify font weights and sizes
- [ ] Create design tokens in code (CSS variables)
- [ ] Build component library in code
- [ ] Test animations on target devices

### **During Development:**
- [ ] Use CSS variables for all colors
- [ ] Implement smooth transitions for theme switching
- [ ] Test responsive layouts at all breakpoints
- [ ] Verify animations use GPU acceleration
- [ ] Test accessibility with screen readers

### **After Development:**
- [ ] Perform visual QA across devices
- [ ] Test Dark Mode functionality
- [ ] Verify animations are smooth (60fps)
- [ ] Accessibility audit with automated tools
- [ ] User testing with real devices

---

## **DESIGN TOKENS (For Code)**

### **CSS Variables Template**

```css
/* Light Mode */
:root {
  /* Colors */
  --color-primary: #5B7FFF;
  --color-accent-green: #7FD5B1;
  --color-accent-pink: #F5A5BE;
  --color-accent-yellow: #FFD77B;
  
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  --color-bg-tertiary: #F3F4F6;
  
  --color-text-primary: #1F2937;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  
  --color-border: #D1D5DB;
  --color-border-light: #E5E7EB;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.16);
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 40px;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  /* Typography */
  --font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #0F1419;
    --color-bg-secondary: #1F2937;
    --color-bg-tertiary: #2D3748;
    
    --color-text-primary: #FFFFFF;
    --color-text-secondary: #D1D5DB;
    --color-text-tertiary: #9CA3AF;
    
    --color-border: #4B5563;
    --color-border-light: #374151;
    
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.6);
  }
}
```

---

## **STITCH.AI PROMPT TEMPLATES**

### **General Template for Any Screen:**

```
"[Screen Name] for TIPES financial tracking app.
[Main visual description: colors, layout, key elements]
[Component details: buttons, cards, inputs, spacing]
[Additional details: shadows, corners, spacing, alignment]
Light mode color scheme with soft pastel colors 
(primary blue #5B7FFF, soft green, soft pink, soft yellow).
Clean, minimal design with 12px border radius on cards.
Spacious padding and smooth shadows.
Modern, playful, minimalist aesthetic.
Smooth animations and subtle transitions.
Professional and approachable design, suitable for Gen Z users."
```

### **For Dark Mode Variants:**

```
[Same as above, but add:]
"Dark mode version with #0F1419 dark background,
#1F2937 dark surfaces for cards.
White text for headings, light gray for body.
Same accent colors (blue, green, pink, yellow) maintained.
High contrast text for readability.
Adjusted shadows for depth in dark mode.
Dark mode alternative of [Light mode description]."
```

---

## **NOTES FOR DEVELOPERS**

1. **CSS Variables:** Use CSS custom properties for all colors, spacing, and shadows
2. **Animation Performance:** Use transform and opacity only (no layout-triggering properties)
3. **Responsive:** Mobile-first approach, test at 375px, 768px, 1440px
4. **Dark Mode:** Implement with prefers-color-scheme media query
5. **Accessibility:** Test with axe DevTools and WAVE browser extensions
6. **Icons:** Use SVG format for all icons (scalable, lightweight)
7. **Fonts:** Load DM Sans from Google Fonts (only 400, 500, 600, 700 weights needed)
8. **Gradients:** Use CSS gradients (not image gradients) for performance
9. **Testing:** Test on real devices (iOS Safari, Chrome, Firefox)
10. **Performance:** Optimize images, minimize CSS, lazy-load components

---

**Design Document Complete ✓**

*Ready for handoff to development team. All screens include AI prompts for Stitch.ai or general AI image generation tools.*

*For questions or clarifications, refer to this document before starting development.*

---

**Last Updated:** June 2024  
**Version:** 1.0  
**Status:** Ready for Implementation
