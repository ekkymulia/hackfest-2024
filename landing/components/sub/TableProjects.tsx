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
} from "@nextui-org/react";

export interface Column {
  key: string;
  label: string;
}

export interface Row {
  [key: string]: string | number | string[];
}

interface ProjectTableProps {
  columns?: Column[];
  rows?: Row[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ columns = [], rows = [] }) => {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProjectTable;