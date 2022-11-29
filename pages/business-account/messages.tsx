import BusinessAccountLayout from '../../components/business-account/BusinessAccountLayout'
import { useRouter } from 'next/router'

type PropTypes = {}

function BusinessDetails(props: PropTypes) {
  const router = useRouter()

  return (
    <BusinessAccountLayout pageName={'messages'} businessName={''}>
      <div className="text-center text-xl text-bold">Recruitment Partners</div>
      <div className="text-center">
        Here are some recommended Recruitment Partners that would be able to help you with hiring
        based on your company type and location
      </div>
      <br />
      <div className="text-center text-xl text-bold">atWork Australia </div>
      <div className="text-center">
        atWork Australia Is A Leading National Disability Employment Services (DES) Provider. Meet
        Your Training, Life & Employment Goals With A Truly Individual Approach
      </div>
      <br />
      <div className="text-center">
        Address: level 34/31 Market St, Sydney NSW 2000 Web: https://www.atworkaustralia.com.au/
        Phone: 1300 080 856
      </div>
      <br />
      <div className="text-center text-xl text-bold">APM</div>
      <div className="text-center">
        At APM, we provide Disability Employment Services to help people with an injury, illness or
        disability to find a job with a local Sydney employer.
      </div>
      <br />
      <div className="text-center">
        Address: Suite 2 56 Clarence Street, Sydney NSW 2000 Web: https://apm.net.au/ Phone: (02)
        9279 0748
      </div>
      <br />
      <div className="text-center text-xl text-bold">WISE Employment</div>
      <div className="text-center">
        WISE Employment is one of Australia's leading not-for-profit employment services providers
        and a dedicated employment agency for Disability Employment Services
      </div>
      <br />
      <div className="text-center">
        Address: Ground Level, 200 Crown Street, Darlinghurst, NSW 2010 Web:
        https://wiseemployment.com.au/ Phone: 1800 685 105
      </div>
    </BusinessAccountLayout>
  )
}

export default BusinessDetails
