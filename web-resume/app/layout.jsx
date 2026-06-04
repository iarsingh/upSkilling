import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
  title: "Akhilesh Ranjan Singh | ML Platform & DevOps Engineer",
  description:
    "ML Platform and DevOps Engineer with 6.7+ years of experience across GCP, Kubernetes, MLOps, Terraform, GitOps, and observability.",
  authors: [{ name: "Akhilesh Ranjan Singh" }],
  openGraph: {
    title: "Akhilesh Ranjan Singh | ML Platform & DevOps Engineer",
    description:
      "Kubernetes-based cloud platforms and production-grade ML infrastructure across GCP, AWS, and Azure.",
    type: "website",
    images: ["/og-card.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhilesh Ranjan Singh | ML Platform & DevOps Engineer",
    description: "GCP, Kubernetes, MLOps, Terraform, GitOps, observability, and cloud-native platform resume.",
    images: ["/og-card.svg"]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
