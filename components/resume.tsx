import Link from "next/link";
import { Button } from "./ui/button";

export default function DownloadResumeButton() {
  const downloadUrl = "https://docs.google.com/document/d/12DqP4EirNa-sWsu6F5p57rp0Gpnhz82E/export?format=pdf";

  return (
    <Button size="lg" variant="outline">
        <Link
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        >
        Download Resume (PDF)
        </Link>
    </Button>
  );
}
