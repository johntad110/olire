"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from "react"

const FormSchema = z.object({
    project: z.string().min(5, {
        message: "I can't read minds yet. Use words to describe your project.",
    }),
})

interface InputFormProps {
    updateLibs: (libraries: any) => void;
}

export function InputForm({ updateLibs }: InputFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            project: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("Submiting olire")
        fetch('api/lazy-lib', {
            method: 'POST',
            body: JSON.stringify({ project: data.project }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(libraries => updateLibs(libraries))
            .catch(error => console.error(error))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-2/3 space-y-6 flex items-end gap-2 mt-10">
                <FormField
                    control={form.control}
                    name="project"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Or If you are lazy, like me. Just say what you wanna build.</FormLabel>
                            <FormControl>
                                <Input placeholder="Eg. 'I want to build an online store'." {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="hover:shadow-lg hover:shadow-purple-300">OLiRE</Button>
            </form>
        </Form>
    )
}
