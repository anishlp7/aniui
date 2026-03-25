"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Jan", value: 186 }, { name: "Feb", value: 305 }, { name: "Mar", value: 237 },
  { name: "Apr", value: 173 }, { name: "May", value: 409 }, { name: "Jun", value: 214 },
];
const multiData = [
  { name: "Jan", desktop: 186, mobile: 120 }, { name: "Feb", desktop: 305, mobile: 210 },
  { name: "Mar", desktop: 237, mobile: 180 }, { name: "Apr", desktop: 173, mobile: 250 },
  { name: "May", desktop: 409, mobile: 300 }, { name: "Jun", desktop: 214, mobile: 190 },
];

export function PreviewLineChartDefault() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PreviewLineChartMultiSeries() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={multiData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Line type="monotone" dataKey="desktop" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="mobile" stroke="#f97316" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PreviewLineChartCurved() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Line type="natural" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "white", stroke: "hsl(var(--primary))", strokeWidth: 2, r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PreviewLineChartDotted() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={multiData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Line type="monotone" dataKey="desktop" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="mobile" stroke="#f97316" strokeWidth={2} strokeDasharray="6 4" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PreviewLineChartInteractive() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 3 }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PreviewLineChartLegend() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={multiData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
        <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
        <Legend />
        <Line type="monotone" dataKey="desktop" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="mobile" stroke="#f97316" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
