import React, { useMemo, useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { optionFilters } from "@/lib/data";

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
  const frameworks = optionFilters;

  const selectedItem = useMemo(
    () => frameworks.find((item) => item.value === dateQuery) || null,
    [dateQuery, frameworks],
  );
  return (
    <Combobox
      items={frameworks}
      itemToStringValue={(framework) => framework.label}
      value={selectedItem}
      onValueChange={(newValue) => {
        if (newValue) {
          setDateQuery(newValue.value);
        }
      }}
    >
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(framework) => (
            <ComboboxItem key={framework.value} value={framework}>
              {framework.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default DateTimeFilter;
