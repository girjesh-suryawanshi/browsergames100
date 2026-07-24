import SEO from "@/components/SEO";

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
}