# Honey Bee Frontend - i18n Translation Analysis Report

## Executive Summary
The Honey Bee frontend project has **partial i18n implementation**. While many UI strings are properly internationalized, there are still **significant hardcoded strings** that need translation support. Approximately **40-50% of user-facing text** is currently NOT using the i18n system.

---

## 1. STRINGS CURRENTLY USING i18n (TRANSLATED ✅)

### Login & Authentication
```typescript
// LoginView.vue
{{ t('login.title') }}           // "HoneyBee"
{{ t('login.button_login') }}    // "Login with Google"
{{ t('login.link_support') }}    // "Contact support"
```

### Navigation & Pages
```typescript
// AdminView.vue
{{ t('admin.page_title') }}      // "Admin panel"
{{ t('admin.button_add_entry') }} // "Add entry"

// ApiariesView.vue
{{ t('apiaries') }}               // "Apiaries"
{{ t('create-apiary') }}          // "Create apiary"
{{ t('search-apiaries') }}        // "Search apiaries..."
{{ t('search-hives') }}           // "Search hives..."

// CalendarView.vue
{{ t('calendar.title') }}         // "General calendar"
{{ t('calendar.filter_apiary') }} // "Apiary"
{{ t('calendar.filter_default') }} // "All apiaries"
```

### Form Labels (Extensive Coverage)
```typescript
// InspectionForm.vue - All labels use i18n
{{ t('form.inspect_abnormal_behavior') }}    // "Abnormal bee behavior?"
{{ t('form.inspect_swarming') }}             // "Swarming?"
{{ t('form.inspect_queen_alive') }}          // "Queen alive?"
{{ t('form.inspect_queen_laying') }}         // "Is queen laying eggs?"
{{ t('form.label_description') }}            // "Description"
{{ t('form.label_amount') }}                 // "Amount"

// Queen modals
{{ t('modal.add_queen_title') }}             // "Add Queen"
{{ t('form.label_born') }}                   // "Born"
{{ t('form.label_specie') }}                 // "Specie"
{{ t('message.no_species') }}                // "No species"
```

### Buttons
```typescript
{{ t('button.submit') }}   // "Submit"
{{ t('button.add') }}      // "Add"
{{ t('button.create') }}   // "Create"
{{ t('button.update') }}   // "Update"
{{ t('button.process') }}  // "Process"
{{ t('button.remove') }}   // "Remove"
{{ t('button.search') }}   // "Search"
```

### Profile & Settings
```typescript
{{ t('profile.location_placeholder') }}  // "Rīga"
{{ t('profile_widget.menu_profile') }}   // "Profile"
{{ t('profile_widget.menu_logout') }}    // "Logout"
```

**Current i18n Files Location:**
- [frontend/src/core/locales/i18n.ts](frontend/src/core/locales/i18n.ts)
- [frontend/src/core/locales/messages/en.json](frontend/src/core/locales/messages/en.json)
- [frontend/src/core/locales/messages/lv.json](frontend/src/core/locales/messages/lv.json)

---

## 2. STRINGS NOT USING i18n (HARDCODED ❌)

### 2.1 TABLE HEADERS & COLUMNS
**Files affected:** 
- [InspectionTable.vue](frontend/src/ui/components/tables/InspectionTable.vue)
- [UserTable.vue](frontend/src/ui/components/tables/UserTable.vue)
- [WhitelistTable.vue](frontend/src/ui/components/tables/WhitelistTable.vue)

**Hardcoded strings:**
```vue
<!-- InspectionTable.vue -->
<p :class="s.columnText">Nr.</p>
<p :class="s.columnText">Apiary</p>
<p :class="s.columnText">Hive count</p>
<p :class="s.columnText">Has been Processed</p>
<p :class="s.columnText">Creator</p>
<p :class="s.columnText">Creation date</p>
<p :class="s.columnText">Actions</p>

<!-- UserTable.vue -->
<p :class="s.columnText">Nr.</p>
<p :class="s.columnText">Email</p>
<p :class="s.columnText">Role</p>
<p :class="s.columnText">Is whitelisted</p>
<p :class="s.columnText">Actions</p>
```

