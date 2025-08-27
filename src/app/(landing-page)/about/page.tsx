import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, MessageSquareHeart, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About · Interview Archive",
  description: "Learn about our mission, values, and the team building Interview Archive.",
};

export default function AboutPage() {
  return (
    <div className="px-4 md:px-8 lg:px-12">
      {/* Hero */}
      <section className="mx-auto max-w-4xl py-10 md:py-16 text-center space-y-4">
        <Badge variant="secondary" className="rounded-full px-3 py-1">About</Badge>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Helping you practice and ace interviews</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We build practical tools that blend AI with a curated, community-driven knowledge base—so you can prep faster, collaborate better, and learn continuously.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/interview"><Button size="lg" className="rounded-full">Try Interview Agent</Button></Link>
          <Link href="/questions"><Button size="lg" variant="secondary" className="rounded-full">Browse Questions</Button></Link>
        </div>
      </section>

      <Separator />

      {/* Mission */}
      <section className="mx-auto max-w-5xl py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">Our mission</h2>
            <p className="text-muted-foreground">
              Make interview preparation effective and enjoyable with AI-first workflows, transparent reasoning, and a high-quality question bank. We focus on accuracy, usability, and community contributions.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[{t:"AI answers",d:"Citations & evaluation",i:Sparkles},{t:"Collaboration",d:"Groups & sharing",i:MessageSquareHeart},{t:"Trust",d:"Privacy by default",i:ShieldCheck}].map(({t,d,i:Icon}) => (
                <div key={t} className="rounded-lg border p-4 bg-card">
                  <div className="flex items-center gap-2 font-medium"><Icon className="size-4" /> {t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border overflow-hidden bg-muted/30">
            <Image
              src="/app.png"
              alt="Interview Archive app screenshot"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Tech & Open Source */}
      <section className="mx-auto max-w-6xl py-6 md:py-10">
        <Card>
          <CardHeader>
            <CardTitle>Built with care</CardTitle>
            <CardDescription>Next.js App Router, Prisma, PostgreSQL, shadcn/ui, UploadThing, and modern AI tooling.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Next.js","TypeScript","Prisma","PostgreSQL","shadcn/ui","UploadThing","Vercel AI","Radix","Tailwind"].map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
              ))}
            </div>
            <div className="pt-4">
              <a href="https://github.com/harsh-m-patil/interview-archive" target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-full"><Github className="mr-2 size-4" /> View on GitHub</Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl py-6 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {t:"Accuracy",d:"Grounded answers with sources and transparent reasoning."},
            {t:"Speed",d:"Snappy UX and fast feedback loops."},
            {t:"Community",d:"Quality questions curated by users and teams."},
          ].map((v) => (
            <div key={v.t} className="rounded-lg border bg-card p-4">
              <div className="font-medium">{v.t}</div>
              <div className="text-sm text-muted-foreground">{v.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl pb-16 md:pb-24">
        <Card className="overflow-hidden">
          <CardContent className="p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">Join us</h3>
                <p className="text-muted-foreground">Start practicing with AI today or explore the question bank to prepare smarter.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                <Link href="/interview"><Button className="rounded-full" size="lg">Start Interview</Button></Link>
                <Link href="/questions"><Button className="rounded-full" size="lg" variant="secondary">Browse Questions</Button></Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
