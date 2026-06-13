# 📱 TIPES - Product Requirements Document (PRD)

**Version:** 1.0  
**Created:** June 2024  
**Last Updated:** June 2024  
**Status:** Ready for Development

---

## **1. EXECUTIVE SUMMARY**

**TIPES** adalah sebuah Web App (PWA) yang dirancang untuk memudahkan Gen Z dalam mencatat pengeluaran dan pemasukan dengan **minimal friction**. 

**Core Value Proposition:**
- ⚡ **Super cepat** - Input dalam 5 detik atau kurang
- 🎯 **Low friction** - Gak perlu buka app, buka langsung dari home screen
- 🎨 **Aesthetic** - Design yang clean dan minimal
- 📊 **Smart insights** - Lihat pengeluaran dengan cara yang simple
- 📱 **PWA technology** - Installable seperti native app, tanpa perlu download dari store

---

## **2. PRODUCT OVERVIEW**

### **2.1 What is TIPES?**

TIPES adalah aplikasi financial tracking yang membantu user mencatat setiap transaksi (pengeluaran & pemasukan) dengan cara yang **paling sederhana dan tidak bikin malas**.

**Target Problem:**
- User sering malas/forget mencatat pengeluaran
- Aplikasi finance lain terlalu complicated
- Perlu tracking manual yang simple tapi effective

**Solution:**
- Quick input system (1-5 detik per transaksi)
- Smart presets untuk transaksi berulang
- Habit formation gamification
- Minimal dashboard (just the essentials)

### **2.2 Platform**
- **Type:** Progressive Web App (PWA)
- **Accessible via:** Browser + Installable to home screen
- **Works on:** Mobile, Tablet, Desktop
- **Offline Support:** Yes (with Service Worker)
- **Tech Stack:** React + Supabase + Tailwind CSS

---

## **3. TARGET USER**

### **3.1 Primary User Persona**

**Name:** Rani (Gen Z, 18-25 years old)

**Demographics:**
- Age: 18-25 years old
- Occupation: College student / Entry-level professional
- Location: Urban areas (Jakarta, Surabaya, Bandung, etc.)
- Tech Savvy: Yes
- Income: Rp 500K - Rp 5M/month (varies)

**Pain Points:**
- "I forget to track my spending"
- "Financial apps are too complicated"
- "I don't want to open 5 different menus just to log Rp 20K"
- "I want to know where my money goes but tracking is a chore"

**Goals:**
- Understand spending patterns
- Save money effectively
- Keep track without too much effort
- Have a nice looking app

**Behaviors:**
- Uses phone 5-8 hours/day
- Prefers apps that are intuitive
- Doesn't like complicated menus
- Appreciates gamification & streaks
- Shares achievements on social media

### **3.2 Secondary User Persona**

**Name:** Adi (Working professional)

**Demographics:**
- Age: 25-35 years old
- Occupation: Office worker
- Income: Rp 3M - Rp 20M/month
- Budget-conscious

**Needs:**
- Monthly spending reports
- Category-wise breakdown
- Integration with bank notifications
- Export data for tax purposes

---

## **4. USER STORIES & FEATURES**

### **4.1 MVP Features (Phase 1 - Weeks 1-4)**

#### **Feature 1: Quick Input System**
**User Story:**
```
As a user, I want to quickly log a transaction 
So that I don't forget to track my spending
```

**Requirements:**
- User taps "+" button
- Input screen shows:
  - Numeric keypad (big numbers)
  - Amount field (auto-formatted: Rp XX,XXX)
  - Category selector (swipe left/right or buttons)
  - Optional description
- Max 3 taps to complete transaction
- Save button is large & prominent

**Acceptance Criteria:**
- Input takes max 5 seconds
- Amount auto-formats with comma separator
- Can swipe between categories
- Pressing Enter/OK saves immediately

---

#### **Feature 2: Category Management**
**User Story:**
```
As a user, I want predefined categories
So that I don't need to create categories manually
```

**Default Categories:**
- Makanan (Food)
- Transportasi (Transport)
- Belanja (Shopping)
- Hiburan (Entertainment)
- Kesehatan (Health)
- Utilitas (Bills/Utilities)
- Lainnya (Others)
- Pemasukan (Income)

**Requirements:**
- User can customize categories
- Can add/delete custom categories
- Categories have icons & colors
- Categories persist in local storage

