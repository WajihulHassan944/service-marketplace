import Head from 'next/head';
import './Termsofservices.css'; // Import the separate CSS

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="terms-wrapper">
        <header className="terms-header">
          <div className="terms-header-content">
            <h1>Terms of Service</h1>
            <p className="terms-last-revision">Date of Last Revision: February 01, 2024</p>
          </div>
        </header>

        <main className="terms-main">
          <div className="terms-content-box">
            <section>
              <h2>1) Acceptance of Terms</h2>
              <p>
                By accessing or using our website or services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>
            <section>
              <h2>2) Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not modify or copy the materials.
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
