import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, bigint, varchar, text, timestamp, float, int, mysqlEnum, datetime, boolean } from "drizzle-orm/mysql-core"
import { sql }                                                                                                                                       from "drizzle-orm"
import { HistoryActionType, HiveType, NoteTypes, UserRoles } from "../DatabaseEnums";

export const apiaries = mysqlTable("apiaries", {
	id:                bigint({ mode: "number" }).autoincrement().notNull(),
	name:              varchar({ length: 50 }).notNull(),
	imageUrl:          text("image_url"),
	location:          varchar({ length: 50 }),
	description:       varchar({ length: 500 }),
	userIdCreator:     bigint("user_id_creator", { mode: "number" }).references(() => users.id, { onDelete: "set null" } ),
	creationTimestamp: timestamp("creation_timestamp", { mode: 'string' }).default(sql`(now())`),
},
(table) => [
	index("FK_apiary_user").on(table.userIdCreator),
	primaryKey({ columns: [table.id], name: "apiaries_id"}),
]);

export const apiaryActionHistory = mysqlTable("apiary_action_history", {
	id:                  bigint({ mode: "number" }).autoincrement().notNull(),
	text:                varchar({ length: 100 }).default("").notNull(),
	userId:              bigint("user_id", { mode: "number" }).references(() => users.id),
	historyActionTypeId: bigint("history_action_type_id", { mode: "number" }).notNull().references(() => historyActionTypes.id),
	apiaryId:            bigint("apiary_id", { mode: "number" }).notNull().references(() => apiaries.id),
	creationTimestamp:   timestamp("creation_timestamp", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "apiary_action_history_id"}),
]);

export const historyActionTypes = mysqlTable("history_action_types", {
	id:   bigint({ mode: "number" }).autoincrement().notNull(),
	type: mysqlEnum(HistoryActionType).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "history_action_types_id"}),
]);

export const hiveActionHistory = mysqlTable("hive_action_history", {
	id:                  bigint({ mode: "number" }).autoincrement().notNull(),
	text:                varchar({ length: 200 }),
	userId:              bigint("user_id", { mode: "number" }).references(() => users.id, { onDelete: "cascade" } ),
	hiveId:              bigint("hive_id", { mode: "number" }).notNull().references(() => hives.id, { onDelete: "cascade" } ),
	historyActionTypeId: bigint("history_action_type_id", { mode: "number" }).notNull().references(() => historyActionTypes.id),
	creationTimestamp:   timestamp("creation_timestamp", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "hive_action_history_id"}),
]);

export const hiveHoneyYield = mysqlTable("hive_honey_yield", {
	id:                bigint({ mode: "number" }).autoincrement().notNull(),
	amount:            float(),
	hiveId:            bigint("hive_id", { mode: "number" }).notNull().references(() => hives.id, { onDelete: "cascade" } ),
	inspectionId:      bigint("inspection_id", { mode: "number" }).notNull().references(() => inspections.id, { onDelete: "cascade" } ),
	creationTimestamp: timestamp("creation_timestamp", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	index("hiveId_idx").on(table.hiveId),
	index("inspectionId_idx").on(table.inspectionId),
	primaryKey({ columns: [table.id], name: "hive_honey_yield_id"}),
]);

export const hiveInspectionForms = mysqlTable("hive_inspection_forms", {
	id:                              bigint({ mode: "number" }).autoincrement().notNull(),
	abnormalBehavior:                boolean("abnormal_behavior").notNull(),
	abnormalBehaviorDescription:     varchar("abnormal_behavior_description", { length: 500 }),
	swarming:                        boolean().notNull(),
	needFeeding:                     boolean("need_feeding").notNull(),
	queenAlive:                      boolean("queen_alive").notNull(),
	queenLayingEggs:                 boolean("queen_laying_eggs").notNull(),
	queenLayingEggsIncorrectly:      boolean("queen_laying_eggs_incorrectly").notNull(),
	needMoreHoneyFrames:             boolean("need_more_honey_frames").notNull(),
	needMoreHoneyFramesAmount:       int("need_more_honey_frames_amount"),
	needMoreBreedingFrames:          boolean("need_more_breeding_frames").notNull(),
	needMoreBreedingFramesAmount:    int("need_more_breeding_frames_amount"),
	needMedicalAttention:            boolean("need_medical_attention").notNull(),
	needMedicalAttentionDescription: varchar("need_medical_attention_description", { length: 500 }),
	hasHiveDamage:                   boolean("has_hive_damage").notNull(),
	hasHiveDamageDescription:        varchar("has_hive_damage_description", { length: 500 }),
	takingFrames:                    boolean("taking_frames").notNull(),
	takenHoneyFrames:                int("taken_honey_frames"),
	takenBreedingFrames:             int("taken_breeding_frames"),
	inspectionId:                    bigint("inspection_id", { mode: "number" }).notNull().references(() => inspections.id, { onDelete: "cascade" } ),
	hiveId:                          bigint("hive_id", { mode: "number" }).references(() => hives.id, { onDelete: "set null" } ),
},
(table) => [
	index("hiveId_idx").on(table.hiveId),
	index("inpsectionId_idx").on(table.inspectionId),
	primaryKey({ columns: [table.id], name: "hive_inspection_forms_id"}),
]);

export const hiveNotes = mysqlTable("hive_notes", {
	id:                bigint({ mode: "number" }).autoincrement().notNull(),
	title:             varchar({ length: 30 }),
	content:           varchar({ length: 500 }),
	type:              mysqlEnum(NoteTypes),
	userId:            bigint("user_id", { mode: "number" }).references(() => users.id, { onDelete: "set null" } ),
	hiveId:            bigint("hive_id", { mode: "number" }).notNull().references(() => hives.id, { onDelete: "cascade" } ),
	creationTimestamp: timestamp("creation_timestamp", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "hive_notes_id"}),
]);

