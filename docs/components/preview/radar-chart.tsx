"use client";
import React from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { subject: "Math", A: 120 }, { subject: "Chinese", A: 98 },
  { subject: "English", A: 86 }, { subject: "Geography", A: 99 },
  { subject: "Physics", A: 85 }, { subject: "History", A: 65 },
];
const multiData = [
  { subject: "Math", A: 120, B: 80 }, { subject: "Chinese", A: 98, B: 110 },
  { subject: "English", A: 86, B: 95 }, { subject: "Geography", A: 99, B: 60 },
  { subject: "Physics", A: 85, B: 90 }, { subject: "History", A: 65, B: 105 },
];

export function PreviewRadarChartDefault() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart data={data}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
        <Radar name="Score" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function PreviewRadarChartMultiple() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart data={multiData}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
        <Radar name="Student A" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
        <Radar name="Student B" dataKey="B" stroke="#f97316" fill="#f97316" fillOpacity={0.15} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function PreviewRadarChartFilled() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart data={data}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
        <Radar name="Score" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.5} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function PreviewRadarChartDots() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart data={data}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
        <Radar name="Score" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 3 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function PreviewRadarChartGrid() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart data={data}>
        <PolarGrid gridType="circle" stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
        <PolarRadiusAxis angle={90} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
        <Radar name="Score" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function PreviewRadarChartLegend() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={multiData}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
        <Legend />
        <Radar name="Student A" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
        <Radar name="Student B" dataKey="B" stroke="#f97316" fill="#f97316" fillOpacity={0.15} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
