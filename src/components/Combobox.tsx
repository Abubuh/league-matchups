import clsx from "clsx";
import { useCombobox } from "downshift";
import { useState } from "react";

export function ComboBox({
  items,
  onChange,
  optionValue,
  inputWidth,
  url,
}: {
  items: { id: number; name: string; key?: string; image?: string }[];
  onChange: (...event: any[]) => void;
  optionValue: string;
  inputWidth: string;
  url?: string;
}) {
  const [filteredItems, setFilteredItems] = useState(items);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      if (!inputValue) setFilteredItems(items);
      setFilteredItems(
        items.filter((item) =>
          item.name.toLowerCase().includes(inputValue!.toLowerCase()),
        ),
      );
    },
    onSelectedItemChange({ selectedItem }) {
      onChange(selectedItem?.id);
    },
    items: filteredItems,
    itemToString(item) {
      return item ? item?.name : "";
    },
  });

  return (
    <div>
      <div
        className={
          inputWidth === "large"
            ? "w-12/12 mx-auto flex flex-col gap-1"
            : "mx-auto flex w-11/12 flex-col gap-1"
        }
      >
        <label className="w-fit" {...getLabelProps()}></label>
        <div className="flex gap-0.5 bg-white shadow-sm ">
          <input
            placeholder={`${optionValue}`}
            className="w-full p-1.5"
            {...getInputProps()}
          />
          <button
            aria-label="toggle menu"
            className="px-2"
            type="button"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>
        </div>
      </div>
      <ul
        className={`absolute z-10 max-h-52 w-64 overflow-scroll overflow-x-hidden bg-white shadow-md ${
          !(isOpen && items.length) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          filteredItems.map((item, index) => (
            <li
              className={clsx(
                highlightedIndex === index && "bg-blue-300",
                selectedItem === item && "font-bold",
                "flex px-3 py-2 shadow-sm",
              )}
              key={item.id}
              {...getItemProps({ item, index })}
            >
              {url ? (
                <img
                  alt=""
                  src={url + item.image}
                  className={`flex h-fit w-2/12 rounded-md border-2 border-black`}
                  width={100}
                  height={100}
                />
              ) : (
                ""
              )}

              <span className="mx-auto px-2">{item.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
