"use client"

import * as React from "react"
import { Loader2Icon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

export interface AutocompleteOption {
  value: string
  label: string
}

export interface AutocompleteProps {
  options: AutocompleteOption[]
  value?: string
  onValueChange?: (value: string) => void
  /**
   * Control the input text externally — required for async use cases.
   * When provided, the component assumes options are already filtered server-side.
   */
  inputValue?: string
  onInputChange?: (value: string) => void
  placeholder?: string
  /** Show a loading spinner while async options are being fetched */
  loading?: boolean
  disabled?: boolean
  /** Show a "Create X" option when the typed value has no exact match in options */
  creatable?: boolean
  emptyMessage?: string
  className?: string
}

const CREATABLE_PREFIX = "__create__:"

const Autocomplete = ({
  options,
  value,
  onValueChange,
  inputValue: controlledInputValue,
  onInputChange,
  placeholder = "Search...",
  loading = false,
  disabled = false,
  creatable = false,
  emptyMessage = "No results found.",
  className,
}: AutocompleteProps) => {
  const [internalInputValue, setInternalInputValue] = React.useState("")

  const inputValue = controlledInputValue ?? internalInputValue
  const isAsyncMode = controlledInputValue !== undefined

  const handleInputChange = (val: string) => {
    setInternalInputValue(val)
    onInputChange?.(val)
  }

  // In async mode, options are already filtered server-side.
  // In non-async mode, filter locally so we fully control what the Combobox sees.
  const filteredOptions: AutocompleteOption[] = isAsyncMode
    ? options
    : options.filter(o => o.label.toLowerCase().includes(inputValue.toLowerCase()))

  // Always offer Create as long as there's typed input — even alongside partial matches.
  const showCreatable = creatable && inputValue.trim() !== ""

  const creatableItem: AutocompleteOption | null = showCreatable
    ? { value: `${CREATABLE_PREFIX}${inputValue}`, label: inputValue }
    : null

  // We own the filtering — disable Combobox's internal filter entirely
  const allItems: AutocompleteOption[] = creatableItem ? [...filteredOptions, creatableItem] : filteredOptions

  const selectedItem = value ? (options.find(o => o.value === value || o.label === value) ?? null) : null

  const handleValueChange = (item: AutocompleteOption | null) => {
    if (!item) {
      onValueChange?.("")
      return
    }
    const isCreate = item.value.startsWith(CREATABLE_PREFIX)
    onValueChange?.(isCreate ? item.label : item.value)
  }

  return (
    <div className={cn(className)}>
    <Combobox
      filteredItems={allItems}
      value={selectedItem}
      onValueChange={handleValueChange}
      inputValue={inputValue}
      onInputValueChange={handleInputChange}
      disabled={disabled}>
      <ComboboxInput placeholder={placeholder} showTrigger={false} showClear={!!value} />
      <ComboboxContent>
        {loading ? (
          <div className="text-muted-foreground flex items-center justify-center gap-2 py-4 text-sm">
            <Loader2Icon className="size-4 animate-spin" />
            Searching...
          </div>
        ) : (
          <>
            <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
            <ComboboxList>
              {(item: AutocompleteOption) => {
                const isCreate = item.value.startsWith(CREATABLE_PREFIX)
                return (
                  <ComboboxItem key={item.value} value={item}>
                    {isCreate ? (
                      <>
                        <PlusIcon className="size-4" />
                        Create &ldquo;{item.label}&rdquo;
                      </>
                    ) : (
                      item.label
                    )}
                  </ComboboxItem>
                )
              }}
            </ComboboxList>
          </>
        )}
      </ComboboxContent>
    </Combobox>
    </div>
  )
}

export { Autocomplete }
