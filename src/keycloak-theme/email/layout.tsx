import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
} from "jsx-email";
import type { PropsWithChildren, ReactNode } from "react";

export const EmailLayout = ({
  locale,
  children,
  preview,
}: PropsWithChildren<{ preview: ReactNode; locale: string }>) => {
  return (
    <Html lang={locale}>
      <Head />
      <Tailwind
        config={{
          theme: {
            colors: {
              background: "oklch(1 0 0)",
              foreground: "oklch(0.2 0.01 0)",
              card: "oklch(1 0 0)",
              "card-foreground": "oklch(0.2 0.01 0)",
              primary: "oklch(0.3523 0.0656 174.84)",
              "primary-foreground": "oklch(1 0 0)",
              secondary: "oklch(0.96 0 0)",
              "secondary-foreground": "oklch(0.2 0.01 0)",
              muted: "oklch(0.95 0.01 0)",
              "muted-foreground": "oklch(0.5 0.02 0)",
              accent: "oklch(0.95 0.01 0)",
              "accent-foreground": "oklch(0.2 0.01 0)",
              destructive: "oklch(0.6 0.2 25)",
              border: "oklch(0.9 0.01 0)",
              ring: "oklch(0.35 0.07 174.83)",
            },
            fontFamily: {
              sans: ['"Open Sans"', "sans-serif"],
            },
          },
        }}
      >
        <Preview>{preview}</Preview>
        <Body className="bg-secondary font-sans">
          <Container className="bg-background mx-auto mb-16 py-5">
            <Img
              src="https://www.foodmission.eu/wp-content/uploads/2025/03/Foodmission_logo_horizontal_transparent.png"
              alt="FOODMISSION Logo"
              width="240"
            />
            <Section className="px-12">{children}</Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
