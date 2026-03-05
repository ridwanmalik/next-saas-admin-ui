"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ShowCard from "../_components/show-card"

const tableData = [
  { id: "1", name: "Sarah Chen", email: "sarah.chen@example.com", role: "Admin" },
  { id: "2", name: "Marcus Rodriguez", email: "marcus.rodriguez@example.com", role: "User" },
  { id: "3", name: "Priya Patel", email: "priya.patel@example.com", role: "User" },
  { id: "4", name: "David Kim", email: "david.kim@example.com", role: "Editor" },
]

const CheckboxPage = () => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set(["1"]))
  const selectAll = selectedRows.size === tableData.length

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(tableData.map((row) => row.id)))
    } else {
      setSelectedRows(new Set())
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedRows(newSelected)
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Checkbox</h2>
        <p className="text-muted-foreground">A control that allows the user to toggle between checked and not checked.</p>
      </div>
      <div className="space-y-4">
        <ShowCard>
          <FieldGroup className="max-w-sm">
            <Field orientation="horizontal">
              <Checkbox id="terms-checkbox" name="terms-checkbox" />
              <Label htmlFor="terms-checkbox">Accept terms and conditions</Label>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="terms-checkbox-2"
                name="terms-checkbox-2"
                defaultChecked
              />
              <FieldContent>
                <FieldLabel htmlFor="terms-checkbox-2">
                  Accept terms and conditions
                </FieldLabel>
                <FieldDescription>
                  By clicking this checkbox, you agree to the terms.
                </FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal" data-disabled>
              <Checkbox id="toggle-checkbox" name="toggle-checkbox" disabled />
              <FieldLabel htmlFor="toggle-checkbox">Enable notifications</FieldLabel>
            </Field>
            <FieldLabel>
              <Field orientation="horizontal">
                <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
                <FieldContent>
                  <FieldTitle>Enable notifications</FieldTitle>
                  <FieldDescription>
                    You can enable or disable notifications at any time.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          </FieldGroup>
        </ShowCard>

        <ShowCard title="Invalid State" description="Set aria-invalid on the checkbox and data-invalid on the field wrapper to show the invalid styles.">
          <FieldGroup className="mx-auto w-56">
            <Field orientation="horizontal" data-invalid>
              <Checkbox
                id="terms-checkbox-invalid"
                name="terms-checkbox-invalid"
                aria-invalid
              />
              <FieldLabel htmlFor="terms-checkbox-invalid">
                Accept terms and conditions
              </FieldLabel>
            </Field>
          </FieldGroup>
        </ShowCard>

        <ShowCard title="Basic" description="Pair the checkbox with Field and FieldLabel for proper layout and labeling.">
          <FieldGroup className="mx-auto w-56">
            <Field orientation="horizontal">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <FieldLabel htmlFor="terms-checkbox-basic">
                Accept terms and conditions
              </FieldLabel>
            </Field>
          </FieldGroup>
        </ShowCard>

        <ShowCard title="Description" description="Use FieldContent and FieldDescription for helper text.">
          <FieldGroup className="mx-auto w-72">
            <Field orientation="horizontal">
              <Checkbox
                id="terms-checkbox-desc"
                name="terms-checkbox-desc"
                defaultChecked
              />
              <FieldContent>
                <FieldLabel htmlFor="terms-checkbox-desc">
                  Accept terms and conditions
                </FieldLabel>
                <FieldDescription>
                  By clicking this checkbox, you agree to the terms and conditions.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </ShowCard>

        <ShowCard title="Disabled" description="Use the disabled prop to prevent interaction and add the data-disabled attribute to the <Field> component for disabled styles.">
          <FieldGroup className="mx-auto w-56">
            <Field orientation="horizontal" data-disabled>
              <Checkbox
                id="toggle-checkbox-disabled"
                name="toggle-checkbox-disabled"
                disabled
              />
              <FieldLabel htmlFor="toggle-checkbox-disabled">
                Enable notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </ShowCard>

        <ShowCard title="Group" description="Use multiple fields to create a checkbox list.">
          <FieldSet>
            <FieldLegend variant="label">
              Show these items on the desktop:
            </FieldLegend>
            <FieldDescription>
              Select the items you want to show on the desktop.
            </FieldDescription>
            <FieldGroup className="gap-3">
              <Field orientation="horizontal">
                <Checkbox
                  id="hard-disks-checkbox"
                  name="hard-disks-checkbox"
                  defaultChecked
                />
                <FieldLabel htmlFor="hard-disks-checkbox" className="font-normal">
                  Hard disks
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="external-disks-checkbox"
                  name="external-disks-checkbox"
                  defaultChecked
                />
                <FieldLabel htmlFor="external-disks-checkbox" className="font-normal">
                  External disks
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="cds-dvds-checkbox"
                  name="cds-dvds-checkbox"
                />
                <FieldLabel htmlFor="cds-dvds-checkbox" className="font-normal">
                  CDs, DVDs, and iPods
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="connected-servers-checkbox"
                  name="connected-servers-checkbox"
                />
                <FieldLabel htmlFor="connected-servers-checkbox" className="font-normal">
                  Connected servers
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        </ShowCard>

        <ShowCard title="Table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  <Checkbox
                    id="select-all-checkbox"
                    name="select-all-checkbox"
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={selectedRows.has(row.id) ? "selected" : undefined}
                >
                  <TableCell>
                    <Checkbox
                      id={`row-${row.id}-checkbox`}
                      name={`row-${row.id}-checkbox`}
                      checked={selectedRows.has(row.id)}
                      onCheckedChange={(checked) =>
                        handleSelectRow(row.id, checked === true)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ShowCard>
      </div>
    </div>
  )
}

export default CheckboxPage
