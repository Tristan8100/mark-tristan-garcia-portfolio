import Skill from "./skill"

export default function SkillSection() {
    return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-12">My Current Skills</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <Skill 
            name="React.js"
            logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            level={90}
            color="from-cyan-500 to-blue-500"
            category="Frontend"
            yearsOfExperience={2.5}
            projectsCount={15}
            proficiency="Advanced"
            my_remarks="Love how it makes building UIs intuitive with component-based architecture. The ecosystem is massive!"
          />

          <Skill 
            name="TypeScript"
            logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
            level={85}
            color="from-blue-500 to-blue-700"
            category="Language"
            yearsOfExperience={2}
            projectsCount={12}
            proficiency="Advanced"
            my_remarks="Type safety saves so much debugging time. Makes refactoring confident and safe."
          />

          <Skill 
            name="Node.js"
            logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
            level={80}
            color="from-green-500 to-green-700"
            category="Backend"
            yearsOfExperience={2}
            projectsCount={10}
            proficiency="Advanced"
            my_remarks="JavaScript everywhere! Perfect for building fast, scalable server-side applications."
          />

          <Skill 
            name="Next.js"
            logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
            level={88}
            color="from-gray-700 to-gray-900"
            category="Framework"
            yearsOfExperience={1.5}
            projectsCount={8}
            proficiency="Advanced"
            my_remarks="The best React framework for production apps. SSR, routing, and optimization out of the box!"
          />

          <Skill 
            name="PostgreSQL"
            logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
            level={75}
            color="from-blue-600 to-indigo-600"
            category="Database"
            yearsOfExperience={1.5}
            projectsCount={7}
            proficiency="Intermediate"
            my_remarks="Powerful and reliable database. Still learning advanced query optimization techniques."
          />

          <Skill 
            name="Tailwind"
            logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
            level={75}
            color="from-blue-600 to-indigo-600"
            category="Styling"
            yearsOfExperience={1.5}
            projectsCount={7}
            proficiency="Intermediate"
            my_remarks="Never going back to traditional CSS. Utility-first approach is a game changer for rapid development"
          />
        </div>
      </div>
    </div>
  )
}