import { Tag } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../server";
const api = Router();

api.get("/nuke", async (req, res) => {
  await prisma.image.deleteMany({
    where: {
      id: {
        gt: 0,
      },
    },
  });
  await prisma.tag.deleteMany({
    where: {
      id: {
        gt: 0,
      },
    },
  });
  res.send({
    nuked: true,
  });
});

api.get("/img", async (req, res) => {
  const tags: Tag[] = JSON.parse((req.query.tags as string) || "[]");
  console.log({ tags });
  const ids = tags.map((tag) => tag.id);

  const imgs =
    tags.length > 0
      ? await prisma.image.findMany({
          where: {
            tags: {
              some: {
                id: {
                  in: ids,
                },
              },
            },
          },
          include: {
            tags: true,
          },
        })
      : await prisma.image.findMany({
          include: {
            tags: true,
          },
        });
  console.log({ imgs });

  //   const testImgs = await prisma.image.findMany({
  //     where: {
  //       tags: {
  //         every: {
  //           id: {},
  //         },
  //       },
  //     },
  //   });

  res.send({
    imgs,
  });
});
api.post("/img", async (req, res) => {
  const {
    name,
    url,
    tags,
  }: {
    name: string;
    url: string;
    tags: { id?: number; name: string }[];
  } = req.body;
  if (!name || !url || !tags) {
    res.status(404);
    res.send({
      ok: false,
      message: "Must include a name, url and tags",
    });
    return;
  }
  const allTags = tags.map((tag) => ({
    create: { name: tag.name },
    where: { id: tag.id || -1 },
  }));
  const img = await prisma.image.create({
    data: {
      name,
      url,
      tags: {
        connectOrCreate: allTags,
      },
    },
  });

  res.send({
    ok: true,
    img: img,
  });
});

api.get("/tags", async (req, res) => {
  res.send({
    tags: await prisma.tag.findMany(),
  });
});

api.get("/", (req, res) => {
  res.send({
    test: true,
  });
});

export default api;
