import type { Metadata } from "next";
import Link from "next/link";
import { CaretRight, FileText } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/Badge";
import { FILES, FILE_STATUS_LABEL } from "@/lib/files-index";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const STATUS_TONE = {
  "in-progress": "neutral",
  done: "brand",
  planned: "neutral",
} as const;

export default function FilesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <h1 className={styles.heading}>files</h1>

        <ul className={styles.list}>
          {FILES.map((file) => (
            <li key={file.href}>
              <Link href={file.href} className={styles.row}>
                <FileText size={18} weight="regular" className={styles.rowIcon} />
                <span className={styles.rowTitle}>{file.title}</span>
                <Badge tone={STATUS_TONE[file.status]}>{FILE_STATUS_LABEL[file.status]}</Badge>
                <CaretRight size={14} weight="bold" className={styles.rowCaret} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
