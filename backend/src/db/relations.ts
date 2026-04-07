import { relations } from "drizzle-orm/relations";
import { users, apiaries, hives, hiveHoneyProduction, hiveInspections, hiveInspectionForms, hivehistory, notes, userapiaryaccess, userhiveaccess } from "./schema";

export const apiariesRelations = relations(apiaries, ({one, many}) => ({
	user: one(users, {
		fields: [apiaries.userId],
		references: [users.id]
	}),
	hiveInspections: many(hiveInspections),
	hives: many(hives),
	userapiaryaccesses: many(userapiaryaccess),
}));

export const usersRelations = relations(users, ({many}) => ({
	apiaries: many(apiaries),
	hiveInspections: many(hiveInspections),
	hivehistories: many(hivehistory),
	hives: many(hives),
	notes: many(notes),
	userapiaryaccesses: many(userapiaryaccess),
	userhiveaccesses: many(userhiveaccess),
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

export const hivesRelations = relations(hives, ({one, many}) => ({
	hiveHoneyProductions: many(hiveHoneyProduction),
	hiveInspectionForms: many(hiveInspectionForms),
	hivehistories: many(hivehistory),
	apiary: one(apiaries, {
		fields: [hives.apiaryId],
		references: [apiaries.id]
	}),
	user: one(users, {
		fields: [hives.userId],
		references: [users.id]
	}),
	notes: many(notes),
	userhiveaccesses: many(userhiveaccess),
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

export const hivehistoryRelations = relations(hivehistory, ({one}) => ({
	hive: one(hives, {
		fields: [hivehistory.hiveId],
		references: [hives.id]
	}),
	user: one(users, {
		fields: [hivehistory.userId],
		references: [users.id]
	}),
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

export const userapiaryaccessRelations = relations(userapiaryaccess, ({one}) => ({
	apiary: one(apiaries, {
		fields: [userapiaryaccess.apiaryId],
		references: [apiaries.id]
	}),
	user: one(users, {
		fields: [userapiaryaccess.userId],
		references: [users.id]
	}),
}));

export const userhiveaccessRelations = relations(userhiveaccess, ({one}) => ({
	hive: one(hives, {
		fields: [userhiveaccess.hiveId],
		references: [hives.id]
	}),
	user: one(users, {
		fields: [userhiveaccess.userId],
		references: [users.id]
	}),
}));