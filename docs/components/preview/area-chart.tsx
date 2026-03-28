"use client";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 186 }, { name: "Feb", value: 305 }, { name: "Mar", value: 237 },
  { name: "Apr", value: 173 }, { name: "May", value: 409 }, { name: "Jun", value: 214 },
];
const data2 = [
  { name: "Jan", a: 186, b: 120 }, { name: "Feb", a: 305, b: 210 }, { name: "Mar", a: 237, b: 180 },
  { name: "Apr", a: 173, b: 250 }, { name: "May", a: 409, b: 300 }, { name: "Jun", a: 214, b: 190 },
];
const stepData = [
  { name: "Jan", value: 186 }, { name: "Feb", value: 305 }, { name: "Mar", value: 305 },
  { name: "Apr", value: 173 }, { name: "May", value: 409 }, { name: "Jun", value: 214 },
];

export function PreviewAreaChartDefault() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#areaFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PreviewAreaChartStacked() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data2}>
        <defs>
          <linearGradient id="stackA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="stackB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Area type="monotone" dataKey="a" stackId="1" stroke="hsl(var(--primary))" fill="url(#stackA)" strokeWidth={2} />
        <Area type="monotone" dataKey="b" stackId="1" stroke="#f97316" fill="url(#stackB)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PreviewAreaChartStep() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={stepData}>
        <defs>
          <linearGradient id="stepFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Area type="step" dataKey="value" stroke="hsl(var(--primary))" fill="url(#stepFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PreviewAreaChartGradient() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="gradFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="url(#gradFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PreviewAreaChartInteractive() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="intFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#intFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PreviewAreaChartAxes() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="axesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
        <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#axesFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