**Translation needed for:**
- Table column headers (6+ strings across 3 files)

---

### 2.2 MODAL TITLES & LABELS
**Files affected:**
- [ProcessInspectionModal.vue](frontend/src/ui/components/modals/ProcessInspectionModal.vue)
- [CalendarCreateEventModal.vue](frontend/src/ui/components/modals/CalendarCreateEventModal.vue)

**Hardcoded strings:**
```vue
<!-- ProcessInspectionModal.vue -->
<ModalBase ref="modal" label="Process Inspection">

<!-- Modal content labels -->
<label>Inspection ID:</label>
<label>Apiary:</label>
<label>Created at:</label>
<label>Hive count:</label>

<!-- CalendarCreateEventModal.vue -->
<ModalBase ref="modal" label="Create event">
```

**Translation needed for:**
- Modal titles (2+ strings)
- Modal field labels (4+ strings)

---

### 2.3 BUTTON & ACTION TEXT
**Files affected:**
- [InspectionTableRow.vue](frontend/src/ui/components/tables/rows/InspectionTableRow.vue)
- [UserTableRow.vue](frontend/src/ui/components/tables/rows/UserTableRow.vue)
- [CalendarCreateEventModal.vue](frontend/src/ui/components/modals/CalendarCreateEventModal.vue)
- [InspectionIntakeView.vue](frontend/src/ui/views/InspectionIntakeView.vue)

**Hardcoded strings:**
```vue
<!-- InspectionTableRow.vue -->
<IconTextButton text="Open" @click="openInspection(entry.id)" />
<IconTextButton text="Process" @click="processInspectionModal?.open()" />

<!-- UserTableRow.vue -->
<!-- In dropdown options -->
<TextDropdownBottomPart text="Allowed" />
<TextDropdownBottomPart text="Denied" />

<!-- CalendarCreateEventModal.vue -->
<StringField label="Title" />
<StringMultipleField label="Content" />
<IconTextButton text="Create" />

<!-- InspectionIntakeView.vue -->
<IconTextButton text="Add note" />
```

**Translation needed for:**
- Action buttons (8+ strings)
- Field labels (3+ strings)

---

### 2.4 STATUS & VALUE INDICATORS
**Files affected:**
- [InspectionTableRow.vue](frontend/src/ui/components/tables/rows/InspectionTableRow.vue)
- [UserTableRow.vue](frontend/src/ui/components/tables/rows/UserTableRow.vue)
- [UserProfile.vue](frontend/src/ui/components/profile/UserProfile.vue)

**Hardcoded strings:**
```vue
<!-- InspectionTableRow.vue -->
{{ entry.processed ? "Yes" : "No" }}
{{ entry.apiary ? `#${entry.apiary.id} ${entry.apiary.name}` : "Deleted apiary" }}
{{ entry.user ? entry.user.username : "Deleted user" }}

<!-- UserTableRow.vue -->
<!-- Dropdown options -->
{{ editableEntry.isWhitelisted ? 'Yes' : 'No' }}

<!-- InspectionReviewview.vue -->
{{ selectedForm?.hive ? `#${selectedForm.hive.id} ${selectedForm.hive.name}` : "Unknown hive" }}

<!-- ApiaryInfo.vue -->
{{ apiary.location ?? "Not set" }}

<!-- ItemCard.vue -->
{{ (name !== undefined) ? name : "NONAME" }}
```

**Translation needed for:**
- Boolean status values (Yes/No) - 2 strings
- Fallback messages (4+ strings: "Deleted apiary", "Deleted user", "Unknown hive", "Not set", "NONAME")

---

### 2.5 FORM FIELD HINTS & PLACEHOLDERS
**Files affected:**
- [StringField.vue](frontend/src/ui/components/input/fields/used/StringField.vue)
- [UserProfile.vue](frontend/src/ui/components/profile/UserProfile.vue)

**Hardcoded strings:**
```vue
<!-- StringField.vue -->
:placeholder="placeholder"  // Often defaults to "..."

