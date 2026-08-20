"use client";

import { Table } from "@/components/ui/Table";

const comparisonRows = [
  {
    key: "signal",
    dimension: "Signal",
    banner: "Cookies, demographics, what someone did last week",
    kili: "The question the user just typed",
  },
  {
    key: "timing",
    dimension: "Timing",
    banner: "Shown before the need exists, and hoping",
    kili: "Shown at the moment the need is described",
  },
  {
    key: "placement",
    dimension: "Placement",
    banner: "Wrapped around the content, competing with it",
    kili: "One labelled line inside the answer",
  },
  {
    key: "measurement",
    dimension: "Measurement",
    banner: "Browser pixels, increasingly blocked or dropped",
    kili: "Server-side conversions through CAPI",
  },
  {
    key: "effect",
    dimension: "Effect on the product",
    banner: "Something users learn to scroll past",
    kili: "Something users sometimes act on",
  },
  {
    key: "builtfor",
    dimension: "Built for",
    banner: "Pages and feeds",
    kili: "Conversations",
  },
];

export function ComparisonTable() {
  return (
    <Table
      columns={[
        { key: "dimension", header: "", render: (r) => <strong>{r.dimension}</strong> },
        { key: "banner", header: "Banner and display networks" },
        { key: "kili", header: "Kili", render: (r) => <strong>{r.kili}</strong> },
      ]}
      rows={comparisonRows}
      rowKey={(r) => r.key}
    />
  );
}
