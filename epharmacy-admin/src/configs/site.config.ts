import { cloneDeep } from "lodash";

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;

const meta = {
  title: "Epharmacy",
  description: "Hệ thống quản lý nhà thuốc trực tuyến.",
};

export default function getMetadata(title?: string) {
  const data = cloneDeep(meta);
  if (title) {
    data.title = meta.title + " | " + title;
  }
  return data;
}