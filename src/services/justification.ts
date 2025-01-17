import { getDBConnection } from "./database";
import * as Crypto from "expo-crypto";

export const createJustification = async (name: string) => { 
    const db = await getDBConnection();
    const query = `
    INSERT OR IGNORE  INTO Justification (id, jsutification)
    VALUES (?, ?);
    `;
    await db.runAsync(query, [Crypto.randomUUID(), name]);
}