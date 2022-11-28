import React, { useState } from 'react'
import { VisitorLayout } from 'components/VisitorLayout'

export default function Page() {
  return (
    <VisitorLayout>
      <div className="max-w-2xl py-8 px-6">
        <div className="text-4xl">Terms of Website Use</div>
        <div className="mt-3">Valyoos Terms and Conditions of Website Usage.</div>
        <div className="mt-3">
          These Terms and Conditions ("Terms") govern your use of the Valyoos website and or mobile
          applications subsequently under the valyoos.com.au domain name ("Site") and it forms a
          binding contractual agreement between you, the Valyoos user and us, Valyoos Pty Limited.
        </div>
        <div className="mt-3">
          You can contact us via email at{' '}
          <a href="mailto: matt@valyoos.com.au">matt@valyoos.com.au</a> if you have any specific
          questions on any of the following.
        </div>
        <div className="mt-3">
          By using the Valyoos “Site” you acknowledge and agree to have read and understand the
          Terms herein and you agree to be bound by them. These Terms may be updated without notice
          to you. If you do not agree to the Terms and Conditions of the Valyoos Site, please do
          not use the website and leave the website immediately.
        </div>
        <div className="mt-3">
          <div className="text-2xl">General Terms &amp; Conditions of Valyoos Website Use</div>
          <ol style={{ listStyleType: 'lower-alpha', paddingLeft: '2rem' }}>
            <li className="mt-3">
              This agreement of Terms and Conditions of Website Use constitutes the entire Terms and
              Conditions of Website Use agreement between the parties with respect to the matters
              contained in this Agreement and supersedes any and all prior and contemporaneous
              agreements, negotiations, correspondence, undertakings and communications of the
              parties, oral or written, with respect to that subject matter which are deemed to have
              by mutual agreement ceased or terminated on entry into this Agreement of Terms and
              Conditions of Website Use.
            </li>
            <li className="mt-3">
              The Website User may not, without the express written consent of Valyoos, assign any
              of its rights or obligations under the Agreement. Valyoos may assign its rights and
              obligations under this Agreement.
            </li>
            <li className="mt-3">
              No modification of these Terms and Conditions of Website Use shall be valid unless
              evidenced by a written instrument exacted by both parties (Valyoos Pty Ltd and User).
              No waiver by Valyoos of any provision or condition of this Agreement shall be deemed
              a waiver of any similar or dissimilar provision or condition at the same time or any
              prior or subsequent time.
            </li>
            <li className="mt-3">
              The Website User considers the obligations and restrictions in these Terms and
              Conditions of Website Use to be reasonable in all the circumstances.
            </li>
            <li className="mt-3">
              Nothing in these Terms and Conditions of Website Usage constitutes a transfer of any
              intellectual property rights. You acknowledge and agree that, as between you and us,
              Valyoos own all intellectual property rights in the Site and its contents.
            </li>
            <li className="mt-3">
              By posting or adding any content onto Valyoos, you grant us a non-exclusive,
              royalty-free, irrevocable, worldwide and transferable right and licence to use that
              content in any way (including, without limitation, by reproducing, changing, and
              communicating the content to the public) and permit us to authorise any other person
              to do the same thing.
            </li>
            <li className="mt-3">
              Valyoos may suspend, cancel or edit details of your account at any time in our sole
              discretion without notice or explanation. You may cancel your account on our website
              using your account control panel on the website. Valyoos may otherwise terminate
              these Terms and Conditions of Website Usage immediately, on notice to you, if you have
              breached these Terms and Conditions of Website Usage in any way.
            </li>
            <li className="mt-3">
              You represent and warrant to Valyoos Pty Ltd that:
              <ol style={{ listStyleType: 'decimal', paddingLeft: '2rem' }}>
                <li className="mt-3">
                  you have the legal capacity to enter these Terms and Conditions of Website Usage;
                  all information you provide if you choose to register on the Valyoos website is,
                  to the best of your knowledge, true, current and accurate; you will not allow any
                  unauthorized person to use your account and will notify us immediately if you
                  become aware of any unauthorized use of your Valyoos account.
                </li>
              </ol>
            </li>
            <li className="mt-3">
              To the full extent permitted by law, Valyoos Pty Ltd excludes all liability in
              respect of loss of data, interruption of business or any consequential or incidental
              damages. To the full extent permitted by law, Valyoos Pty Ltd excludes all
              representations, warranties or terms (whether express or implied) other than those
              expressly set out in these Terms and Conditions of Website Usage. These Terms are to
              be read subject to any legislation which prohibits or restricts the exclusion,
              restriction or modification of any implied warranties, conditions, guarantees or
              obligations. If such legislation applies, to the extent possible, we limit our
              liability in respect of any claim.
            </li>
            <li className="mt-3">
              Valyoos will always endeavour to ensure the most reliable and up to date information
              is provided through its website; though holds no responsibility to verify or grantee
              this information is accurate. Valyoos is not responsible for the contents of any
              business listing, profile page or account in this (valyoos.com.au) or in any third
              party website. Recommendations and matching scores provided by Valyoos are provided
              purely for illustrative and suggestive purposes, Valyoos holds no responsibility to
              guarantee the accuracy of this information.
            </li>
            <li className="mt-3">
              As a courtesy this Website contains hyperlinks and other pointers to Internet websites
              operated by third parties where Valyoos believes the content on the linked websites
              may be of interest generally to those who visit this Website. While Valyoos
              endeavours to review the linked websites with respect to suitability prior to
              establishing any hyperlink, these third party websites are not under the control of
              Valyoos, and may change at any time.
            </li>
            <li className="mt-3">
              Valyoos is not responsible for the contents of any third party website or any
              hyperlink contained in any third party website. The existence of a hyperlink on this
              Website does not imply any endorsement of the linked website by Valyoos or its
              Affiliates. You link to any such website entirely at your own risk. Valyoos welcomes
              comments from users who feel that the content of any linked website is inappropriate.
            </li>
          </ol>
          <div className="mt-3">
            This Agreement shall be governed by and construed in accordance with the laws of the
            state of New South Wales. The parties submit to the non-exclusive jurisdiction of the
            courts of that State.
          </div>
        </div>
      </div>
    </VisitorLayout>
  )
}
