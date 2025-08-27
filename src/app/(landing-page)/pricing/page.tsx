import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Check, Sparkles, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Pricing · Interview Archive",
  description: "Simple pricing: it’s free right now.",
};

const features = [
  "Unlimited browsing of question bank",
  "AI interview agent (fair use limits)",
  "Tags, roles, and companies filters",
  "Groups & collaboration",
  "AI answers with citations & evaluation",
];

export default function PricingPage() {
  return (
    <div className="px-4 md:px-8 lg:px-12">
      {/* Hero */}
      <section className="mx-auto max-w-4xl py-10 md:py-16 text-center space-y-4">
        <Badge variant="secondary" className="rounded-full px-3 py-1">Pricing</Badge>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">It’s free. No payments implemented.</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          You read that right — we haven’t implemented billing yet, so everything is free to use. When we add paid tiers, there'll still be a generous free plan.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/interview"><Button size="lg" className="rounded-full">Start Interview</Button></Link>
          <Link href="/questions"><Button size="lg" variant="secondary" className="rounded-full">Browse Questions</Button></Link>
        </div>
      </section>

      <Separator />

      {/* Free plan */}
      <section className="mx-auto max-w-6xl py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 order-2 md:order-1">
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Everything you need to prep today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">$0</div>
              <div className="text-muted-foreground mb-4">No credit card required</div>
              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-4 text-primary" /> <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/40 order-1 md:order-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Future Pro <Sparkles className="size-4" /></CardTitle>
              <CardDescription>Coming later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">TBD</div>
              <div className="text-muted-foreground mb-4">We’ll keep the free plan generous</div>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>Usage boosts</li>
                <li>Advanced AI capabilities</li>
                <li>Team features</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl pb-16 md:pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>
            <div>
              <div className="font-medium">Is it really free?</div>
              <div className="text-sm text-muted-foreground">Yes. We haven’t implemented payments yet, so enjoy it for free.</div>
            </div>
            <div>
              <div className="font-medium">Will you charge later?</div>
              <div className="text-sm text-muted-foreground">Likely for advanced features. A generous free plan will remain.</div>
            </div>
            <div>
              <div className="font-medium">Do I need a card?</div>
              <div className="text-sm text-muted-foreground">No. No billing, no card.</div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-2 font-medium"><ShieldCheck className="size-4" /> No hidden fees</div>
            <div className="text-sm text-muted-foreground">Just practice and collaborate.</div>
            <div className="flex gap-3 pt-4">
              <Link href="/interview"><Button className="rounded-full">Start Interview</Button></Link>
              <Link href="/questions"><Button className="rounded-full" variant="secondary">Browse Questions</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
