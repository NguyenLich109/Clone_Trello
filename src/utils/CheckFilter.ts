import type { typeWork } from "@/types";

export const CheckFilter = ({ data, id }: { data: typeWork[]; id: string }) => {
  const filter = data.find((dt: typeWork) => dt._id === id);
  return filter;
};
