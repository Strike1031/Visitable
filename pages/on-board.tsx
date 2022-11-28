import { VisitorLayout } from 'components/VisitorLayout'
import Router from 'next/router'
export default function Page() {
  return (
    <VisitorLayout>
      <div className="flex flex-col items-center p-10">
        <p className="mt-20 text-3xl font-light">Are you joining Visitable as a ...</p>
        <div className="w-full flex flex-col items-center lg:flex-row lg:justify-center">
          <button
            title="button"
            className="h-14 w-64 mt-5 block
          text-center text-base text-stress font-bold 
          bg-white hover:bg-purple-900 hover:text-white
          shadow-xl rounded-full"
            children="Personal User"
            onClick={() => alert('not implemented yet')}
          />
          <button
            title="button"
            className="h-14 w-64 mt-5 block
          text-center text-base text-stress font-bold
          bg-white hover:bg-purple-900 hover:text-white
          shadow-xl rounded-full"
            children="Business User ($19 pcm)"
            onClick={() => Router.push('/create-profile')}
          />
        </div>
      </div>
    </VisitorLayout>
  )
}
