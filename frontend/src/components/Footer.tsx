import { Github } from "lucide-react";

const Footer = () => (
  <footer className="border-t py-8 mt-12">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>
        Built by <span className="font-medium text-foreground">Konda Kristhu Raju</span> · Internship Project 2026
      </p>
      <a
        href="https://github.com/rajukonda767"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
      >
        <Github className="w-4 h-4" />
        View on GitHub
      </a>
    </div>
  </footer>
);

export default Footer;
