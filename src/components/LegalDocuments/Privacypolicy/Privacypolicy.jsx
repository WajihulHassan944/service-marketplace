import Head from 'next/head';
import "./Privacypolicy.css";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="privacy-container">
        <header className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="last-revision">Date of Last Revision: February 01, 2024</p>
        </header>
        <main className="privacy-content">
          <section>
            <h2>1) Introduction</h2>
            <p>
              Thank you for using our services. We are committed to protecting your privacy and providing transparency about how your data is used. This Privacy Policy describes how we collect and use your information when you interact with our website or services.
            </p>
          </section>
          <section>
            <h2>2) Scope</h2>
            <p>
              This Privacy Policy covers the information we collect from users, clients, and visitors, including how we retain, protect, and disclose data in accordance with applicable laws. Your data privacy is important to us and we are committed to handling it responsibly.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