---

#### **Feature 3: Quick Presets**
**User Story:**
```
As a user, I want to save frequently used transactions
So that I can log them with a single tap
```

**How it works:**
```
Preset example:
- Label: "Kopi"
- Amount: Rp 25,000
- Category: Makanan

User taps "Kopi" preset → Auto-fills Rp 25K + Makanan → 1 tap save
```

**Requirements:**
- Can bookmark up to 10 presets
- Each preset shows: label + amount + category icon
- 1 tap to use preset
- Easy to manage (add/edit/delete)
- Presets stored in database

---

#### **Feature 4: Daily Dashboard**
**User Story:**
```
As a user, I want to see my daily spending at a glance
So that I know how much I've spent today
```

**Dashboard shows:**
```
┌─────────────────────────┐
│ 📅 Sabtu, 15 Juni       │
├─────────────────────────┤
│                         │
│ Pengeluaran: Rp 245K    │
│ Pemasukan: Rp 0         │
│ Net: -Rp 245K          │
│                         │
├─ Breakdown ─────────────┤
│ 🍽️  Makanan: Rp 100K   │
│ 🚗 Transport: Rp 80K    │
│ 🎮 Hiburan: Rp 65K      │
│                         │
└─────────────────────────┘
```

**Requirements:**
- Shows total income/expense for today
- Shows breakdown by category
- Update in real-time when transaction added
- Display date at top
- Color code: red for expense, green for income
- Simple & uncluttered

---

#### **Feature 5: Transaction History**
**User Story:**
```
As a user, I want to see all my transactions
So that I can review past transactions and edit if needed
```

**Requirements:**
- List all transactions (newest first)
- Show: amount, category, description (if any), time
- Swipe to delete option
- Tap to edit/view details
- Group by date (Today, Yesterday, etc.)
- Scrollable list

---

#### **Feature 6: Weekly/Monthly Summary**
**User Story:**
```
As a user, I want to see weekly & monthly summaries
So that I can track trends
```

**Shows:**
- Total income vs expense
- Category breakdown (pie chart or simple list)
- Comparison with previous period (↑ or ↓)
- Days with highest spending

**Requirements:**
- Simple pie chart (not too complicated)
- Can switch between Week/Month view
- Shows top 5 categories
- Indicates trend (up/down vs last period)

---

#### **Feature 7: Habit Streak**
**User Story:**
```
As a user, I want to see my streak of daily tracking
So that I'm motivated to track consistently
```

**How it works:**
```
✅ Day 1: Log at least 1 transaction → +1 to streak
✅ Day 2: Continue → +1 to streak
❌ Day 3: Skip → Streak breaks

Display: "🔥 15 day streak"
```

**Requirements:**
- Show current streak prominently
- Badge for milestones (7 days, 30 days, etc.)
- Notification reminder at 9 PM (if opted in)
- Show best streak ever
- Reset at midnight

---

### **4.2 Authentication & Onboarding**

**Sign up methods:**
- Email + password
- Google login

**Onboarding flow:**
1. Sign up page
2. Set monthly budget (optional, can skip)
3. Choose preferred categories
4. Tutorial: "How to log transaction quickly"
5. Invite to set 3 presets

**Requirements:**
- Simple & quick (max 2 minutes)
- Can skip steps
- Dark/light mode preference
- No forced personal info

---

### **4.3 Data Persistence**

**Requirements:**
- All data synced to Supabase
- Offline support: Transactions cached locally
- When online: Auto-sync
- No data loss
- User can export data as CSV

---

## **5. FUTURE FEATURES (Phase 2 & 3)**

### **Phase 2 (Month 2-3):**
- [ ] Receipt camera scanning (OCR)
- [ ] Bank notification auto-import
- [ ] Budget alerts ("You've hit 80% of budget")
- [ ] Search transactions
- [ ] Monthly reports (PDF export)
- [ ] Dark mode

### **Phase 3 (Month 3+):**
- [ ] AI spending insights
- [ ] Shared tracking with partner/roommate
- [ ] Investment/saving goals tracker
- [ ] Bill reminders
- [ ] Social comparison (anonymous)
- [ ] API for bank integration (GCash, OVO, etc.)

---

## **6. USER FLOW DIAGRAMS**

