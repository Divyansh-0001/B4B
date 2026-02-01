import Link from "next/link";

import { footerLinks, siteContact } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-frost bg-white">
      <div className="container-wide grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <h3>Be4Breach</h3>
          <p className="text-sm text-steel">
            The inspiration for Be4Breach came from a desire to protect information all across the
            world. Our company, which has its headquarters in Pune, India, is a young, ambitious,
            and creative one.
          </p>
          <div className="space-y-1 text-sm text-steel">
            <p>{siteContact.address}</p>
            <p>{siteContact.phone}</p>
            <p>{siteContact.email}</p>
          </div>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title} className="space-y-3">
            <h4 className="text-caption text-ink">{group.title}</h4>
            <ul className="space-y-2 text-sm text-steel">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-frost py-6 text-center text-xs text-steel">
        (c) 2023. Be4Breach. All Rights Reserved.
      </div>
    </footer>
  );
}
