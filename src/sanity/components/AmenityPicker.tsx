"use client";

import { useEffect, useState } from "react";
import { set, unset, useClient, type ArrayOfObjectsInputProps } from "sanity";
import { Button, Card, Checkbox, Text } from "@sanity/ui";

type Amenity = { _id: string; name: string; icon: string | null };
type Ref = { _key: string; _type: "reference"; _ref: string };

const newKey = () => Math.random().toString(36).slice(2, 10);

// A grid of every amenity with its icon; tick the ones this building has.
export function AmenityPicker(props: ArrayOfObjectsInputProps) {
  const { value, onChange, readOnly } = props;
  const refs = (value ?? []) as unknown as Ref[];
  const client = useClient({ apiVersion: "2025-10-01" });
  const [items, setItems] = useState<Amenity[] | null>(null);

  useEffect(() => {
    client
      .fetch<Amenity[]>(
        `*[_type == "amenity"] | order(orderRank asc){_id, name, "icon": icon.asset->url}`,
      )
      .then(setItems)
      .catch(() => setItems([]));
  }, [client]);

  const selected = new Set(refs.map((r) => r._ref));

  function toggle(id: string) {
    if (readOnly) return;
    const next = selected.has(id)
      ? refs.filter((r) => r._ref !== id)
      : [...refs, { _key: newKey(), _type: "reference" as const, _ref: id }];
    onChange(next.length ? set(next) : unset());
  }

  function selectAll() {
    if (!items) return;
    const have = new Map(refs.map((r) => [r._ref, r]));
    onChange(
      set(
        items.map(
          (a) =>
            have.get(a._id) ?? {
              _key: newKey(),
              _type: "reference" as const,
              _ref: a._id,
            },
        ),
      ),
    );
  }

  if (!items) return <Text size={1}>Loading amenities…</Text>;
  if (!items.length)
    return (
      <Text size={1}>
        No amenities yet. Add some under Projects → Amenities first.
      </Text>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button
          text="Select all"
          mode="ghost"
          fontSize={1}
          padding={2}
          disabled={readOnly}
          onClick={selectAll}
        />
        <Button
          text="Clear"
          mode="ghost"
          fontSize={1}
          padding={2}
          disabled={readOnly || !refs.length}
          onClick={() => onChange(unset())}
        />
        <Text size={1} muted>
          {selected.size} of {items.length} selected
        </Text>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 8,
        }}
      >
        {items.map((a) => {
          const on = selected.has(a._id);
          return (
            <Card
              key={a._id}
              as="label"
              padding={3}
              radius={2}
              border
              tone={on ? "primary" : "default"}
              style={{ cursor: readOnly ? "default" : "pointer" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ alignSelf: "flex-start" }}>
                  <Checkbox
                    checked={on}
                    disabled={readOnly}
                    onChange={() => toggle(a._id)}
                  />
                </div>
                {a.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.icon}
                    alt={a.name}
                    style={{ width: 56, height: 64, objectFit: "contain" }}
                  />
                ) : null}
                <Text size={1} align="center">
                  {a.name}
                </Text>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
