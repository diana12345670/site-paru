import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Instagram, CheckCircle2 } from "lucide-react";
import { IndigenousPattern } from "./IndigenousPattern";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";

export function ContactSection() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactMessage) =>
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve. Obrigado!",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Localização",
      content: "Aldeia Kariri Xocó Multiétnica",
      subContent: "Brasil",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contato@aldeiakariri.org",
      subContent: "Respondemos em até 48h",
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "+55 (XX) XXXXX-XXXX",
      subContent: "Segunda a Sexta, 9h-17h",
    },
    {
      icon: Instagram,
      title: "Instagram",
      content: "@aldeiakariri_xocomultietnica",
      subContent: "Acompanhe nosso dia a dia",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute bottom-20 right-10 text-chart-3 pointer-events-none opacity-50">
        <IndigenousPattern className="w-64 h-64" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 tracking-tight">
            Entre em Contato
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Gostaria de nos visitar, conhecer nosso trabalho ou estabelecer
            parcerias? Entre em contato conosco!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="p-8 border-2">
              <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
                Envie uma Mensagem
              </h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body font-semibold text-sm">
                          Nome Completo
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Seu nome"
                            data-testid="input-name"
                            className="font-body"
                            disabled={contactMutation.isPending}
                          />
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
                        <FormLabel className="font-body font-semibold text-sm">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="seu@email.com"
                            data-testid="input-email"
                            className="font-body"
                            disabled={contactMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body font-semibold text-sm">
                          Mensagem
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Escreva sua mensagem aqui..."
                            rows={6}
                            data-testid="input-message"
                            className="font-body resize-none"
                            disabled={contactMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-body font-semibold"
                    data-testid="button-submit-contact"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Enviando...
                      </div>
                    ) : contactMutation.isSuccess ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Mensagem Enviada!
                      </div>
                    ) : (
                      "Enviar Mensagem"
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  className="p-6 border-2 hover-elevate active-elevate-2 transition-all duration-300"
                  data-testid={`card-contact-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-lg text-foreground mb-1">
                        {info.title}
                      </h4>
                      <p className="font-body text-foreground font-semibold">
                        {info.content}
                      </p>
                      <p className="font-body text-sm text-muted-foreground mt-1">
                        {info.subContent}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
