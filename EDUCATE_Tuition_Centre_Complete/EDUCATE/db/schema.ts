import {sql} from "drizzle-orm";
import {sqliteTable,text} from "drizzle-orm/sqlite-core";
export const callbacks=sqliteTable("callbacks",{
 id:text("id").primaryKey(),phone:text("phone").notNull(),grade:text("grade").notNull(),
 board:text("board").notNull(),slot:text("slot").notNull(),status:text("status").notNull().default("Pending"),
 created:text("created").notNull().default(sql`CURRENT_TIMESTAMP`)
});
