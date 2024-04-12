"use client"

import { z } from "zod"
import { SelectForm } from "@/components/Form";
import Library from "@/components/Library";
import { useEffect, useState } from "react";
import { InputForm } from "@/components/Input";

const FormSchema = z.object({
  tag: z
    .string({
      required_error: "Please select a tag.",
    }),
  progLang: z
    .string({
      description: "Programming language."
    })
})

export default function Home() {
  const [libs, setLibs] = useState<any[]>([])

  const updateLibs = (libraries: any[]) => {
    console.log('Libraries: ', libraries)
    setLibs(libraries);
  }

  async function onSubmitHandler(data: z.infer<typeof FormSchema>) {
    console.log('calling submit', data)

    const response = await fetch('/api/libraries', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      console.log('ok response.')
      const libraries = await response.json()
      setLibs(libraries)
      console.log(libraries)
    } else {
      console.log('Server is talking gibrish.')
    }
  }


  async function submitDemo() {
    console.log('submiting demo')
    const response = await fetch('/api/libraries', {
      method: 'POST',
      body: JSON.stringify({
        tag: "Selected Tag",
        progLang: "Pymore",
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      console.log('ok response.')
      const libraries = await response.json()
      setLibs(libraries)
      console.log(libraries)
    } else {
      console.log('Server is talking gibrish.')
    }
  }
  useEffect(() => {
    submitDemo()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-10 lg:p-24">
      <div className="hover:shadow-sm hover:cursor-pointer mb-5 md:mb-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-9xl font-extralight">OLiRE</h1>
        <p className="text-[7px] md:text-[11px]">Open-source Library Recommendation Engine</p>
      </div>
      <SelectForm onsubmitHandler={onSubmitHandler} />

      <InputForm updateLibs={updateLibs} />

      <h2 className="mt-5 md:mt-8 text-1xl font-extralight ">These libraries might be relevant for you.</h2>
      <div className="flex gap-5 flex-wrap justify-center">
        {libs.map((lib, idx) => (
          <Library key={idx} name={lib.name} url={lib.url} description={lib.description} />
        ))}

      </div>
    </main>
  );
}
