import SEO from "@/components/SEO";

export default function TermsOfService() {
  return (
    <div className="min-h-screen py-12">
      <SEO 
        title="Terms of Service - CloudPlayHub" 
        description="The rules and guidelines for utilizing the CloudPlayHub gaming platform."
      />
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            By accessing CloudPlayHub, you are entering into a binding agreement governed by the following Terms of Service. If you disagree with any portion of these stipulations, you must cease using our platform immediately.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Acceptable Use</h2>
          <p>
            CloudPlayHub grants you a non-exclusive, revocable license to access our HTML5 games for personal, non-commercial entertainment. You are strictly prohibited from utilizing automated scraping tools, exploiting server vulnerabilities, or attempting to reverse-engineer our proprietary APIs.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Intellectual Property Rights</h2>
          <p>
            The compilation, layout, and original graphics on this portal are the intellectual property of CloudPlayHub. The individual games hosted within iframes remain the property of their respective developers and publishers. We operate as a distribution portal and respect all DMCA takedown requests.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Limitation of Liability</h2>
          <p>
            The services are provided "AS IS" without warranties of any kind, explicit or implied. Under no circumstances shall CloudPlayHub or its operators be held liable for data loss, hardware issues, or network disruptions resulting from the use of our gaming portal.
          </p>

          <p className="pt-8">
            We may update these terms periodically to reflect changes in our operational procedures or legal obligations.
          </p>
        </div>
      </div>
    </div>
  );
}