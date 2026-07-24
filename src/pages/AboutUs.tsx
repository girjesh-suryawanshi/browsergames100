import SEO from "@/components/SEO";

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
}