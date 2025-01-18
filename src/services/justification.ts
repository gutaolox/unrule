import { Justification } from "../entity/ruleBase";
import { getDBConnection } from "./database";
import * as Crypto from "expo-crypto";

export const createJustification = async (name: string):Promise<Justification> => {
  const db = await getDBConnection();
  const justificationID = Crypto.randomUUID();
  const query = `
    INSERT OR IGNORE  INTO Justification (id, jsutification)
    VALUES (?, ?);
    `;
    await db.runAsync(query, [justificationID, name]);
    const [createdJustification] = await getJustifications(justificationID);
    return createdJustification;
};

export const getJustifications = async (
  id?: string
): Promise<Justification[]> => {
  const db = await getDBConnection();
  const query = `
    SELECT * FROM Justification;
    ${id ? `WHERE id = ?` : ""}
    `;
  const justifications = await db.getAllAsync<Justification>(query, [id ?? ""]);
  return justifications;
};