export const hiveQueenHistory = mysqlTable("hive_queen_history", {
	id:                  bigint({ mode: "number" }).autoincrement().notNull(),
	timeSpentInHive:     varchar("time_spent_in_hive", { length: 50 }).default('0').notNull(),
	imageUrl:            text("image_url"),
	queenSpeciesId:      bigint("queen_species_id", { mode: "number" }).notNull().references(() => queenSpecies.id),
	hiveId:              bigint("hive_id", { mode: "number" }).references(() => hives.id),
	placedHereTimestamp: timestamp("placed_here_timestamp", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "hive_queen_history_id"}),
]);

export const hives = mysqlTable("hives", {
	id:                bigint({ mode: "number" }).autoincrement().notNull(),
	name:              varchar({ length: 50 }).notNull(),
	imageUrl:          text("image_url"),
	location:          varchar({ length: 50 }),
	type:              mysqlEnum(HiveType).notNull(),
	description:       varchar({ length: 500 }),
	apiaryId:          bigint("apiary_id", { mode: "number" }).references(() => apiaries.id, { onDelete: "set null" } ),
	userId:            bigint("user_id", { mode: "number" }).references(() => users.id, { onDelete: "set null" } ),
	creationTimestamp: timestamp("creation_timestamp", { mode: 'string' }).default(sql`(now())`).notNull(),
	calendarId:        text("calendar_id"),
},
(table) => [
	index("FK_hive_user").on(table.userId),
	primaryKey({ columns: [table.id], name: "hives_id"}),
]);

export const inspections = mysqlTable("inspections", {
	id:                bigint({ mode: "number" }).autoincrement().notNull(),
	processed:         boolean().default(false).notNull(),
	apiaryId:          bigint("apiary_id", { mode: "number" }).references(() => apiaries.id, { onDelete: "set null" } ),
	userIdCreator:     bigint("user_id_creator", { mode: "number" }).references(() => users.id, { onDelete: "set null" } ),
	creationTimestamp: timestamp("creation_timestamp", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	index("apiaryId_idx").on(table.apiaryId),
	index("userId_idx").on(table.userIdCreator),
	primaryKey({ columns: [table.id], name: "inspections_id"}),
]);

export const queenSpecies = mysqlTable("queen_species", {
	id:             bigint({ mode: "number" }).autoincrement().notNull(),
	knownAsName:    varchar("known_as_name", { length: 100 }).default("").notNull(),
	scientificName: varchar("scientific_name", { length: 100 }).default("").notNull(),
	lifeExpectancy: varchar("life_expectancy", { length: 50 }).notNull(),
	description:    text().notNull(),
	behavior:       text().notNull(),
	preferences:    text().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "queen_species_id"}),
]);

export const queens = mysqlTable("queens", {
	id:                   bigint({ mode: "number" }).autoincrement().notNull(),
	imageUrl:             text("image_url"),
	bornDate:             datetime("born_date", { mode: 'string'}).notNull(),
	addedToHiveTimestamp: timestamp("added_to_hive_timestamp", { mode: 'string' }),
	queenSpeciesId:       bigint("queen_species_id", { mode: "number" }).notNull().references(() => queenSpecies.id),
	hiveId:               bigint("hive_id", { mode: "number" }).notNull().references(() => hives.id),
},
(table) => [
	primaryKey({ columns: [table.id], name: "queens_id"}),
]);

export const userApiaryAccess = mysqlTable("user_apiary_access", {
	userId:   bigint("user_id", { mode: "number" }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	apiaryId: bigint("apiary_id", { mode: "number" }).notNull().references(() => apiaries.id, { onDelete: "cascade" } ),
},
(table) => [
	primaryKey({ columns: [table.userId, table.apiaryId], name: "user_apiary_access_user_id_apiary_id"}),
]);

export const userHiveAccess = mysqlTable("user_hive_access", {
	userId: bigint("user_id", { mode: "number" }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	hiveId: bigint("hive_id", { mode: "number" }).notNull().references(() => hives.id, { onDelete: "cascade" } ),
},
(table) => [
	primaryKey({ columns: [table.userId, table.hiveId], name: "user_hive_access_user_id_hive_id"}),
]);

export const users = mysqlTable("users", {
	id:                 bigint({ mode: "number" }).autoincrement().notNull(),
	username:           varchar({ length: 20 }).notNull(),
	email:              varchar({ length: 30 }).default("").notNull(),
	imageUrl:           text("image_url"),
	role:               mysqlEnum(UserRoles).notNull(),
	provider:           mysqlEnum(['GOOGLE']),
	providerSub:        varchar("provider_sub", { length: 255 }),
	googleRefreshToken: text("google_refresh_token"),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
]);

export const whitelist = mysqlTable("whitelist", {
	id:     bigint({ mode: "number" }).autoincrement().notNull(),
	email:  varchar({ length: 60 }).notNull(),
	role:   mysqlEnum(UserRoles).notNull(),
	status: boolean().default(false).notNull(),
	userId: bigint("user_id", { mode: "number" }).references(() => users.id),
},
(table) => [
	primaryKey({ columns: [table.id], name: "whitelist_id"}),
]);
