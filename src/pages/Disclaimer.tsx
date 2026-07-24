import SEO from "@/components/SEO";

export default function Disclaimer() {
  return (
    <div className="min-h-screen py-12">
      <SEO 
        title="Legal Disclaimer | CloudPlayHub" 
        description="Important legal information and liability disclosures regarding the content hosted on CloudPlayHub."
      />
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-black mb-8">Disclaimer</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            The information and interactive content provided on CloudPlayHub are offered strictly for recreational and entertainment purposes. We make no representations regarding the accuracy, completeness, or reliability of the embedded applications.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Third-Party Content</h2>
          <p>
            A significant portion of our catalog consists of HTML5 applications aggregated from third-party developers, promotional networks, and open-source repositories. CloudPlayHub does not assert ownership over these external intellectual properties. All trademarks, character designs, and game mechanics remain the exclusive property of their creators.
          </p>

          <h2 className="text-2xl font-bold text-foreground">DMCA & Copyright Compliance</h2>
          <p>
            We take intellectual property rights seriously. If you are an authorized representative of a copyright holder and believe your work is being hosted on CloudPlayHub without consent, please submit a formal takedown notice via our Contact page. We process valid DMCA requests expeditiously.
          </p>
        </div>
      </div>
    </div>
  );
}