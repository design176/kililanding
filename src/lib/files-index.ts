export type FileStatus = "in-progress" | "done" | "planned";

export type FileItem = {
  title: string;
  href: string;
  status: FileStatus;
};

export const FILE_STATUS_LABEL: Record<FileStatus, string> = {
  "in-progress": "In progress",
  done: "Done",
  planned: "Planned",
};

/** Items listed on /files. Add a row here and a route under src/app/files/ to publish something new. */
export const FILES: FileItem[] = [
  { title: "Pitch Deck", href: "/files/scribble_deck", status: "in-progress" },
];
