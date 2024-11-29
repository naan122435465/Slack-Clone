import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { auth } from "./auth";

const schema = defineSchema({
    ...authTables
});

export default schema;