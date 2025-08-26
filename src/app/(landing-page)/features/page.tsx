import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Shield, Rocket, Brain, Users } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Answers",
      desc: "Get high-quality answers with sources, reasoning, and code examples.",
    },
    {
      icon: Shield,
      title: "Private & Secure",
      desc: "Your questions, groups, and data stay private to your workspace.",
    },
    {
      icon: Users,
      title: "Groups & Collaboration",
      desc: "Create groups, invite teammates, and learn together with shared threads.",
    },
    {
      icon: Rocket,
      title: "Interview Simulator",
      desc: "Practice real interviews and receive actionable feedback and scoring.",
    },
  ];

  return (
    <div className="pt-28 pb-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="secondary" className="rounded-full">What's inside</Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">Features that help you level up</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Everything you need to prepare for interviews, share knowledge, and collaborate with your team.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/sign-in">
              <Button size="lg" className="rounded-full">
                Get Started
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/interview">
              <Button size="lg" variant="outline" className="rounded-full">Try interview agent</Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="h-full">
              <CardHeader>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-2">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="sm:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                And more out of the box
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                {[
                  "Rich markdown with code blocks",
                  "Upload and cite files",
                  "Tags, roles, and companies",
                  "Question bank and search",
                  "AI evaluation for answers",
                  "Keyboard-first UX",
                  "Beautiful dark mode",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 rounded-2xl border bg-muted/30 p-8 text-center dark:bg-muted/10">
          <h2 className="text-2xl sm:text-3xl font-semibold">Ready to get started?</h2>
          <p className="mt-2 text-muted-foreground">
            Create an account and start practicing today.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/sign-in">
              <Button size="lg" className="rounded-full">Create free account</Button>
            </Link>
            <Link href="/questions">
              <Button size="lg" variant="outline" className="rounded-full">Explore questions</Button>
            </Link>
          </div>
        </div>

        <footer className="mt-16 text-center text-sm text-muted-foreground py-8">
          <p>Made with ❤️ by Harsh</p>
        </footer>
      </section>
    </div>
  );
}