### **6.1 Main Flow: Adding Transaction**

```
User opens app
        ↓
[Home Screen - Daily Dashboard]
        ↓
Tap "+" button OR
Tap preset (e.g., "Kopi")
        ↓
[Quick Input Screen]
        ↓
Enter amount (or auto-filled if preset)
        ↓
Confirm/change category
        ↓
(Optional) Add description
        ↓
Tap "Save" button
        ↓
✅ Transaction saved + Real-time update
        ↓
[Back to Dashboard]
```

### **6.2 Onboarding Flow**

```
New user lands on app
        ↓
[Login/Sign-up]
        ↓
[Set Budget (Optional)]
        ↓
[Choose Categories]
        ↓
[Create Presets - "Let's add 3 quick shortcuts"]
        ↓
[Tutorial: "Quick logging demo"]
        ↓
[Welcome! Start tracking]
```

### **6.3 Settings Flow**

```
Tap "Profile" icon
        ↓
[Settings Menu]
        ├─ Budget management
        ├─ Category management
        ├─ Preset management
        ├─ Notifications
        ├─ Theme (Dark/Light)
        ├─ Export data
        └─ Logout
```

---

## **7. TECHNICAL REQUIREMENTS**

### **7.1 Tech Stack**

**Frontend:**
- Framework: React 18+
- UI Library: Tailwind CSS
- State Management: React Context API or Zustand
- HTTP Client: Axios or Fetch API
- PWA: Workbox (Service Worker)
- Forms: React Hook Form

**Backend:**
- Platform: Supabase (Firebase alternative)
- Database: PostgreSQL (via Supabase)
- Authentication: Supabase Auth
- Real-time: Supabase Realtime subscriptions
- File storage: Supabase Storage

**Hosting:**
- Frontend: Vercel (free tier)
- Backend: Supabase (free tier + paid as needed)

**Additional Tools:**
- Version Control: GitHub
- Code Quality: ESLint + Prettier
- API Testing: Postman
- Design: Figma

### **7.2 Database Schema (Simplified)**

