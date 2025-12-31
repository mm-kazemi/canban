import { type CollisionDetection, closestCorners } from "@dnd-kit/core";
import { arraySwap } from "@dnd-kit/sortable";

export const detectCollision: CollisionDetection = (args) => {
  return detectItemCollision(args);
};

const detectItemCollision: CollisionDetection = (args) => {
  const collisions = closestCorners(args);

  if (collisions.length < 2) {
    return collisions;
  }

  if (collisions[0].data?.value !== collisions[1].data?.value) {
    return collisions;
  }

  if (collisions[0].id < collisions[1].id) {
    return collisions;
  }

  return arraySwap(collisions, 0, 1);
};
