const Main = () => {
    return (
        <div className="flex flex-flex-wrap px-40 gap-8 relative top-[40px]">
            <div className="w-[30%] md:w-auto md:h-[100px] flex flex-col gap-4">
                <img
                    className="rounded-full w-[300px]"
                    src="/assets/img/portfolio-pic.jpg"
                    alt="Picture of Aadi Badola"
                />
                <div>
                    <a
                        href="https://drive.google.com/file/d/1EOOdWZ7B2Zi_c2H99zidLk8G3ffSa4Jp/view?usp=sharing"
                        target="_blank"
                        className="btn-fill p-3"
                    >
                        View my Resume
                    </a>
                </div>
            </div>
            <div className="w-[70%] overflow-auto hide-scroll">
                <div
                    className="text-left text-lg text-bg-med flex flex-col pr-5"
                    id="about-content"
                >
                    <h2 className="about-heading">About Me</h2>
                    <p>
                        I am a Software Engineer, highly skilled in the
                        end-to-end design and development of software and
                        web-applications using modern technologies like NodeJS,
                        React, ASP.NET and more. <br />
                        I was introduced to Software Development in High School
                        in India, where I developed a passion for it through
                        learning programming fundamentals in Python and
                        essential database skills in MySQL. I designed many
                        easy-to-use daily applications which familiarised me
                        with the problem-solving process and allowed me to
                        establish a solid foundation for my future endeavors.{" "}
                        <br />
                        I enrolled in George Brown College, where I am currently
                        pursuing an Advanced Diploma in Computer Programming and
                        Analysis, gaining vital skills and knowledge about the
                        complete software development lifecycle. I excelled in
                        my academic ventures, showing consistent high-level
                        academic performance with an average 3.99 GPA across all
                        my completed semesters, I am expected to graduate in
                        April 2025. During my time at GBC, I was able to pursue
                        various extra-curricular activities and showcase my
                        skills while representing the college at various levels.{" "}
                        <br />
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
                            6th rank at the provincial level Skills Ontario
                            (2024) competition
                        </li>
                        <li>
                            3rd rank in Design Jam 2024 hosted by George Brown
                            College with Ontario Power Generation
                        </li>
                    </ul>
                    <h2 className="about-heading mt-10">
                        Professional Experience
                    </h2>
                    <p className="">
                        I have also professionally worked as a Computer Science
                        Tutor and Teacher's Assistant at George Brown conducting
                        over 450 hours of one-on-one and group tutoring
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
