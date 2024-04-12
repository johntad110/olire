"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

type SelectFormHandler = {
    onsubmitHandler: (data: z.infer<any>) => Promise<void>
}

type tagPlProp = {
    name: string
    id: string
}

const FormSchema = z.object({
    tag: z
        .string({
            required_error: "I can't read your mind, yet. Please select a tag.",
        }),
    progLang: z
        .string({
            required_error: "Select a programming language, or else I will read your mind! 🪄",
            description: "Programming language."
        })
})


export function SelectForm({ onsubmitHandler }: SelectFormHandler) {
    const [tags, setTags] = useState<tagPlProp[]>([]);
    const [pls, setPls] = useState<tagPlProp[]>([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function fetchTags() {
        const response = await fetch('/api/tags')

        if (response.ok) {
            const tags = await response.json()
            setTags(tags)
            console.log(tags)
        } else {
            console.log('Server is talking gibrish, can\'t get tags.')
        }
    }

    async function fetchPls() {
        const response = await fetch('/api/pls')

        if (response.ok) {
            const pls = await response.json()
            setPls(pls)
            console.log(pls)
        } else {
            console.log('Server is talking gibrish, can\'t get pls.')
        }
    }

    useEffect(() => {
        fetchTags()
        fetchPls()
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmitHandler)} className="md:w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select a keyword/tag that describes ur project</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a keyword or tag that describes your project." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {tags.map((tag, idx) => (
                                        <SelectItem key={idx} value={tag.name}>{tag.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* <FormDescription>
                You can tags in your{" "}
                <Link href="/profile/tags">profile settings</Link>.
              </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="progLang"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select a programming language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a keyword or tag that describes your project." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {pls.map((pl, idx) => (
                                        <SelectItem key={idx} value={pl.name}>{pl.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
