import { FaGithub, FaLinkedin } from 'react-icons/fa';
import naderUrl from '../../images/nader.jpg'

const people = [
  {
    name: 'Nader Almogazy',
    role: 'Software Engineer',
    imageUrl: naderUrl,
    githubUrl: 'https://github.com/nader12334',
    linkedinUrl: 'https://www.linkedin.com/in/naderalmogazy/',
  },
  {
    name: 'Steven Du',
    role: 'Full-Stack Engineer',
    imageUrl: "https://media-exp1.licdn.com/dms/image/C5603AQFDqqzbMsHLkw/profile-displayphoto-shrink_800_800/0/1614478246591?e=1649289600&v=beta&t=rF9o-U-6HfdMOjy_qSy5iqperqrRcU0s9N47fvOam3c",
    githubUrl: 'https://github.com/stebed',
    linkedinUrl: 'https://www.linkedin.com/in/stevendu/',
  },
  {
    name: 'Evan Preedy',
    role: 'Full-Stack Engineer',
    imageUrl: "https://media-exp1.licdn.com/dms/image/C4D03AQHJYHhjminKOQ/profile-displayphoto-shrink_800_800/0/1583715406957?e=1649289600&v=beta&t=Xe-g-MbDEGdm9EQA0Wsx0LBqrxMDpysZjMxAKXixZKY",
    githubUrl: 'https://github.com/ep1815',
    linkedinUrl: 'https://www.linkedin.com/in/evan-preedy/',
  },
  {
    name: 'Leo Crossman',
    role: 'Full-Stack Engineer',
    imageUrl: "https://media-exp1.licdn.com/dms/image/C5603AQGv8VLWelgLgA/profile-displayphoto-shrink_800_800/0/1540586637094?e=1649289600&v=beta&t=0fynsTHefEKnH-6JtLjh0Djy5-cQXmX6E_QtzptnO2w",
    githubUrl: 'https://github.com/leocrossman',
    linkedinUrl: 'https://www.linkedin.com/in/leocrossman',
  },
]

export default function Team() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">Meet our team</h2>
            <p className="text-xl text-gray-300">
              Ornare sagittis, suspendisse in hendrerit quis. Sed dui aliquet lectus sit pretium egestas vel mattis
              neque.
            </p>
          </div>
          <ul role="list" className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
            {people.map((person) => (
              <li key={person.name} className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left">
                <div className="space-y-6 xl:space-y-10">
                  <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src={person.imageUrl} alt="" />
                  <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                    <div className="font-medium text-lg leading-6 space-y-1">
                      <h3 className="text-white">{person.name}</h3>
                      <p className="text-indigo-400">{person.role}</p>
                    </div>

                    <ul role="list" className="flex justify-center space-x-5">
                      <li>
                        <a href={person.githubUrl} target='_blank' rel='noreferrer noopener' className="text-gray-400 hover:text-gray-300">
                          <span className="sr-only">Github</span>
                          <svg className="w-10 h-10" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <FaGithub/>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href={person.linkedinUrl} target='_blank' rel='noreferrer noopener' className="text-gray-400 hover:text-gray-300">
                          <span className="sr-only">LinkedIn</span>
                          <svg className="w-11 h-11" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <FaLinkedin/>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}