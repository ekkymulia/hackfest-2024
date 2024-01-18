"use client"
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
} from "@nextui-org/react";

export interface Column {
  key: string;
  label: string;
}

export interface Row {
  [key: string]: string | number | string[];
}

interface StatusChipProps {
  status: string;
  colorMap: Record<string, string>;
}

const StatusChip: React.FC<StatusChipProps> = ({ status, colorMap }) => {
  const chipColor = colorMap[status] || "default" as const;

  return (
    <Chip className="capitalize" color={chipColor} size="sm" variant="flat">
      {status}
    </Chip>
  );
};

interface ProjectTableProps {
  columns: Column[];
  rows: Row[];
  colorMap: Record<string, string>;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ columns, rows, colorMap }) => {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent="No rows to display." items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === "status" ? (
                  <StatusChip status={getKeyValue(item, columnKey) as string} colorMap={colorMap} />
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProjectTable;
