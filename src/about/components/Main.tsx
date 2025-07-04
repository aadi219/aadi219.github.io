const Main = () => {
    return (
        <div className="flex flex-col lg:flex-row xl:px-40 gap-8 md:relative md:top-[40px] overflow-scroll lg:overflow-hidden">
            <div className="w-full lg:w-[30%] flex items-center lg:items-start flex-col gap-4">
                <img
                    className="mx-auto rounded-full w-[200px] sm:w-[250px] lg:w-[300px]"
                    src="/assets/img/portfolio-pic.jpg"
                    alt="Picture of Aadi Badola"
                />
                <div className="mx-auto">
                    <a
                        href="https://drive.google.com/file/d/1sg_81CMjQP5hCaR5_TlrEPSvJIhWKCW8/view?usp=sharing"
                        target="_blank"
                        className="btn-fill p-3"
                    >
                        View my Resume
                    </a>
                </div>
            </div>
            <div className="w-full lg:w-[70%] lg:overflow-auto">
                <div
                    className="text-left text-lg text-bg-med flex flex-col pr-5"
                    id="about-content"
                >
                    <h2 className="about-heading">About Me</h2>
                    <p>
                        I'm Aadi Badola, a Software Engineer, highly skilled in the
                        end-to-end design and development of software and
                        web-applications using modern technologies like NodeJS, Java Spring Boot
                        React, ASP.NET and more. I have experience designing AI-powered solutions for automating key business operations. <br />
                        I am a graduate of the Computer Programming and Analysis program at George Brown College, gaining
                        vital skills and knowledge about the complete software
                        development lifecycle. I excelled in my academic
                        ventures, showing consistent high-level academic
                        performance with an average 3.98 GPA, graduating with Honors.
						During my time at GBC, I was able to pursue
                        various extra-curricular activities and showcase my
                        skills while representing the college at various levels.
                        <br />
                        In my spare time, I am usually reading, playing the piano, or learning something new which has piqued my interests
                    </p>
					<h2 className="about-heading mt-10">
                        Professional Experience
                    </h2>
                    <p className="">
						<span className="block mt-4"><b className="text-highlight-teal">Software Developer</b> | <em>Antek Logistics</em></span>
						I am a Software Developer at Antek Logistics, contributing to the design and development of
						automated workflows encompassing end-to-end business operations from monitoring and parsing emails, to extracting
						key information from raw documents to optimize the daily tasks of operators.
                        <br />
						<span className="block mt-4"><b className="text-highlight-teal">Research Assistant - Artificial Intelligence</b> | <em>George Brown College</em></span>
						I have worked as a Research Assistant at George Brown College exploring and designing Deep Learning
                        systems for improving manufacturing pipelines. My work involved the design and implementation of a CNN-based encoder training pipeline for
						similarity based anomaly detection.
                        <br />
						<span className="block mt-4"><b className="text-highlight-teal">Peer Tutor & Teacher's Assistant</b> | <em>George Brown College</em></span>
                        I have also professionally worked as a Computer Science
                        Tutor and Teacher's Assistant at George Brown conducting
                        over 700 hours of one-on-one and group tutoring
                        sessions. As a Teacher's Assistant, I have assisted
                        professors during in-person lecture and lab sessions
                        tending to students' doubts and questions ensuring
                        seamless delivery of all class content to each and every
                        student. Through these sessions I have been able to
                        assist my college peers in furthering their
                        understanding of key software development and
                        programming concepts ranging from Data Structures and
                        Algorithms to Full-Stack Development and more.
                    </p>
                    <h2 className="about-heading mt-10">
                        Some of my most notable achievements are:
                    </h2>
                    <ul
                        id="achievements"
                        className="list-inside list-disc text-highlight-blue text-[1rem]"
                    >
                        <li>President of George Brown Computer Science Club</li>
                        <li>
                            National rank of 14 and top 17% of all international
                            competitors in the IEEEXtreme 17.0
                        </li>
                        <li>
                            4th rank at the provincial level Skills Ontario
                            (2025) competition
                        </li>
                        <li>
                            3rd rank in Design Jam 2024 hosted by George Brown
                            College with Ontario Power Generation
                        </li>
                    </ul>
                    
                    <h2 className="about-heading mt-10">What I Offer</h2>
                    <p className="mb-12">
                        I bring a blend of an expansive and thorough skill-set,
                        combined with quality assurance gained via hands-on
                        experience, and a proactive approach to problem-solving.
                        My background in diverse technologies and commitment to
                        continuous learning make me a valuable asset to any
                        team. I am eager to use the vast skill-set I have
                        accumulated to help you build something great! <br />
                        Feel free to reach out to me for any software
                        development opportunities or collaborations.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
