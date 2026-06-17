
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { services } from "@/lib/data"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  service: z.string().min(1, "Please select a service."),
  details: z.string().min(10, "Please provide at least 10 characters of detail.").max(500, "Details cannot exceed 500 characters."),
})

export function ServiceInquiryForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      details: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const businessEmail = "benacetechnologies@gmail.com";
    const subject = encodeURIComponent(`Service Inquiry: ${values.service} - From ${values.name}`);
    
    const body = encodeURIComponent(
      `* BENACE TECH HUB - SERVICE INQUIRY *\n` +
      `----------------------------------\n` +
      `CUSTOMER DETAILS:\n` +
      `Name: ${values.name}\n` +
      `Email: ${values.email}\n` +
      `----------------------------------\n\n` +
      `SERVICE REQUESTED:\n` +
      `${values.service}\n\n` +
      `MESSAGE / DETAILS:\n` +
      `${values.details}\n\n` +
      `----------------------------------\n` +
      `Sent via Benace Tech Hub Website inquiry form.`
    );

    // Using Gmail Web Compose URL for an "on-screen" redirect experience like WhatsApp
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${businessEmail}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');

    toast({
      title: "Opening Gmail",
      description: "We are taking you to your Gmail to finish sending the message.",
    })
    
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-400">Your Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name here" {...field} className="h-12 border-2 border-zinc-100 rounded-xl focus-visible:ring-primary/20" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-400">Your Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email so we can reply" {...field} className="h-12 border-2 border-zinc-100 rounded-xl focus-visible:ring-primary/20" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-400">What service do you need?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 border-2 border-zinc-100 rounded-xl">
                    <SelectValue placeholder="Pick a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.title}>{service.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-400">Tell us what you need</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain your problem or project here..."
                  className="min-h-[120px] border-2 border-zinc-100 rounded-xl focus-visible:ring-primary/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          size="lg" 
          className="w-full h-16 rounded-2xl bg-black text-white font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl"
        >
          Open Gmail to Send Inquiry
        </Button>
        <p className="text-[10px] text-center font-bold text-zinc-400 uppercase tracking-widest italic">
          This will open your Gmail on screen with everything filled in.
        </p>
      </form>
    </Form>
  )
}
