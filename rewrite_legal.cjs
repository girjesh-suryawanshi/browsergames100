const fs = require('fs');
const path = require('path');

const basePath = 'd:\\ReactWorkspace\\unblockGames -2026\\src\\pages';

const aboutUs = `import SEO from "@/components/SEO";

export default function AboutUs() {
  return (
    <div className="min-h-screen py-12">
      <SEO 
        title="About CloudPlayHub - Free Browser Games" 
        description="Discover the story behind CloudPlayHub, the ultimate destination for premium HTML5 games and cloud gaming without downloads."
      />
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-black mb-8 text-gradient-gaming">Our Story</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            CloudPlayHub was born out of a simple vision: gaming should be accessible, instantaneous, and free from bulky downloads. We are a dedicated collective of gaming enthusiasts and developers who recognized the need for a seamless browser-based gaming experience.
          </p>

          <h2 className="text-2xl font-bold text-foreground">The Cloud Gaming Revolution</h2>
          <p>
            We firmly believe that the future of casual gaming lies in the cloud. By leveraging modern HTML5 and WebGL technologies, we provide a robust platform where users can enjoy high-fidelity graphics and smooth gameplay on practically any device, from high-end PCs to standard school Chromebooks.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Quality Over Quantity</h2>
          <p>
            Instead of flooding our site with thousands of broken or low-quality titles, we meticulously curate our collection. Every game is play-tested for performance, safety, and fun. If a game doesn't meet our strict quality assurance guidelines, it doesn't make it to CloudPlayHub.
          </p>

          <p className="pt-8 font-semibold">
            Join the revolution. Play instantly.
          </p>
        </div>
      </div>
    </div>
  );
}`;

const privacyPolicy = `import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-12">
      <SEO 
        title="Privacy Policy | CloudPlayHub"
        description="Our comprehensive privacy policy detailing data collection, cookie usage, and advertising networks on CloudPlayHub."
      />
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-black mb-8">Privacy & Data Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            At CloudPlayHub, safeguarding your personal data is a primary directive. We are committed to transparency regarding the information we collect while you utilize our free cloud gaming services.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Data Collection Practices</h2>
          <p>
            Our platform operates on a "no registration required" model. We do not mandate the submission of Personally Identifiable Information (PII) such as names, physical addresses, or emails for general gameplay.
            We automatically gather anonymous telemetry data—including browser specifications, IP addresses, and session duration—solely for the purpose of optimizing server performance and identifying technical anomalies.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Cookie Policy</h2>
          <p>
            CloudPlayHub deploys essential cookies to preserve user preferences, such as your "Favorite" games roster and local save states. By navigating our platform, you consent to the deployment of these functional cookies.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Third-Party Advertising (Google AdSense)</h2>
          <p>
            To subsidize our server costs and keep the platform free, we partner with advertising networks, prominently Google AdSense. These third-party vendors utilize DART cookies to serve contextual and personalized advertisements based on your browsing history across the web.
          </p>
          <p>
            Users retain the right to opt out of personalized ad tracking by navigating to the <a href="https://myadcenter.google.com/" className="text-primary hover:underline">Google Ad Center</a>. Furthermore, we comply with regional directives such as GDPR and CCPA by providing appropriate consent management frameworks where applicable.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Policy Modifications</h2>
          <p>
            We reserve the right to amend this Privacy Policy dynamically. Significant alterations will be reflected directly on this page with an updated timestamp.
          </p>

          <p className="pt-8 italic">
            Effective Date: July 2026
          </p>
        </div>
      </div>
    </div>
  );
}`;

const termsOfService = `import SEO from "@/components/SEO";

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
}`;

const disclaimer = `import SEO from "@/components/SEO";

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
}`;

const contactUs = `import SEO from "@/components/SEO";

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
}`;

fs.writeFileSync(path.join(basePath, 'AboutUs.tsx'), aboutUs);
fs.writeFileSync(path.join(basePath, 'PrivacyPolicy.tsx'), privacyPolicy);
fs.writeFileSync(path.join(basePath, 'TermsOfService.tsx'), termsOfService);
fs.writeFileSync(path.join(basePath, 'Disclaimer.tsx'), disclaimer);
fs.writeFileSync(path.join(basePath, 'ContactUs.tsx'), contactUs);
console.log('Successfully rewrote all legal pages for AdSense compliance.');