```sql
-- Users table (handled by Supabase Auth)

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  amount DECIMAL(15, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  type ENUM('expense', 'income'),
  date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(7), -- hex color
  created_at TIMESTAMP DEFAULT NOW()
);

-- Presets table
CREATE TABLE presets (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  label VARCHAR(100) NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  category_id UUID REFERENCES categories,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User preferences table
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users UNIQUE,
  monthly_budget DECIMAL(15, 2),
  theme ENUM('light', 'dark'),
  notifications_enabled BOOLEAN DEFAULT TRUE,
  currency VARCHAR(3) DEFAULT 'IDR',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **7.3 API Endpoints (Supabase)**

**Supabase handles everything via client libraries, but key operations:**

```
POST   /auth/signup        - Register user
POST   /auth/login         - Login user
GET    /transactions       - Get all transactions
POST   /transactions       - Create transaction
PUT    /transactions/:id   - Update transaction
DELETE /transactions/:id   - Delete transaction
GET    /categories         - Get user categories
POST   /categories         - Create category
GET    /presets            - Get user presets
POST   /presets            - Create preset
PUT    /user/preferences   - Update preferences
```

### **7.4 Device Support**

**Responsive Design:**
- Mobile: 375px - 600px (primary)
- Tablet: 600px - 1024px
- Desktop: 1024px+ (secondary)

**Browsers:**
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

**PWA Requirements:**
- Service Worker support
- Web App Manifest
- HTTPS only
- Installable on home screen

---

## **8. UI/UX SPECIFICATIONS**

### **8.1 Design Language**

**Color Palette:**
```
Primary: #3B82F6 (Blue) - CTA buttons, highlights
Secondary: #10B981 (Green) - Income, positive
Danger: #EF4444 (Red) - Expense
Neutral: #6B7280 (Gray) - Text, secondary
Background: #FFFFFF (Light) / #1F2937 (Dark)
```

**Typography:**
- Headings: Inter Bold 24px-32px
- Body: Inter Regular 14px-16px
- Labels: Inter Medium 12px-14px
- Font family: Inter (Google Fonts)

**Spacing:**
- Base unit: 8px (8, 16, 24, 32, 40, 48, etc.)
- Use multiples of 8px for consistency

**Buttons:**
- Primary button: 48px height, full width on mobile
- Icon buttons: 44px x 44px minimum (accessibility)
- Ripple effect on tap

### **8.2 Key Screens Wireframe**

**Screen 1: Home Dashboard**
```
┌─────────────────────────┐
│ 🔔                  👤  │  Header
├─────────────────────────┤
│                         │
│ 📅 Sabtu, 15 Juni      │
│                         │
│ 💸 Rp 245K (Expense)    │
│ 💵 Rp 0 (Income)        │
│ Net: -Rp 245K          │  Summary section
│                         │
├─────────────────────────┤
│ Kategori               │
│ 🍽️  Makanan: Rp 100K   │
│ 🚗 Transport: Rp 80K    │
│ 🎮 Hiburan: Rp 65K      │  Breakdown
│                         │
├─────────────────────────┤
│ 🔥 15 day streak       │  Motivation
├─────────────────────────┤
│ Transaksi terbaru:      │
│ • 🎮 Hiburan: -Rp 65K   │
│ • 🍽️  Makanan: -Rp 40K  │  Recent transactions
│ • 🚗 Transport: -Rp 80K  │
│                         │
│         [+] ADD         │  Main CTA
└─────────────────────────┘
```

**Screen 2: Quick Input**
```
┌─────────────────────────┐
│ ✕                      │
├─────────────────────────┤
│ Input Pengeluaran       │
│                         │
│ [0 0 0 0 0 0 0 0 0]     │
│                         │
│ Rp ___________          │  Numeric input
│                         │
│ 🍽️  🚗  🎮  🏥  🛒  ⚙️   │
│ Makanan Transport Hiburan...│  Category selector
│                         │
│ [Catatan] (optional)    │
│                         │
│         [SIMPAN]        │  Save button
│                         │
└─────────────────────────┘
```

**Screen 3: Presets**
```
┌─────────────────────────┐
│ < Presets               │
├─────────────────────────┤
│                         │
│ ☕ Kopi                 │
│ Rp 25.000 • Makanan     │
│                         │
│ 🍜 Lunch                │
│ Rp 45.000 • Makanan     │  Preset list
│                         │
│ ⛽ Bensin               │
│ Rp 50.000 • Transport   │
│                         │
│ + Tambah Preset         │
│                         │
└─────────────────────────┘
```

### **8.3 Interactions**

**Tap Animations:**
- Button: Slight scale (0.95x) on tap
- Ripple effect
- Visual feedback (200ms)

**Swipe Gestures:**
- Swipe left: Delete transaction
- Swipe to categories: Change category
- Pull down: Refresh

**Haptic Feedback:**
- Light haptic on button tap
- Medium haptic on successful save
- Heavy haptic on delete

---

## **9. SUCCESS METRICS & KPIs**

### **9.1 Engagement Metrics**

| Metric | Target (Month 1) | Target (Month 3) |
|--------|------------------|------------------|
| Daily Active Users (DAU) | 50 | 500 |
| Monthly Active Users (MAU) | 150 | 2,000 |
| Avg session length | 2 min | 3 min |
| Daily transactions logged | 200 | 3,000 |
| Streak users | 30% | 60% |

### **9.2 Retention Metrics**

| Metric | Target |
|--------|--------|
| Day 1 Retention | 60% |
| Day 7 Retention | 40% |
| Day 30 Retention | 25% |
| Monthly churn rate | 30% |

### **9.3 Quality Metrics**

| Metric | Target |
|--------|--------|
| App crash rate | < 0.1% |
| Average load time | < 1 sec |
| Input time per transaction | < 5 sec |
| User rating (if on store) | > 4.5 stars |

### **9.4 Financial Metrics**

| Metric | Target |
|--------|--------|
| Monthly server cost | < Rp 50K |
| Customer acquisition cost (CAC) | Rp 0 (organic) |
| Monthly recurring revenue (MRR) | Rp 0 (free version) |

---

## **10. DEVELOPMENT TIMELINE**

### **Phase 1: MVP Development (4 weeks)**

**Week 1: Setup & Foundation**
- [ ] Setup React + Tailwind + Supabase
- [ ] Design database schema
- [ ] Authentication flow implementation
- [ ] Onboarding screens
- **Deliverable:** Boilerplate + auth working

**Week 2: Core Features - Input & Dashboard**
- [ ] Quick input screen
- [ ] Category management
- [ ] Transaction storage
- [ ] Daily dashboard
- **Deliverable:** Can log transactions, see on dashboard

**Week 3: Presets & Enhancements**
- [ ] Preset system
- [ ] Weekly/monthly summary
- [ ] Habit streak
- [ ] Transaction history
- **Deliverable:** All MVP features working

**Week 4: Polish & PWA**
- [ ] UI polish & responsiveness
- [ ] Service Worker (offline support)
- [ ] PWA manifest & installability
- [ ] Testing & bug fixes
- [ ] Deploy to Vercel
- **Deliverable:** Live app on web

### **Phase 2: Enhancement (Weeks 5-8)**
- Receipt camera (OCR)
- Bank auto-import
- Budget alerts
- PDF export
- Dark mode

### **Phase 3: Scale (Weeks 9+)**
- AI insights
- Social features
- Monetization
- Mobile app (if needed)

---

## **11. RISKS & MITIGATION**

| Risk | Impact | Mitigation |
|------|--------|-----------|
| User adoption slow | High | Early marketing, referral program |
| Data privacy concerns | High | Clear privacy policy, GDPR compliance |
| Server costs escalate | Medium | Monitor usage, optimize queries |
| Performance issues | Medium | Caching, lazy loading, optimization |
| User retention drops | High | Gamification, notifications, updates |
| Scope creep | High | Strict feature lock, phased rollout |

---

## **12. GO-TO-MARKET STRATEGY**

### **12.1 Launch Plan**

**Beta Launch (Week 4):**
- Soft launch to 50-100 beta users
- Gather feedback
- Fix critical bugs

**Public Launch (Week 6):**
- Social media marketing
- TikTok/Instagram posts
- Influencer collaboration (finance micro-influencers)
- Product Hunt launch

### **12.2 Marketing Channels**

1. **Social Media:** Instagram, TikTok, Twitter
2. **Communities:** Finance Reddit communities, Discord servers
3. **Referral:** Invite friends, Rp rewards
4. **Content:** Blog about finance tips
5. **Partnerships:** Collaborate with finance streamers

### **12.3 User Acquisition Strategy**

- **Free with no paywall** initially
- **Referral program:** Invite friend → both get bonus streak
- **Organic growth** through word-of-mouth
- **Content marketing:** Finance tips linked to TIPES
- **Early adopter program:** 100 beta testers

---

## **13. MONETIZATION (Future)**

**Current:** Free to use with no ads

**Phase 2 Options:**
1. **Freemium model:**
   - Free: Basic tracking, 5 presets, basic reports
   - Pro (Rp 29K/month): Unlimited everything, advanced reports, no ads

2. **Affiliate partnerships:**
   - Recommend banks, budgeting courses, investment apps
   - Commission per referral

3. **Enterprise/B2B:**
   - White-label for corporate finance programs

---

## **14. APPENDIX**

### **14.1 Glossary**

- **PWA:** Progressive Web App - app-like experience in web
- **Preset:** Quick shortcut for frequent transactions
- **Streak:** Consecutive days of logging transactions
- **Category:** Type of expense/income (food, transport, etc.)
- **Supabase:** Backend-as-service platform with PostgreSQL database

### **14.2 Tools & Resources**

**Design:**
- Figma: https://figma.com
- Tailwind CSS: https://tailwindcss.com
- Inter Font: https://fonts.google.com/specimen/Inter

**Development:**
- React Docs: https://react.dev
- Supabase Docs: https://supabase.com/docs
- Vercel Deployment: https://vercel.com

**Icons:**
- Heroicons: https://heroicons.com
- Feather Icons: https://feathericons.com

### **14.3 Contact & Approval**

| Role | Name | Contact | Approval |
|------|------|---------|----------|
| Product Owner | You | - | ☑️ |
| Tech Lead | - | - | ⬜ |
| Designer | - | - | ⬜ |

---

## **15. SIGN-OFF**

**Document Status:** Ready for Development  
**Next Steps:**
1. Share with development team
2. Setup project management (GitHub/Jira)
3. Create design mockups in Figma
4. Begin Week 1 development
5. Schedule weekly check-ins

---

**Questions or changes?** Update this document before starting development.

**Good luck! Let's build TIPES! 🚀**
