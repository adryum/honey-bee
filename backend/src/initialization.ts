import { db } from "./config/Database";
import { HistoryActionType } from "./DatabaseEnums";
import { LoggedMap, withStatus } from "./utils";

export var HistoryActionTypeMap: LoggedMap<HistoryActionType, number> = new LoggedMap("HistoryActionTypeMap");

export async function setupHistoryActionTypeMap() {
    try {
        const historyActionTypesResult = await withStatus("Getting all HiveActionType enums", 
            () => db.query.historyActionTypes.findMany({})
        )

        historyActionTypesResult.forEach(item => {
            HistoryActionTypeMap.set(item.type, item.id)
        })
    } catch (error) {
        console.error(error);
    }
}