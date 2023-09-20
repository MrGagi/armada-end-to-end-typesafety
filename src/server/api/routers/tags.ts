import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tagsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), values: z.array(z.string()).default([]) }))
    .mutation(async ({ input, ctx }) => {
      const createdTag = await ctx.prisma.tag.create({
        data: {
          name: input.name,
        }
      })

      const values = await Promise.all(
        input.values.map((value) => {
          return ctx.prisma.tagValue.create({
            data: {
              name: value,
              tagId: createdTag.id
            }
          })
        })
      )

      return {
        ...createdTag,
        values,
      }
    }),
  get: publicProcedure.query(async ({ ctx }) => {
    const tags = await ctx.prisma.tag.findMany()

    return Promise.all(
      tags.map(async (tag) => {
        const tagValues = await ctx.prisma.tagValue.findMany({
          where: {
            tagId: tag.id
          }
        })

        return {
          ...tag,
          values: tagValues,
        }
      })
    )
  })
});
