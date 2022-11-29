import BusinessAccountLayout from '../../components/business-account/BusinessAccountLayout'
import { useRouter } from 'next/router'

type PropTypes = {}

export default function BusinessReviews(props: PropTypes) {
  const router = useRouter()

  return (
    <BusinessAccountLayout pageName={'reviews'} businessName={''}>
      {/* <div>Welcome back!</div> */}
      <div className="text-center text-xl text-bold">Public Content</div>
      <div className="text-center">
        Here are some examples of content you can add to your website, include within your job
        adverts and or post out to your social media. *** Remember to copy and paste your URL Link
        within each one ***
      </div>
      <br />
      <div className="text-center text-xl text-bold">Job Adverts</div>
      <div className="text-center">
        At (Insert Company Name) we’re proud to be an equal opportunity employer. To discover more
        about our workplace accessibility or match your requirements against our workspace, please
        click on this Tickable link.
      </div>
      <br />
      <div className="text-center text-xl text-bold">Social Media Post</div>
      <div className="text-center">
        We’re proud to announce that we have become partners with Tickable today in an effort to
        open up our business to everyone. We hope that by sharing our accessibility information we
        can invite more people living with disability to apply to join us on our growth journey.
      </div>
      <br />
      <div className="text-center text-xl text-bold">Company Website</div>
      <div className="text-center">
        [Inset Company Name] is an equal opportunity employer that is committed to diversity and
        inclusion in the workplace. We prohibit discrimination and harassment of any kind based on
        race, colour, sex, religion, sexual orientation, national origin, disability, genetic
        information, pregnancy, or any other protected characteristic as outlined by federal, state,
        or local laws. [Company Name] makes hiring decisions based solely on qualifications, merit,
        and business needs at the time. To discover more information regarding accessibility at
        (Insert Company Name) please follow this Tickable link.
      </div>
    </BusinessAccountLayout>
  )
}
