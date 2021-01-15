import { Tag } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../server";
const api = Router();

api.get("/test", async (req, res) => {
  // await prisma.image.deleteMany({
  //   where: {
  //     id: {
  //       gt: 0,
  //     },
  //   },
  // });
  // await prisma.tag.deleteMany({
  //   where: {
  //     id: {
  //       gt: 0,
  //     },
  //   },
  // });
  res.send({
    nuked: true,
  });
});

api.get("/img", async (req, res) => {
  let tags: Tag[] = JSON.parse((req.query.tags as string) || "[]");
  const queryName: string = (req.query?.name as string) || "";
  if (tags.length == 0) {
    // if no tags are provided show everything
    tags = await prisma.tag.findMany();
  }
  const ids = tags.map((tag) => tag.id);

  const imgs = await prisma.image.findMany({
    where: {
      AND: [
        {
          tags: {
            some: {
              id: {
                in: ids,
              },
            },
          },
        },
        {
          name: {
            contains: queryName,
          },
        },
      ],
    },
    include: {
      tags: true,
    },
  });

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
