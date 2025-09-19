import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Properties } from "csstype";
import * as React from "react";

interface veryEmailProps {
  otp: string;
  name?: string;
}

export const EmailTemplate = async ({ otp, name }: veryEmailProps) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Verify your email address to get started with Bora Capital Advisors
      </Preview>
      <Body style={style.body}>
        <Section style={style.header}>
          <Container>
            <Text style={style.headerTitle}>Bora Capital Advisors</Text>
          </Container>
        </Section>
        <Section style={style.content}>
          <Text style={style.contextTitle}>Hello {name ?? "there"}</Text>

          <Text style={style.contextText}>
            To get started, please verify your email address by entering the OTP
            below.
          </Text>

          <Text style={style.contentOtpText}>{otp}</Text>

          <Text style={style.contextText}>
            Thanks, <br />
            Bora Capital Advisors
          </Text>

          <Text style={style.footNote}>
            If you did not request this email, please ignore it.
          </Text>
        </Section>

        <Section style={style.footer} bgcolor="#031129">
          <Container>
            <Text style={style.footerText}>
              © 2024 Bora Capital Advisors. All rights reserved.
            </Text>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

const style = {
  body: {
    padding: 0,
    margin: 0,
  },
  header: {
    height: 80,
    backgroundColor: "#031129",
    textAlign: "center" as Properties["textAlign"],
    borderBottom: "1px solid #010b1c",
  },
  headerTitle: {
    fontSize: 25,
    fontweight: "bold",
    textAlign: "center" as Properties["textAlign"],
    color: "#ffffff",
  },
  content: {
    padding: 20,
  },
  contextTitle: {
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
    fontWeight: "bold",
  },
  contextText: {
    fontSize: 16,
    color: "#33",
    marginBottom: 20,
  },
  contentOtpText: {
    fontSize: 30,
    letterSpacing: 10,
    textAlign: "center" as Properties["textAlign"],
    marginBottom: 20,
    lineHeight: "40px",
    fontWeight: "bold",
  },
  footNote: {
    fontSize: 12,
    color: "#333",
  },
  footer: {
    height: 70,
    padding: 20,
    color: "#fff",
    backgroundColor: "#031129",
    borderBottom: "1px solid #010b1c",
  },
  footerText: {
    fontSize: 12,
    color: "#ffffff",
    textAlign: "center" as Properties["textAlign"],
  },
};
