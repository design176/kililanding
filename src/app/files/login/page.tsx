import type { Metadata } from "next";
import { FilesLoginForm } from "@/components/files/FilesLoginForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function FilesLoginPage(props: PageProps<"/files/login">) {
  const searchParams = await props.searchParams;
  const nextParam = searchParams.next;
  const next = typeof nextParam === "string" && nextParam.startsWith("/files") ? nextParam : "/files";

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>files</h1>
      <FilesLoginForm next={next} />
    </div>
  );
}
