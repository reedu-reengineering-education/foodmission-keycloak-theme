import { Text, Button, Heading, Hr, render, Section } from "jsx-email";
import { EmailLayout } from "../layout";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "Password Reset";

const { exp } = createVariablesHelper("password-reset.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <EmailLayout
    preview={`Reset your password for ${exp("realmName")}`}
    locale={locale}
  >
    <div className="py-8">
      <Heading className="text-2xl font-bold text-foreground mb-6">
        Reset Your Password
      </Heading>

      <Text className="text-muted-foreground text-base leading-6 mb-4">
        Someone just requested to change your{" "}
        <strong className="text-foreground">{exp("realmName")}</strong>{" "}
        account&apos;s credentials. If this was you, click on the button below
        to reset them.
      </Text>

      <Section className="mb-[32px] mt-[32px] text-center">
        <Button
          href={exp("link")}
          className="bg-primary text-primary-foreground px-6 py-3 font-medium text-base hover:opacity-90 transition-opacity mx-auto"
          height={24}
          width={240}
          borderRadius={4}
          align="center"
        >
          Reset Password
        </Button>
      </Section>

      <Text className="text-muted-foreground text-sm leading-5 mb-4">
        This link will expire within{" "}
        <span className="text-foreground font-medium">
          {exp("linkExpirationFormatter(linkExpiration)")}
        </span>
        .
      </Text>

      <Hr className="border-border my-6" />

      <Text className="text-muted-foreground text-sm leading-5">
        If you don&apos;t want to reset your credentials, just ignore this
        message and nothing will be changed.
      </Text>

      <Text className="text-muted-foreground text-xs leading-4 mt-6">
        If the button above doesn&apos;t work, you can copy and paste this link
        into your browser:
        <br />
        <span className="text-primary break-all">{exp("link")}</span>
      </Text>
    </div>
  </EmailLayout>
);
export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "[FOODMISSION] Password Reset";
};
