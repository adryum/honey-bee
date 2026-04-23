import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, bigint, varchar, text, timestamp, float, int, mysqlEnum, datetime, tinyint } from "drizzle-orm/mysql-core"
import { sql }                                                                                                                                                from "drizzle-orm"
import { HiveType, Role }                                                                                                                                     from "../DatabaseEnums";
import { boolean }                                                                                                                                            from "drizzle-orm/mysql-core";

export const apiaries = mysqlTable("apiaries", {
	id:           bigint({ mode: "number" }).autoincrement().notNull(),
	name:         varchar({ length: 50 }),
	image:        text(),
	location:     varchar({ length: 50 }),
	description:  varchar({ length: 500 }),
	userId:       bigint({ mode: "number" }).references(() => users.id, { onDelete: "set null" } ),
	creationDate: timestamp({ mode: 'string' }),
},
(table) => [
	index("FK_apiary_user").on(table.userId),
	primaryKey({ columns: [table.id], name: "apiaries_id"}),
]);


export const hivehistory = mysqlTable("hivehistory", {
	id:           bigint({ mode: "number" }).autoincrement().notNull(),
	text:         varchar({ length: 200 }),
	userId:       bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" } ),
	hiveId:       bigint({ mode: "number" }).references(() => hives.id, { onDelete: "cascade" } ),
	creationDate: timestamp({ mode: 'string' }),
	type:         mysqlEnum(['CALENDAR','EDIT','NOTE','INSPECTION']).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "hivehistory_id"}),
]);

export const hives = mysqlTable("hives", {
	id:           bigint({ mode: "number" }).autoincrement().notNull(),
	name:         varchar({ length: 50 }),
	image:        text(),
	location:     varchar({ length: 50 }),
	type:         mysqlEnum(HiveType).notNull(),
	description:  varchar({ length: 500 }),
	apiaryId:     bigint({ mode: "number" }).references(() => apiaries.id, { onDelete: "set null" } ),
	userId:       bigint({ mode: "number" }).references(() => users.id, { onDelete: "set null" } ),
	creationDate: timestamp({ mode: 'string' }),
	calendarId:   text(),
},
(table) => [
	index("FK_hive_user").on(table.userId),
	primaryKey({ columns: [table.id], name: "hives_id"}),
]);

export const notes = mysqlTable("notes", {
	id:           bigint({ mode: "number" }).autoincrement().notNull(),
	title:        varchar({ length: 30 }),
	content:      varchar({ length: 500 }),
	creationDate: datetime({ mode: 'string'}),
	type:         mysqlEnum(['WARNING','INFORMATIONAL']),
	userId:       bigint({ mode: "number" }).references(() => users.id, { onDelete: "set null" } ),
	hiveId:       bigint({ mode: "number" }).references(() => hives.id, { onDelete: "set null" } ),
},
(table) => [
	primaryKey({ columns: [table.id], name: "notes_id"}),
]);