<!-- UserProfile.vue -->
<RegistrationInputField hint="Name" />
<RegistrationInputField hint="Surname" />
<RegistrationInputField hint="E-mail" />
```

**Translation needed for:**
- Field hints (3+ strings)
- Placeholder text (varies)

---

### 2.6 LANGUAGE SELECTOR & UI CHROME
**Files affected:**
- [TopHeader.vue](frontend/src/ui/components/navigation/TopHeader.vue)

**Hardcoded strings:**
```vue
<!-- Language buttons - hardcoded letter codes -->
<button @click="changeLang(Language.Lv)">Lv</button>
<button @click="changeLang(Language.En)">En</button>
```

**Note:** These are typically left as language codes, but labels could be added (e.g., "Latvian", "English")

---

## 3. PATTERNS & CATEGORIES OF UNTRANSLATED STRINGS

| Category | Count | Priority | Files | Examples |
|----------|-------|----------|-------|----------|
| **Table Headers** | 7+ | HIGH | InspectionTable, UserTable, WhitelistTable | "Nr.", "Email", "Role", "Actions", "Apiary", "Hive count", "Has been Processed", "Creator", "Creation date" |
| **Modal Titles & Labels** | 6+ | HIGH | ProcessInspectionModal, CalendarCreateEventModal | "Process Inspection", "Create event", "Inspection ID:", "Apiary:", "Created at:" |
| **Action Buttons** | 8+ | HIGH | InspectionTableRow, CalendarCreateEventModal, InspectionIntakeView | "Open", "Process", "Create", "Add note", "Save", "Cancel" |
| **Status Values** | 4+ | MEDIUM | InspectionTableRow, UserTableRow | "Yes", "No", "Allowed", "Denied" |
| **Error/Fallback Messages** | 5+ | MEDIUM | Multiple table row components | "Deleted apiary", "Deleted user", "Unknown hive", "Not set", "NONAME" |
| **Field Labels (Non-Form)** | 5+ | MEDIUM | CalendarCreateEventModal, ProcessInspectionModal | "Title", "Content", "Inspection ID", "Created at", "Hive count" |
| **Hints & Placeholders** | 4+ | LOW | UserProfile, StringField | "Name", "Surname", "E-mail", "..." |
| **Navigation Text** | 2+ | LOW | TopHeader, Navigation | Language codes ("Lv", "En") |

---

## 4. ANALYSIS BY FILE

### Files with GOOD i18n Coverage (>80%)
✅ **InspectionForm.vue** - All form labels translated
✅ **QueenCreateModal.vue** - Modal title and labels translated
✅ **LoginView.vue** - All login text translated
✅ **AdminView.vue** - Page title and buttons translated

### Files with POOR i18n Coverage (<30%)
❌ **InspectionTable.vue** - All table headers hardcoded
❌ **UserTable.vue** - All table headers hardcoded
❌ **ProcessInspectionModal.vue** - Modal title and all labels hardcoded
❌ **CalendarCreateEventModal.vue** - Modal title, field labels hardcoded
❌ **InspectionTableRow.vue** - All action buttons hardcoded
❌ **UserTableRow.vue** - All dropdown options hardcoded
❌ **UserProfile.vue** - All field hints hardcoded

### Files with MIXED Coverage (30-80%)
⚠️ **InspectionIntakeView.vue** - Has some translated strings, but "Add note" button is hardcoded
⚠️ **ApiaryInfo.vue** - Mix of translated and hardcoded fallback messages

---

## 5. RECOMMENDED TRANSLATION ADDITIONS

### High Priority - Add These to i18n JSON

```json
{
  "table": {
    "header_nr": "Nr.",
    "header_email": "Email",
    "header_role": "Role",
    "header_whitelisted": "Is whitelisted",
    "header_actions": "Actions",
    "header_apiary": "Apiary",
    "header_hive_count": "Hive count",
    "header_processed": "Has been Processed",
    "header_creator": "Creator",
    "header_creation_date": "Creation date"
  },
  "modal": {
    "process_inspection_title": "Process Inspection",
    "create_event_title": "Create event",
    "inspection_id": "Inspection ID",
    "apiary": "Apiary",
    "created_at": "Created at",
    "hive_count": "Hive count"
  },
  "button": {
    "open": "Open",
    "process": "Process",
    "add_note": "Add note",
    "save": "Save",
    "cancel": "Cancel"
  },
  "status": {
    "yes": "Yes",
    "no": "No",
    "allowed": "Allowed",
    "denied": "Denied"
  },
  "message": {
    "deleted_apiary": "Deleted apiary",
    "deleted_user": "Deleted user",
    "unknown_hive": "Unknown hive",
    "not_set": "Not set",
    "noname": "NONAME"
  },
  "field": {
    "title": "Title",
    "content": "Content",
    "name": "Name",
    "surname": "Surname",
    "email": "E-mail"
  }
}
```

---

## 6. IMPLEMENTATION PATTERNS

### Pattern 1: Table Headers
**Currently:**
```vue
<p :class="s.columnText">Nr.</p>
<p :class="s.columnText">Email</p>
```

**Should Be:**
```vue
<p :class="s.columnText">{{ t('table.header_nr') }}</p>
<p :class="s.columnText">{{ t('table.header_email') }}</p>
```

### Pattern 2: Modal Labels
**Currently:**
```vue
<ModalBase ref="modal" label="Process Inspection">
```

**Should Be:**
```vue
<ModalBase ref="modal" :label="t('modal.process_inspection_title')">
```

### Pattern 3: Button Text
**Currently:**
```vue
<IconTextButton text="Open" @click="..." />
```

**Should Be:**
```vue
<IconTextButton :text="t('button.open')" @click="..." />
```

### Pattern 4: Conditional Status Text
**Currently:**
```vue
{{ entry.processed ? "Yes" : "No" }}
```

**Should Be:**
```vue
{{ entry.processed ? t('status.yes') : t('status.no') }}
```

### Pattern 5: Fallback Messages
**Currently:**
```vue
{{ entry.apiary ? `#${entry.apiary.id} ${entry.apiary.name}` : "Deleted apiary" }}
```

**Should Be:**
```vue
{{ entry.apiary ? `#${entry.apiary.id} ${entry.apiary.name}` : t('message.deleted_apiary') }}
```

---

## 7. SUMMARY STATISTICS

| Metric | Count |
|--------|-------|
| **Total Vue Files Analyzed** | 91 |
| **Files with i18n Usage** | ~25 |
| **Strings Currently Translated** | ~45 |
| **Hardcoded Strings Found** | ~40+ |
| **Estimated Translation Coverage** | 45-55% |
| **Priority Translation Items** | 30+ |
| **High Priority Files to Fix** | 8 |

---

## 8. RECOMMENDATIONS

### Phase 1: High Priority (Week 1)
1. Translate all **table headers** (7 unique strings across 3 files)
2. Add **modal titles** (3 strings across 2 files)
3. Add **action buttons** (8+ strings)
4. Add **status values** (4 strings)

### Phase 2: Medium Priority (Week 2)
5. Add **error/fallback messages** (5+ strings)
6. Add **field labels** (5+ strings)
7. Add **field hints** (4+ strings)

### Phase 3: Low Priority (Ongoing)
8. Add **language selector labels** (optional)
9. Review and add any missed strings during QA

### Best Practices Going Forward
- ✅ Always use `t()` for any user-facing text
- ✅ Organize translation keys by component/feature
- ✅ Add translator comments for context
- ✅ Test all languages during development
- ✅ Use consistent naming conventions for keys (snake_case with dots for hierarchy)

---

## 9. RELATED FILES

**Translation Configuration:**
- [i18n.ts](frontend/src/core/locales/i18n.ts) - i18n setup
- [en.json](frontend/src/core/locales/messages/en.json) - English translations
- [lv.json](frontend/src/core/locales/messages/lv.json) - Latvian translations

**Uses of useI18n():**
- 25+ Vue components import and use `useI18n()`
- Pattern: `const { t } = useI18n()`

