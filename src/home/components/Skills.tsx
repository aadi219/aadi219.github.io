
const skills = {
        languages: [
            {
                title: "Javascript",
                icon: <i className='devicon-javascript-plain'></i>
            },
            {
                title: "Typescript",
                icon: <i className='devicon-typescript-plain'></i>
          
            },
            {
                title: "Python",
                icon: <i className='devicon-python-plain-wordmark'></i>
          
            },
            {
                title: "Java",
                icon: <i className='devicon-java-plain-wordmark'></i>
            },
            {
                title: "C#",
                icon: <i className='devicon-csharp-plain-wordmark'></i>
            },
            {
                title: "PHP",
                icon: <i className="devicon-php-plain"></i>
            },
            {
                title: "Bash",
                icon: <i className="devicon-bash-plain"></i>
            }
        ],
        web: [
            {
                title: "NodeJs",
                icon: <i className="devicon-nodejs-plain-wordmark"></i>
            },
            {
                title: "React",
                icon: <i className="devicon-react-original-wordmark"></i>
            },
            {
                title: "Postgres",
                icon: <i className="devicon-postgresql-plain"></i>
            },
            {
                title: "MySQL",
                icon: <i className="devicon-mysql-plain-wordmark"></i>
            },
            {
                title: "MongoDB",
                icon: <i className="devicon-mongodb-plain-wordmark"></i>
            },
            {
                title: "Express",
                icon: <i className="devicon-express-original"></i>
            },
            {
                title: "Azure",
                icon: <i className="devicon-azure-plain"></i>
            },
            {
                title: "Tailwind",
                icon: <i className="devicon-tailwindcss-original"></i>
            }
        ],
        machineLearning: [
            {
                title: "Tensorflow",
                icon: <i className="devicon-tensorflow-original"></i> 
            },
            {
                title: "PyTorch",
                icon: <i className="devicon-pytorch-original"></i> 
            },
            {
                title: "SciKit-Learn",
                icon: <i className="devicon-scikitlearn-plain"></i> 
            },
            {
                title: "OpenCV",
                icon: <i className="devicon-opencv-plain"></i>
            },
            {
                title: "MatplotLib",
                icon: <i className="devicon-matplotlib-plain"></i>
            }
        ]
    }

const Skills = () => {
  return (
    <div id="skills">
        <div>
            <p className='text-lg mb-2'>Some of my frequently used languages are</p>
            <ul>
                {skills.languages.map((lang, idx) => {
                    return <li key={idx} className='text-highlight-blue skill-icon'>{lang.icon}</li>
                })}
            </ul>
        </div>
        <div>
            <p className='text-lg mb-2'>I am also proficient in the following web technologies</p>
            <ul>
                {
                    skills.web.map((tech, idx) => {
                        return <li key={idx} className='text-highlight-blue skill-icon'>{tech.icon}</li>
                    })
                }
            </ul>
        </div>
        <div>
            <p className="text-lg mb-2">My projects in Machine Learning and Data Analysis make use of the following</p>
            <ul>
                {
                    skills.machineLearning.map((tech, idx) => {
                        return <li key={idx} className='text-highlight-blue skill-icon'>{tech.icon}</li>
                    })
                }
            </ul>
        </div>
        <div>
            <p>Additionally, many projects that I work on utilize version control with Git and virtualization using technologies such as Docker</p>
        </div>
    </div>
    
    
  )
}

export default Skills