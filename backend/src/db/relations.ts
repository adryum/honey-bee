import { relations } from "drizzle-orm/relations";
import { users, apiaries, historyActionTypes, apiaryActionHistory, hives, hiveActionHistory, hiveHoneyYield, inspections, hiveInspectionForms, hiveNotes, queenSpecies, hiveQueenHistory, queens, userApiaryAccess, userHiveAccess, whitelist } from "./schema";

export const apiariesRelations = relations(apiaries, ({one, many}) => ({
	user: one(users, {
		fields: [apiaries.userIdCreator],
		references: [users.id]
	}),
	apiaryActionHistories: many(apiaryActionHistory),
	hives: many(hives),
	inspections: many(inspections),
	userApiaryAccesses: many(userApiaryAccess),
}));

export const usersRelations = relations(users, ({many}) => ({
	apiaries: many(apiaries),
	apiaryActionHistories: many(apiaryActionHistory),
	hiveActionHistories: many(hiveActionHistory),
	hiveNotes: many(hiveNotes),
	hives: many(hives),
	inspections: many(inspections),
	userApiaryAccesses: many(userApiaryAccess),
	userHiveAccesses: many(userHiveAccess),
	whitelists: many(whitelist),
}));

export const apiaryActionHistoryRelations = relations(apiaryActionHistory, ({one}) => ({
	historyActionType: one(historyActionTypes, {
		fields: [apiaryActionHistory.historyActionTypeId],
		references: [historyActionTypes.id]
	}),
	apiary: one(apiaries, {
		fields: [apiaryActionHistory.apiaryId],
		references: [apiaries.id]
	}),
	user: one(users, {
		fields: [apiaryActionHistory.userId],
		references: [users.id]
	}),
}));

export const historyActionTypesRelations = relations(historyActionTypes, ({many}) => ({
	apiaryActionHistories: many(apiaryActionHistory),
	hiveActionHistories: many(hiveActionHistory),
}));

export const hiveActionHistoryRelations = relations(hiveActionHistory, ({one}) => ({
	hive: one(hives, {
		fields: [hiveActionHistory.hiveId],
		references: [hives.id]
	}),
	user: one(users, {
		fields: [hiveActionHistory.userId],
		references: [users.id]
	}),
	historyActionType: one(historyActionTypes, {
		fields: [hiveActionHistory.historyActionTypeId],
		references: [historyActionTypes.id]
	}),
}));

export const hivesRelations = relations(hives, ({one, many}) => ({
	hiveActionHistories: many(hiveActionHistory),
	hiveHoneyYields: many(hiveHoneyYield),
	hiveInspectionForms: many(hiveInspectionForms),
	hiveNotes: many(hiveNotes),
	hiveQueenHistories: many(hiveQueenHistory),
	apiary: one(apiaries, {
		fields: [hives.apiaryId],
		references: [apiaries.id]
	}),
	user: one(users, {
		fields: [hives.userId],
		references: [users.id]
	}),
	queens: many(queens),
	userHiveAccesses: many(userHiveAccess),
}));

export const hiveHoneyYieldRelations = relations(hiveHoneyYield, ({one}) => ({
	hive: one(hives, {
		fields: [hiveHoneyYield.hiveId],
		references: [hives.id]
	}),
	inspection: one(inspections, {
		fields: [hiveHoneyYield.inspectionId],
		references: [inspections.id]
	}),
}));

export const inspectionsRelations = relations(inspections, ({one, many}) => ({
	hiveHoneyYields: many(hiveHoneyYield),
	hiveInspectionForms: many(hiveInspectionForms),
	apiary: one(apiaries, {
		fields: [inspections.apiaryId],
		references: [apiaries.id]
	}),
	user: one(users, {
		fields: [inspections.userIdCreator],
		references: [users.id]
	}),
}));

export const hiveInspectionFormsRelations = relations(hiveInspectionForms, ({one}) => ({
	hive: one(hives, {
		fields: [hiveInspectionForms.hiveId],
		references: [hives.id]
	}),
	inspection: one(inspections, {
		fields: [hiveInspectionForms.inspectionId],
		references: [inspections.id]
	}),
}));

export const hiveNotesRelations = relations(hiveNotes, ({one}) => ({
	hive: one(hives, {
		fields: [hiveNotes.hiveId],
		references: [hives.id]
	}),
	user: one(users, {
		fields: [hiveNotes.userId],
		references: [users.id]
	}),
}));

export const hiveQueenHistoryRelations = relations(hiveQueenHistory, ({one}) => ({
	queenSpecy: one(queenSpecies, {
		fields: [hiveQueenHistory.queenSpeciesId],
		references: [queenSpecies.id]
	}),
	hive: one(hives, {
		fields: [hiveQueenHistory.hiveId],
		references: [hives.id]
	}),
}));

export const queenSpeciesRelations = relations(queenSpecies, ({many}) => ({
	hiveQueenHistories: many(hiveQueenHistory),
	queens: many(queens),
}));

export const queensRelations = relations(queens, ({one}) => ({
	queenSpecy: one(queenSpecies, {
		fields: [queens.queenSpeciesId],
		references: [queenSpecies.id]
	}),
	hive: one(hives, {
		fields: [queens.hiveId],
		references: [hives.id]
	}),
}));

export const userApiaryAccessRelations = relations(userApiaryAccess, ({one}) => ({
	apiary: one(apiaries, {
		fields: [userApiaryAccess.apiaryId],
		references: [apiaries.id]
	}),
	user: one(users, {
		fields: [userApiaryAccess.userId],
		references: [users.id]
	}),
}));

export const userHiveAccessRelations = relations(userHiveAccess, ({one}) => ({
	hive: one(hives, {
		fields: [userHiveAccess.hiveId],
		references: [hives.id]
	}),
	user: one(users, {
		fields: [userHiveAccess.userId],
		references: [users.id]
	}),
}));

export const whitelistRelations = relations(whitelist, ({one}) => ({
	user: one(users, {
		fields: [whitelist.userId],
		references: [users.id]
	}),
}));