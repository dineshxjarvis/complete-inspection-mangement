import type { Metadata } from "next";
import "./globals.css";
import { WorkspaceProvider } from "../context/WorkspaceContext";
import { StrataProvider } from "../context/StrataContext";
import { AssignmentProvider } from "../context/AssignmentContext";
import { FieldInspectionProvider } from "../context/FieldInspectionContext";
import { MineResponseProvider } from "../context/MineResponseContext";
import { RegulatoryActionProvider } from "../context/RegulatoryActionContext";
import { CorrectiveActionProvider } from "../context/CorrectiveActionContext";
import { VerificationProvider } from "../context/VerificationContext";
import { OversightProvider } from "../context/OversightContext";
import { StrataRootShell } from "../components/StrataRootShell";

export const metadata: Metadata = {
  title: "STRATA | Coal-Mining Inspection Governance & Field Execution Platform",
  description: "Enterprise operational coal-mining inspection governance system for DGMS / Coal India Limited (CIL) compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <WorkspaceProvider>
          <StrataProvider>
            <AssignmentProvider>
              <FieldInspectionProvider>
                <MineResponseProvider>
                  <RegulatoryActionProvider>
                    <CorrectiveActionProvider>
                      <VerificationProvider>
                        <OversightProvider>
                          <StrataRootShell ws1Children={children} />
                        </OversightProvider>
                      </VerificationProvider>
                    </CorrectiveActionProvider>
                  </RegulatoryActionProvider>
                </MineResponseProvider>
              </FieldInspectionProvider>
            </AssignmentProvider>
          </StrataProvider>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
