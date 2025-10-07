"use client";

import { useActionState } from "react";
import { createQuestion } from "@/actions/questions";
import { CompanySelect } from "@/components/custom/questions/select/company";
import { RoleSelect } from "@/components/custom/questions/select/role";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function PostQuestionPage() {
  const [state, action, isPending] = useActionState(createQuestion, null);
  return (
    <form action={action}>
      <FieldSet className="min-w-xl">
        <FieldLegend>Post a Question</FieldLegend>
        <FieldDescription>
          Share the question with the community.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              autoComplete="off"
              id="title"
              name="title"
              placeholder="What does the http statusCode 418 means ?"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              autoComplete="off"
              id="description"
              name="description"
              placeholder="Describe the question in detail"
            />
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <RoleSelect />
            <CompanySelect />
          </Field>
        </FieldGroup>
      </FieldSet>
      <Button aria-disabled={isPending} disabled={isPending} type="submit">
        Post
      </Button>
    </form>
  );
}
