export type Point = [number, number];

export type Pattern = {
  name: string;
  data: Point[];
  description: string;
  rule: string;
  category: string;
  recommended?: boolean;
}