import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateFileUploadUrl = mutation({
    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl()
    }
})

export const sendFile = mutation({
    args: { storageId: v.id('_storage'), artistName: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.insert('musics', {
            id: args.storageId,
            artistName: args.artistName
        })
    }
})

export const files = query({
    handler: async (ctx) => {
        const files = await ctx.db.query('musics').collect()
        return files
    }
})