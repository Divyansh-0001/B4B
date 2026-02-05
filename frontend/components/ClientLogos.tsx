"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Building2 } from "lucide-react";

interface ClientLogo {
  name: string;
  logo?: string; // Path to logo image
}

interface ClientLogosProps {
  clients?: ClientLogo[];
}

export function ClientLogos({ clients }: ClientLogosProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Placeholder clients - replace with actual client logos
  const defaultClients: ClientLogo[] = [
    { name: "Enterprise Client 1" },
    { name: "Enterprise Client 2" },
    { name: "Enterprise Client 3" },
    { name: "Enterprise Client 4" },
    { name: "Enterprise Client 5" },
    { name: "Enterprise Client 6" },
  ];

  const displayClients = clients || defaultClients;

  return (
    <div className="relative overflow-hidden">
      {/* Add client logos instruction */}
      <div className="mb-4 text-center">
        <p className="text-sm text-muted-foreground">
          Trusted by organizations of all sizes
        </p>
      </div>

      {/* Logo Grid */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
        {displayClients.map((client, index) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: shouldReduceMotion ? 0.01 : 0.5,
              delay: shouldReduceMotion ? 0 : index * 0.1
            }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            className="flex items-center justify-center"
          >
            {client.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={client.logo}
                alt={client.name}
                className="h-12 w-auto object-contain grayscale opacity-60 transition-all hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <div className="flex h-16 w-full items-center justify-center rounded-lg border border-border bg-muted/30 transition-colors hover:border-primary/30 hover:bg-primary/5">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Instructions for adding real logos */}
      <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">Note:</span> Add client logos to{" "}
          <code className="rounded bg-muted px-1 py-0.5">/public/clients/</code> directory 
          and update the clients array in this component.
        </p>
      </div>
    </div>
  );
}