export const userapiaryaccess = mysqlTable("userapiaryaccess", {
	id:       bigint({ mode: "number" }).autoincrement().notNull(),
	userId:   bigint({ mode: "number" }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	apiaryId: bigint({ mode: "number" }).notNull().references(() => apiaries.id, { onDelete: "cascade" } ),
},
(table) => [
	primaryKey({ columns: [table.id], name: "userapiaryaccess_id"}),
]);

export const userhiveaccess = mysqlTable("userhiveaccess", {
	id:     bigint({ mode: "number" }).autoincrement().notNull(),
	userId: bigint({ mode: "number" }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	hiveId: bigint({ mode: "number" }).notNull().references(() => hives.id, { onDelete: "cascade" } ),
},
(table) => [
	primaryKey({ columns: [table.id], name: "userhiveaccess_id"}),
]);

export const users = mysqlTable("users", {
	id:                 bigint({ mode: "number" }).autoincrement().notNull(),
	username:           varchar({ length: 20 }).notNull(),
	email:              varchar({ length: 30 }).default("").notNull(),
	password:           varchar({ length: 30 }).default("").notNull(),
	image:              text(),
	role:               mysqlEnum(Role).notNull(),
	provider:           mysqlEnum(['GOOGLE']),
	providerSub:        varchar({ length: 255 }),
	googleRefreshToken: text(),
	isWhitelisted:      tinyint().default(0).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
]);

export const whitelist = mysqlTable("whitelist", {
	id:     bigint({ mode: "number" }).autoincrement().notNull(),
	email:  varchar({ length: 60 }),
	role:   mysqlEnum(['ADMINISTRATOR','APIARY_MAINTAINER','MANAGEMENT','HIVE_WORKER']),
	status: tinyint().default(0),
},
(table) => [
	primaryKey({ columns: [table.id], name: "whitelist_id"}),
]);



export const hiveInspections = mysqlTable("hive_inspections", {
	id:            bigint({ mode: "number" }).autoincrement().notNull(),
	apiaryId:      bigint({ mode: "number" }).references(() => apiaries.id, { onDelete: "set null" } ),
	userIdCreator: bigint({ mode: "number" }).references(() => users.id),
	processed:     boolean().default(false).notNull(),
	creationDate:  timestamp({ mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	index("userId_idx").on(table.userIdCreator),
	index("apiaryId_idx").on(table.apiaryId),
	primaryKey({ columns: [table.id], name: "hive_inspections_id"}),
]);


export const hiveInspectionForms = mysqlTable("hive_inspection_forms", {
	id:                           bigint({ mode: "number" }).autoincrement().notNull(),
	isAbnormalBehavior:           tinyint().notNull(),
	abnormalBehaviorDescription:  varchar({ length: 500 }),
	isSwarming:                   tinyint().notNull(),
	needFeeding:                  tinyint().notNull(),
	isQueenAlive:                 tinyint().notNull(),
	isQueenLayingEggs:            tinyint().notNull(),
	isQueenLayingEggsIncorrectly: tinyint().notNull(),
	needMoreHoneyFrames:          tinyint().notNull(),
	needMoreHoneyFramesAmount:    int(),
	needMoreBreedingFrames:       tinyint().notNull(),
	needMoreBreedingFramesAmount: int(),
	needMedicalAttention:         tinyint().notNull(),
	medicalAttentionDescription:  varchar({ length: 500 }),
	hasHiveDamage:                tinyint().notNull(),
	hiveDamageDescription:        varchar({ length: 500 }),
	isTakingFrames:               tinyint().notNull(),
	takenHoneyFrames:             int(),
	takenBreedingFrames:          int(),
	inspectionId:                 bigint({ mode: "number" }).notNull().references(() => hiveInspections.id, { onDelete: "cascade" } ),
	hiveId:                       bigint({ mode: "number" }).references(() => hives.id, { onDelete: "set null" } ),
},
(table) => [
	index("inpsectionId_idx").on(table.inspectionId),
	index("hiveId_idx").on(table.hiveId),
	primaryKey({ columns: [table.id], name: "hive_inspection_forms_id"}),
]);


export const hiveHoneyProduction = mysqlTable("hive_honey_production", {
	id:           bigint({ mode: "number" }).autoincrement().notNull(),
	amount:       float(),
	hiveId:       bigint({ mode: "number" }).notNull().references(() => hives.id),
	inspectionId: bigint({ mode: "number" }).notNull().references(() => hiveInspections.id),
	createdAt:    timestamp({ mode: 'string' }).defaultNow(),
},
(table) => [
	index("inspectionId_idx").on(table.inspectionId),
	index("hiveId_idx").on(table.hiveId),
	primaryKey({ columns: [table.id], name: "hive_honey_production_id"}),
]);

export const hiveQueenHistory = mysqlTable("hive_queen_history", {
	id:              bigint({ mode: "number" }).autoincrement().notNull(),
	timeSpentInHive: varchar("time_spent_in_hive", { length: 50 }).default('0').notNull(),
	placedHereDate:  timestamp("placed_here_date", { mode: 'string' }).notNull(),
	imageUrl:        text("image_url"),
	speciesId:       bigint("species_id", { mode: "number" }).notNull().references(() => species.id),
	hiveId:          bigint("hive_id", { mode: "number" }).references(() => hives.id),
},
(table) => [
	primaryKey({ columns: [table.id], name: "hive_queen_history_id"}),
]);

export const species = mysqlTable("species", {
	id:             bigint({ mode: "number" }).autoincrement().notNull(),
	scientificName: varchar("scientific_name", { length: 100 }).default("").notNull(),
	knownAsName:    varchar("known_as_name", { length: 100 }).default("").notNull(),
	lifeExpectancy: varchar("life_expectancy", { length: 50 }).default("").notNull(),
	description:    text().notNull(),
	behavior:       text().notNull(),
	preferences:    text().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "queen_species_id"}),
]);

export const queens = mysqlTable("queens", {
	id:              bigint({ mode: "number" }).autoincrement().notNull(),
	bornDate:        datetime("born_date", { mode: 'string' }).notNull(),
	addedToHiveDate: timestamp("added_to_hive_date", { mode: 'string' }).default(sql`now()`).notNull(),
	imageUrl:        text("image_url"),
	speciesId:       bigint("species_id", { mode: "number" }).notNull().references(() => species.id),
	hiveId:          bigint("hive_id", { mode: "number" }).notNull().references(() => hives.id),
},
(table) => [
	primaryKey({ columns: [table.id], name: "queens_id"}),
]);
