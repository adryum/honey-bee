# Translation Audit & Status Guide

**Last Updated:** May 29, 2026
**Project:** HoneyBee (Bee Apiary Management System)
**Languages:** English (en), Latvian (lv)

---

## Summary

| Metric | Value |
|--------|-------|
| **Total Vue Files** | 92 |
| **Files with Untranslated Strings** | 15+ |
| **Untranslated Hardcoded Strings** | 24 |
| **Translation Files** | 2 (en.json, lv.json) |

---

## Currently Translated Keys

### Core Sections
- **hiveOverview**: yield, info, calendarEvents, actionHistory, medicine, notes, queen, suppers
- **Navigation**: home, apiaries, inspections, sidebar_close
- **Forms**: All inspect_* keys, all label_* keys, description, content, email
- **Buttons**: submit, create, update, add, process, remove, replace, edit, search, clear, today
- **Status**: yes, no, allowed, denied, deleted_apiary, deleted_user, unknown_hive, not_set, no_apiary
- **Tables**: All header_* keys
- **Modals**: All modal titles and tabs
- **Calendar**: title, filter_apiary, filter_default, label_today, label_tasks, create_event, create_task, search_task, day, month, year
- **Admin**: page_title, button_add_entry
- **Profile**: menu_profile, menu_logout, menu_admin, location_placeholder
- **Queen**: section_title, message_no_queen, all label_* keys, species info keys
- **Inspection**: All label_* keys, submit_last, submit_next, review_exit
- **Fallback**: no_title, no_type, unknown, no_description, empty, noname, nan, selection
- **Action**: open, exit, go, overview

---

## Untranslated Strings - Detailed List

### 🔴 HIGH PRIORITY (User-Visible, Frequent Use)

#### CalendarToolBarVertical.vue
```
- "Go" - Navigation button
- "Today" - Button label
- "Search task" - Input field label (DUPLICATE: calendar.search_task exists)
```
**Action**: Replace with translation keys

---

#### InspectionReviewview.vue
```
- "Exit" - Button label (DUPLICATE: action.exit exists)
- "Add note" - Button label
- "Unknown hive" - Error fallback (DUPLICATE: status.unknown_hive exists)
- "N/A" - Value fallback
- "Apiary" - Inline label
```
**Action**: Replace "Add note", "N/A", "Apiary" with translation keys; use existing keys for others

---

#### ItemCard.vue (Card Display Component)
```
- "In storage:" - Label header
- "Total registered:" - Label header
- "NONAME" - Default when name undefined (DUPLICATE: card.placeholder_noname exists)
- "nan" - Default when count undefined (DUPLICATE: card.placeholder_nan exists)
```
**Action**: Add "In storage:" and "Total registered:" translations

---

### 🟡 MEDIUM PRIORITY (Context-Specific, Important)

#### CalendarTaskExpandable.vue
```
- "Type:" - Task property label
- "Created by:" - Task property label
- "No title" - Fallback title (DUPLICATE: fallback.no_title exists)
- "No type" - Fallback type (DUPLICATE: fallback.no_type exists)
- "No description" - Fallback description (DUPLICATE: fallback.no_description exists)
- "apple" - ⚠️ DEBUG STRING (SHOULD BE REMOVED)
```
**Action**: Add translations for "Type:", "Created by:"; remove "apple" debug string

---

#### Info.vue (Hive/Apiary Info Component)
```
- "Edit" - Button label (DUPLICATE: button.edit exists)
```
**Action**: Replace with translation key (button.edit)

---

#### Apiary.vue
```
- "Hives" - Section heading (DUPLICATE: hives key exists)
- "apiary image" - Alt text attribute
```
**Action**: Replace "Hives" with translation key; add image alt text translation

---

### 🟢 MEDIUM-LOW PRIORITY (Specific Contexts, Edge Cases)

#### MonthChangerWidget.vue
```
- "Today" - Button label (DUPLICATE: button.today exists)
```
**Action**: Replace with translation key

---

#### DateField.vue
```
- "dd / mm / yyyy" - Placeholder text for date input
```
**Action**: Add translation for date format placeholder

---

#### TopHeader.vue
```
- "Lv" - Language button (Language code - may be intentional)
- "En" - Language button (Language code - may be intentional)
```
**Action**: Consider if these should be translated or kept as language codes

---

#### Various Components - Alt Text (Accessibility)
```
Files affected: Hive.vue, Apiary.vue, ProfileWidget.vue, ProfileView.vue, HistoryLogEntry.vue, LoginView.vue

Strings:
- "hive image" (Hive.vue)
- "apiary image" (Apiary.vue)
- "profile picture" (ProfileWidget.vue, ProfileView.vue)
- "user image" (HistoryLogEntry.vue)
- "logo" (LoginView.vue)
```
**Action**: Add all image alt text to translations under new section "accessibility.*.alt"

---

### ⚠️ CRITICAL ISSUES

#### LineGraph.vue
```
- "Iensesums" - APPEARS TO BE TEST/DEBUG STRING
  Current usage: Chart label (likely intended to be "Ienesums" in Latvian or "Yield" in English)
```
**Action**: INVESTIGATE - Appears to be incomplete Latvian translation. Should likely be a translation key.

---

#### HiveCreateModal.vue
```
- "From other apiaries" - COMMENTED OUT CODE (not rendered)
```
**Action**: Remove commented code or verify if feature is under development

---

#### ImageDropZone.vue
```
- "select diferent file" - COMMENTED OUT CODE (contains typo: "diferent" → "different")
- "select file" - COMMENTED OUT CODE
```
**Action**: Remove commented code or fix typo if feature is being restored

---

## Translation Key Structure Recommendations

### New Sections to Add

#### 1. Calendar Toolbar & Navigation
```json
"calendar.toolbar": {
  "go": "Go",
  "today": "Today",
  "search_task": "Search task"
}
```

#### 2. Task/Event Display
```json
"task": {
  "type_label": "Type:",
  "created_by_label": "Created by:",
  "no_title": "No title",
  "no_type": "No type",
  "no_description": "No description"
}
```

#### 3. Card Display
```json
"card": {
  "in_storage": "In storage:",
  "total_registered": "Total registered:",
  "placeholder_noname": "NONAME",
  "placeholder_nan": "nan"
}
```

#### 4. Accessibility
```json
"accessibility": {
  "hive_image_alt": "hive image",
  "apiary_image_alt": "apiary image",
  "profile_picture_alt": "profile picture",
  "user_image_alt": "user image",
  "logo_alt": "logo"
}
```

#### 5. Forms & Input
```json
"form": {
  "date_placeholder": "dd / mm / yyyy"
}
```

#### 6. Actions
```json
"action": {
  "add_note": "Add note"
}
```

#### 7. Inspection
```json
"inspection": {
  "na_value": "N/A"
}
```

#### 8. Language Selection
```json
"language": {
  "lv": "Lv",
  "en": "En"
}
```

---

## Implementation Checklist

### Phase 1: Update Translation JSONs
- [ ] Add new keys to en.json for all untranslated strings
- [ ] Add corresponding Latvian translations to lv.json
- [ ] Verify all translations are added

### Phase 2: Update .vue Files
- [ ] CalendarToolBarVertical.vue - Replace "Go", "Today", "Search task"
- [ ] InspectionReviewview.vue - Replace "Exit", "Add note", "N/A", "Apiary"
- [ ] ItemCard.vue - Replace labels with translations
- [ ] CalendarTaskExpandable.vue - Replace labels, remove "apple" debug string
- [ ] Info.vue - Replace "Edit" button label
- [ ] Apiary.vue - Replace "Hives", add alt text translation
- [ ] MonthChangerWidget.vue - Replace "Today"
- [ ] DateField.vue - Replace placeholder with translation
- [ ] TopHeader.vue - Replace "Lv", "En" (if needed)
- [ ] Hive.vue, ProfileWidget.vue, ProfileView.vue, HistoryLogEntry.vue, LoginView.vue - Add alt text translations
- [ ] LineGraph.vue - Investigate and fix "Iensesums"
- [ ] Review and fix commented code sections

### Phase 3: Verification
- [ ] Test all language switching (EN ↔ LV)
- [ ] Verify all components display correctly in both languages
- [ ] Check for any remaining hardcoded English text
- [ ] Validate JSON syntax for both translation files

---

## Notes

- Many strings already have translations defined but are not being used in the components
- Some components use hardcoded strings where translation keys already exist
- Image alt text is an important accessibility feature that should be translated
- The "Iensesums" in LineGraph.vue needs investigation
- Test/debug data ("apple", commented code) should be removed
- Some language buttons might be intentional as language codes

---

## File Locations

- **English Translations**: `frontend/src/core/locales/messages/en.json`
- **Latvian Translations**: `frontend/src/core/locales/messages/lv.json`
- **i18n Configuration**: `frontend/src/core/locales/i18n.ts`
- **Vue Files to Update**: Listed in detailed section above
