import SEO from "@/components/SEO";

export default function ContactUs() {
  return (
    <div className="min-h-screen py-12">
      <SEO 
        title="Contact Us - CloudPlayHub" 
        description="Reach out to the CloudPlayHub team for support, business inquiries, or DMCA notices."
      />
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-black mb-8">Contact the Team</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            Whether you're a developer looking to publish your game, an advertiser seeking partnership opportunities, or a user reporting a technical glitch, we want to hear from you.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Direct Communication</h2>
          <p>
            For all inquiries, including DMCA notices and technical support, please direct your correspondence to our official communication channel:
          </p>
          <div className="p-6 bg-card rounded-xl border border-border/50 text-center">
            <p className="font-bold text-primary text-xl">support@cloudplayhub.com</p>
          </div>

          <h2 className="text-2xl font-bold text-foreground">Response Times</h2>
          <p>
            Our administrative team operates Monday through Friday. We strive to process all copyright and technical queries within 48-72 business hours. For advertising inquiries, please allow up to one week for a comprehensive response.
          </p>
        </div>
      </div>
    </div>
  );
}