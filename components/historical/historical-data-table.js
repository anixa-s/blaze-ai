import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function HistoricalDataTable({ data }) {
  const [filterName, setFilterName] = useState("");
  const [filterProvince, setFilterProvince] = useState("all");
  const [filterCause, setFilterCause] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: 'start_date', direction: 'desc' });

  const provinces = [...new Set(data.map(item => item.province))];
  const causes = [...new Set(data.map(item => item.cause))];

  const filteredData = data.filter(item => {
    return (
      (item.fire_name.toLowerCase().includes(filterName.toLowerCase())) &&
      (filterProvince === "all" || item.province === filterProvince) &&
      (filterCause === "all" || item.cause === filterCause)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Filter by name..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterProvince} onValueChange={setFilterProvince}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by province" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Provinces</SelectItem>
            {provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterCause} onValueChange={setFilterCause}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by cause" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Causes</SelectItem>
            {causes.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => requestSort('fire_name')} className="cursor-pointer">Name{getSortIndicator('fire_name')}</TableHead>
              <TableHead onClick={() => requestSort('province')} className="cursor-pointer">Province{getSortIndicator('province')}</TableHead>
              <TableHead onClick={() => requestSort('start_date')} className="cursor-pointer">Start Date{getSortIndicator('start_date')}</TableHead>
              <TableHead onClick={() => requestSort('area_burned_hectares')} className="cursor-pointer text-right">Area (ha){getSortIndicator('area_burned_hectares')}</TableHead>
              <TableHead onClick={() => requestSort('cause')} className="cursor-pointer">Cause{getSortIndicator('cause')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map(fire => (
              <TableRow key={fire.id}>
                <TableCell className="font-medium">{fire.fire_name}</TableCell>
                <TableCell>{fire.province}</TableCell>
                <TableCell>{format(new Date(fire.start_date), "MMM d, yyyy")}</TableCell>
                <TableCell className="text-right">{fire.area_burned_hectares?.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">{fire.cause}</Badge>
                </TableCell>
              </TableRow>
            ))}
             {sortedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}