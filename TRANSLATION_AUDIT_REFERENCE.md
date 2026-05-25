# Translation Audit Reference Guide

**Project:** HoneyBee  
**Frontend:** Vue 3 + vue-i18n  
**Languages:** English (en) and Latvian (lv)  
**Coverage:** ~45-50%  
**Date:** 2026-05-25

---

## I. Current Translation Structure

### A. Translation System Setup
- **Framework:** vue-i18n (composable API)
- **Usage Pattern:** `const { t } = useI18n()` then `{{ t('key.name') }}`
- **File Location:** `frontend/src/core/locales/messages/`
- **Files:**
  - `en.json` (English translations)
  - `lv.json` (Latvian translations)
- **Languages Enum:** `Language.En = "en-US"`, `Language.Lv = "lv-LV"`

### B. Current Translation Keys (Already Implemented)
```
✅ FULLY TRANSLATED (Both EN & LV):
├── login.*
│   ├── title: "HoneyBee" / "HoneyBee"
│   ├── button_login: "Login with Google" / "Pierakstīties ar Google"
│   └── link_support: "Contact support" / "Sazinieties ar atbalstu"
├── navigation.*
│   ├── home, apiaries, inspections, sidebar_close
├── profile_widget.*
│   ├── menu_profile, menu_logout, menu_admin
├── admin.*
│   ├── page_title, button_add_entry
├── calendar.*
│   ├── title, filter_apiary, filter_default, label_today, label_tasks
├── form.*
│   ├── All inspection form labels (40+ keys)
│   ├── label_name, label_type, label_born, label_specie, etc.
├── button.*
│   ├── submit, create, update, add, process, remove, edit, search, clear, today
├── table.*
│   ├── header_nr, header_email, header_role, header_status, header_actions
│   ├── header_apiary, header_hive_count, header_processed, header_creator
│   └── header_creation_date, header_is_whitelisted
└── hiveOverview.*
    ├── yield, info, calendarEvents, actionHistory, medicine, notes, queen, suppers
```

---

## II. Identified Untranslated Static Strings

### A. High Priority (Frequently Used UI Text)

#### 1. **Error Messages & Status Text**
| String | Location | Priority | Category |
|--------|----------|----------|----------|
| "Deleted apiary" | ApiariesView.vue | HIGH | Status message |
| "Deleted user" | UserTable.vue | HIGH | Status message |
| "Unknown hive" | HiveOverview.vue | HIGH | Fallback text |
| "Not set" | Various | HIGH | Fallback text |
| "Yes" / "No" | InspectionTable.vue | HIGH | Boolean display |
| "Allowed" / "Denied" | WhitelistTable.vue | HIGH | Status display |

#### 2. **Modal Titles & Dialog Text**
| String | Files | Priority | Category |
|--------|-------|----------|----------|
| "Process Inspection" | ProcessInspectionModal.vue | HIGH | Modal title |
| "Create event" | CalendarView.vue | HIGH | Modal title |
| "Are you sure?" | Various modals | HIGH | Confirmation text |
| "Successfully created" | Toasts | HIGH | Success message |
| "Failed to..." | Toasts | HIGH | Error message |

#### 3. **Table Headers (Hardcoded)**
| Header | File | Current Status |
|--------|------|-----------------|
| "Nr." | InspectionTable.vue, UserTable.vue | ❌ HARDCODED |
| "Email" | UserTable.vue | ❌ HARDCODED |
| "Role" | UserTable.vue | ❌ HARDCODED |
| "Status" | UserTable.vue | ❌ HARDCODED |
| "Actions" | InspectionTable.vue | ❌ HARDCODED |
| "Apiary" | InspectionTable.vue | ❌ HARDCODED |
| "Hive count" | InspectionTable.vue | ❌ HARDCODED |
| "Has been Processed" | InspectionTable.vue | ❌ HARDCODED |
| "Creator" | InspectionTable.vue | ❌ HARDCODED |
| "Creation date" | InspectionTable.vue | ❌ HARDCODED |
| "Is whitelisted" | WhitelistTable.vue | ❌ HARDCODED |

#### 4. **Button & Action Text**
| Text | File | Priority |
|------|------|----------|
| "Open" | InspectionTableRow.vue | MEDIUM |
| "Process" | InspectionTableRow.vue | MEDIUM |
| "Add note" | HiveOverview.vue | MEDIUM |
| "Delete apiary?" | Modal confirmations | MEDIUM |

#### 5. **Form Placeholder & Hint Text**
| Text | File | Priority |
|------|------|----------|
| "Search..." | SearchBars | MEDIUM |
| "Enter name..." | Form inputs | MEDIUM |
| "Type here..." | Text areas | MEDIUM |

#### 6. **Fallback & Empty State Messages**
| Text | File | Priority |
|------|------|----------|
| "No results found" | Lists/Tables | MEDIUM |
| "No data available" | Tables | MEDIUM |
| "Loading..." | Loaders | MEDIUM |

---

## III. Files Requiring Translation Updates

### A. Vue Files with Hardcoded Text (Primary Targets)

```
HIGH PRIORITY (Many hardcoded strings):
├── src/ui/components/tables/InspectionTable.vue         [Table headers, labels]
├── src/ui/components/tables/UserTable.vue               [Table headers, status]
├── src/ui/components/tables/WhitelistTable.vue          [Headers, status]
├── src/ui/components/tables/rows/InspectionTableRow.vue [Action buttons]
├── src/ui/components/tables/rows/UserTableRow.vue       [Action buttons, options]
├── src/ui/components/modals/ProcessInspectionModal.vue  [Modal title, fields]
├── src/ui/views/InspectionReviewView.vue                [Labels, buttons]

MEDIUM PRIORITY (Some hardcoded strings):
├── src/ui/views/HiveOverview.vue                        [Action labels]
├── src/ui/views/ApiariesView.vue                        [Empty states]
├── src/ui/components/admin/WhitelistFragment.vue        [Labels, messages]
├── src/ui/components/admin/UserlistFragment.vue         [Labels, messages]
```

---

## IV. Translation JSON Structure Template

### Current Structure Pattern:
```json
{
    "category": {
        "key": "English text",
        "nested_key": "Another text"
    },
    "top_level_key": "Value"
}
```

### Required New Categories for Completeness:

```json
{
    "status": {
        "deleted": "Deleted",
        "allowed": "Allowed",
        "denied": "Denied",
        "yes": "Yes",
        "no": "No"
    },
    "message": {
        "deleted_apiary": "Deleted apiary",
        "deleted_user": "Deleted user",
        "unknown_hive": "Unknown hive",
        "not_set": "Not set",
        "no_results": "No results found",
        "confirm_delete": "Are you sure?"
    },
    "table": {
        "header_nr": "Nr.",
        "header_email": "Email",
        "header_role": "Role",
        "header_status": "Status",
        "header_actions": "Actions",
        "header_is_whitelisted": "Is whitelisted"
    }
}
```

---

## V. Implementation Roadmap

### Phase 1: JSON Files Update
- [ ] Add new keys to `en.json`
- [ ] Add corresponding translations to `lv.json`
- [ ] Organize by logical categories (status, messages, table, actions)

### Phase 2: Component Updates (High Priority First)
- [ ] Update table headers to use `t()` function
- [ ] Update modal titles to use `t()` function
- [ ] Update status/badge text to use `t()` function

### Phase 3: Component Updates (Medium Priority)
- [ ] Update button text to use `t()` function
- [ ] Update action labels to use `t()` function
- [ ] Update placeholder text to use `t()` function

### Phase 4: Testing & Validation
- [ ] Verify all translations display correctly
- [ ] Test language switching
- [ ] Check Latvian character encoding

---

## VI. Quick Reference: Translation Key Naming Convention

- Use **snake_case** for keys
- Use **nested objects** for related items
- Examples:
  - `form.inspect_abnormal_behavior`
  - `table.header_email`
  - `status.deleted`
  - `message.confirm_delete`
  - `button.submit`

---

## VII. Files Status Summary

| File | Translated % | Priority | Notes |
|------|--------------|----------|-------|
| LoginView.vue | 100% | ✅ DONE | All using t() |
| AdminView.vue | 100% | ✅ DONE | All using t() |
| ApiariesView.vue | 90% | 🟡 MINOR | One fallback message |
| InspectionTable.vue | 0% | 🔴 CRITICAL | All headers hardcoded |
| UserTable.vue | 0% | 🔴 CRITICAL | All headers hardcoded |
| InspectionIntakeView.vue | 80% | 🟡 MINOR | Some labels missing |
| HiveOverview.vue | 70% | 🟡 MEDIUM | Action labels hardcoded |
| InspectionReviewView.vue | 60% | 🟡 MEDIUM | Several labels hardcoded |

---

## VIII. Statistics

- **Total .vue files:** 91
- **Partially translated:** ~45
- **Not using i18n:** ~30-40
- **Current EN keys:** ~70
- **Current LV keys:** ~70
- **Estimated missing translations:** 40-60 new keys

---

## Next Steps

1. ✅ **This document** - Complete reference for translation needs
2. **JSON Update** - Add identified translation keys to both en.json and lv.json
3. **Component Refactoring** - Replace hardcoded strings with `t()` calls
4. **Testing** - Verify all UIs display correctly in both languages
