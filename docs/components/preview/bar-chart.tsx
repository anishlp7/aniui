"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

const data = [
  { name: "Jan", value: 186 }, { name: "Feb", value: 305 }, { name: "Mar", value: 237 },
  { name: "Apr", value: 173 }, { name: "May", value: 409 }, { name: "Jun", value: 214 },
];
const groupedData = [
  { name: "Jan", desktop: 186, mobile: 120 }, { name: "Feb", desktop: 305, mobile: 210 },
  { name: "Mar", desktop: 237, mobile: 180 }, { name: "Apr", desktop: 173, mobile: 250 },
  { name: "May", desktop: 409, mobile: 300 }, { name: "Jun", desktop: 214, mobile: 190 },
];
const negativeData = [
  { name: "Jan", value: 186 }, { name: "Feb", value: -80 }, { name: "Mar", value: 237 },
  { name: "Apr", value: -50 }, { name: "May", value: 409 }, { name: "Jun", value: -30 },
];

export function PreviewBarChartDefault() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PreviewBarChartHorizontal() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} width={40} />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PreviewBarChartStacked() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={groupedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Bar dataKey="desktop" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} />
        <Bar dataKey="mobile" stackId="a" fill="#f97316" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PreviewBarChartGrouped() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={groupedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Bar dataKey="desktop" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="mobile" fill="#f97316" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PreviewBarChartNegative() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={negativeData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Bar dataKey="value" radius={[4, 4, 4, 4]}>
          {negativeData.map((entry, i) => (
            <Cell key={i} fill={entry.value >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PreviewBarChartLabels() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
        <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
