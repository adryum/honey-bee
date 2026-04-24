import { relations } from "drizzle-orm/relations";
import { users, apiaries, historyActionTypes, apiaryActionHistory, hives, hiveActionHistory, hiveHoneyProduction, hiveInspections, hiveInspectionForms, species, hiveQueenHistory, notes, queens, userApiaryAccess, userHiveAccess } from "./schema";

export const apiariesRelations = relations(apiaries, ({one, many}) => ({
	user: one(users, {
		fields: [apiaries.userId],
		references: [users.id]
	}),
	apiaryActionHistories: many(apiaryActionHistory),
	hiveInspections: many(hiveInspections),
	hives: many(hives),
	userApiaryAccesses: many(userApiaryAccess),
}));

export const usersRelations = relations(users, ({many}) => ({
	apiaries: many(apiaries),
	apiaryActionHistories: many(apiaryActionHistory),
	hiveActionHistories: many(hiveActionHistory),
	hiveInspections: many(hiveInspections),
	hives: many(hives),
	notes: many(notes),
	userApiaryAccesses: many(userApiaryAccess),
	userHiveAccesses: many(userHiveAccess),
}));

export const apiaryActionHistoryRelations = relations(apiaryActionHistory, ({one}) => ({
	historyActionType: one(historyActionTypes, {
		fields: [apiaryActionHistory.type],
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
		fields: [hiveActionHistory.type],
		references: [historyActionTypes.id]
	}),
}));

export const hivesRelations = relations(hives, ({one, many}) => ({
	hiveActionHistories: many(hiveActionHistory),
	hiveHoneyProductions: many(hiveHoneyProduction),
	hiveInspectionForms: many(hiveInspectionForms),
	hiveQueenHistories: many(hiveQueenHistory),
	apiary: one(apiaries, {
		fields: [hives.apiaryId],
		references: [apiaries.id]
	}),
	user: one(users, {
		fields: [hives.userId],
		references: [users.id]
	}),
	notes: many(notes),
	queens: many(queens),
	userHiveAccesses: many(userHiveAccess),
}));

export const hiveHoneyProductionRelations = relations(hiveHoneyProduction, ({one}) => ({
	hive: one(hives, {
		fields: [hiveHoneyProduction.hiveId],
		references: [hives.id]
	}),
	hiveInspection: one(hiveInspections, {
		fields: [hiveHoneyProduction.inspectionId],
		references: [hiveInspections.id]
	}),
}));

export const hiveInspectionsRelations = relations(hiveInspections, ({one, many}) => ({
	hiveHoneyProductions: many(hiveHoneyProduction),
	hiveInspectionForms: many(hiveInspectionForms),
	apiary: one(apiaries, {
		fields: [hiveInspections.apiaryId],
		references: [apiaries.id]
	}),
	user: one(users, {
		fields: [hiveInspections.userIdCreator],
		references: [users.id]
	}),
}));

export const hiveInspectionFormsRelations = relations(hiveInspectionForms, ({one}) => ({
	hive: one(hives, {
		fields: [hiveInspectionForms.hiveId],
		references: [hives.id]
	}),
	hiveInspection: one(hiveInspections, {
		fields: [hiveInspectionForms.inspectionId],
		references: [hiveInspections.id]
	}),
}));

export const hiveQueenHistoryRelations = relations(hiveQueenHistory, ({one}) => ({
	species: one(species, {
		fields: [hiveQueenHistory.speciesId],
		references: [species.id]
	}),
	hive: one(hives, {
		fields: [hiveQueenHistory.hiveId],
		references: [hives.id]
	}),
}));

export const speciesRelations = relations(species, ({many}) => ({
	hiveQueenHistories: many(hiveQueenHistory),
	queens: many(queens),
}));

export const notesRelations = relations(notes, ({one}) => ({
	hive: one(hives, {
		fields: [notes.hiveId],
		references: [hives.id]
	}),
	user: one(users, {
		fields: [notes.userId],
		references: [users.id]
	}),
}));

export const queensRelations = relations(queens, ({one}) => ({
	species: one(species, {
		fields: [queens.speciesId],
		references: [species.id]
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